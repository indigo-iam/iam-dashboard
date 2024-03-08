import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { reducer, initialState } from "./reducer";
import { MeContext } from "./Context";
import { useFetch } from "@utils/fetch";
import { GroupRequests, Me } from "@models/Me";
import { useAuth } from "react-oidc-context";
import { ScimRequest } from "@models/Scim";

interface MeProviderBaseProps {
  children?: ReactNode;
}

export interface MeProviderProps extends MeProviderBaseProps {}

export const MeProvider = (props: MeProviderBaseProps) => {
  const { children } = props;
  const { getItem, patch } = useFetch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useAuth();
  const didLoad = useRef(false);

  const fetchMe = useCallback(async () => {
    const me = await getItem<Me>("/scim/Me");
    dispatch({ type: "UPDATE_ME", me });
  }, [getItem]);

  // https://www.rfc-editor.org/rfc/rfc7644.html#section-8.1
  const updateMe = useCallback(
    async (patchOp: ScimRequest) => {
      return patch(
        "/scim/Me",
        JSON.stringify(patchOp),
        "application/scim+json"
      );
    },
    [patch]
  );

  const fetchGroupRequests = useCallback(async () => {
    const groupRequests = await getItem<GroupRequests>(
      "/iam/group_requests?status=PENDING"
    );
    dispatch({ type: "UPDATE_GROUP_REQUESTS", groupRequests });
  }, [getItem]);

  const fetchAll = useCallback(() => {
    fetchMe();
    fetchGroupRequests();
  }, [fetchMe, fetchGroupRequests]);

  useEffect(() => {
    if (auth.isAuthenticated && !didLoad.current) {
      fetchAll();
      didLoad.current = true;
    }
  });

  const { me, groupRequests } = state;
  const value = useMemo(
    () => ({
      me,
      groupRequests,
      fetchMe,
      updateMe,
    }),
    [me, groupRequests, fetchMe, updateMe]
  );

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};
