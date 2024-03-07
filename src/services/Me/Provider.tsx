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

interface MeProviderBaseProps {
  children?: ReactNode;
}

export interface MeProviderProps extends MeProviderBaseProps {}

export const MeProvider = (props: MeProviderBaseProps) => {
  const { children } = props;
  const { getItem, post } = useFetch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useAuth();
  const didLoad = useRef(false);

  const fetchMe = useCallback(async () => {
    const me = await getItem<Me>("/scim/Me");
    dispatch({ type: "UPDATE_ME", me });
  }, [getItem]);

  const updatePassword = useCallback(
    async (updatePasswordRequest: FormData) => {
      return post("/iam/password-update", updatePasswordRequest);
    },
    [post]
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
      updatePassword,
    }),
    [me, groupRequests, fetchMe, updatePassword]
  );

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};
