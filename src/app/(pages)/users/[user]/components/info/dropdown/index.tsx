"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/dropdown";
import {
  EllipsisHorizontalIcon,
  NoSymbolIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  DocumentTextIcon,
  KeyIcon,
  PencilSquareIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { User } from "@/models/scim";
import { EditDetailsModal } from "./edit-details";
import { ChangePasswordModal } from "./change-password";
import { DisableUser } from "./disable-user";
import { AssignAdminModal } from "./assign-admin";
import { ChangeMembershipEndTimeModal } from "./change-membership-end-time";
import { SignAUPModal } from "./sign-aup";
import { RequestAUPSignature } from "./request-aup-signature";
import { useReducer } from "react";

type OptionsDropdownProps = {
  user: User;
  isAdmin?: boolean;
  isMe?: boolean;
};

type ModalsState = {
  showEditDetails: boolean;
  showChangePassword: boolean;
  showDisableUser: boolean;
  showAssignAdmin: boolean;
  showChangeMembershipEndTime: boolean;
  showSignAUP: boolean;
  showRequestAUPSignature: boolean;
};

const initialState: ModalsState = {
  showEditDetails: false,
  showChangePassword: false,
  showDisableUser: false,
  showAssignAdmin: false,
  showChangeMembershipEndTime: false,
  showSignAUP: false,
  showRequestAUPSignature: false,
};

type Action =
  | { type: "openEditDetails" }
  | { type: "closeEditDetails" }
  | { type: "openChangePassword" }
  | { type: "closeChangePassword" }
  | { type: "openDisableUser" }
  | { type: "closeDisableUser" }
  | { type: "openAssignAdmin" }
  | { type: "closeAssignAdmin" }
  | { type: "openChangeMembershipEndTime" }
  | { type: "closeChangeMembershipEndTime" }
  | { type: "openSignAUP" }
  | { type: "closeSignAUP" }
  | { type: "openRequestAUPSignature" }
  | { type: "closeRequestAUPSignature" };

function reducer(state: ModalsState, action: Action) {
  switch (action.type) {
    case "openEditDetails":
      return { ...state, showEditDetails: true };
    case "closeEditDetails":
      return { ...state, showEditDetails: false };
    case "openChangePassword":
      return { ...state, showChangePassword: true };
    case "closeChangePassword":
      return { ...state, showChangePassword: false };
    case "openDisableUser":
      return { ...state, showDisableUser: true };
    case "closeDisableUser":
      return { ...state, showDisableUser: false };
    case "openAssignAdmin":
      return { ...state, showAssignAdmin: true };
    case "closeAssignAdmin":
      return { ...state, showAssignAdmin: false };
    case "openChangeMembershipEndTime":
      return { ...state, showChangeMembershipEndTime: true };
    case "closeChangeMembershipEndTime":
      return { ...state, showChangeMembershipEndTime: false };
    case "openSignAUP":
      return { ...state, showSignAUP: true };
    case "closeSignAUP":
      return { ...state, showSignAUP: false };
    case "openRequestAUPSignature":
      return { ...state, showRequestAUPSignature: true };
    case "closeRequestAUPSignature":
      return { ...state, showRequestAUPSignature: false };
  }
}

export default function OptionsDropdown(props: Readonly<OptionsDropdownProps>) {
  const { user, isAdmin, isMe } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const hasRoleAdmin = indigoUser?.authorities?.includes("ROLE_ADMIN");
  return (
    <>
      <Menu>
        <MenuButton
          className={
            "h-8 w-8 rounded-md hover:bg-secondary-100 dark:hover:bg-white/10"
          }
        >
          <EllipsisHorizontalIcon />
        </MenuButton>
        <MenuItems anchor="bottom end">
          <MenuItem>
            <button
              type="button"
              className="flex w-full gap-2"
              onClick={() => dispatch({ type: "openEditDetails" })}
            >
              <PencilSquareIcon className="w-5" />
              Edit details
            </button>
          </MenuItem>
          {isAdmin ? (
            <>
              <MenuItem>
                <button
                  type="button"
                  className="flex w-full gap-2"
                  onClick={() => dispatch({ type: "openDisableUser" })}
                >
                  {user.active ? (
                    <>
                      <NoSymbolIcon className="w-5" />
                      Disable User
                    </>
                  ) : (
                    <>
                      <PowerIcon className="w-5" />
                      Enable User
                    </>
                  )}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="flex w-full gap-2"
                  onClick={() => dispatch({ type: "openAssignAdmin" })}
                >
                  <BookmarkSquareIcon className="w-5" />
                  {hasRoleAdmin ? "Revoke" : "Assign"} admin privileges
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="flex w-full gap-2"
                  onClick={() =>
                    dispatch({ type: "openChangeMembershipEndTime" })
                  }
                >
                  <CalendarIcon className="w-5" />
                  Change membership end time
                </button>
              </MenuItem>

              <MenuItem>
                <button
                  type="button"
                  className="flex w-full gap-2"
                  onClick={() => dispatch({ type: "openRequestAUPSignature" })}
                >
                  <DocumentTextIcon className="w-5" />
                  Request AUP signature
                </button>
              </MenuItem>
            </>
          ) : null}
          <MenuItem>
            <button
              type="button"
              className="flex w-full gap-2"
              onClick={() => dispatch({ type: "openSignAUP" })}
            >
              <DocumentTextIcon className="w-5" />
              {isMe ? "Sign AUP" : "Sign AUP on behalf of this user"}
            </button>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="flex w-full gap-2"
              onClick={() => dispatch({ type: "openChangePassword" })}
            >
              <KeyIcon className="w-5" />
              Change password
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <EditDetailsModal
        user={user}
        show={state.showEditDetails}
        onClose={() => dispatch({ type: "closeEditDetails" })}
      />
      <ChangePasswordModal
        show={state.showChangePassword}
        onClose={() => dispatch({ type: "closeChangePassword" })}
      />
      <DisableUser
        user={user}
        show={state.showDisableUser}
        onClose={() => dispatch({ type: "closeDisableUser" })}
      />
      <AssignAdminModal
        user={user}
        show={state.showAssignAdmin}
        onClose={() => dispatch({ type: "closeAssignAdmin" })}
      />
      <ChangeMembershipEndTimeModal
        user={user}
        show={state.showChangeMembershipEndTime}
        onClose={() => dispatch({ type: "closeChangeMembershipEndTime" })}
      />
      <SignAUPModal
        user={user}
        show={state.showSignAUP}
        isMe={isMe}
        onClose={() => dispatch({ type: "closeSignAUP" })}
      />
      <RequestAUPSignature
        user={user}
        show={state.showRequestAUPSignature}
        onClose={() => dispatch({ type: "closeRequestAUPSignature" })}
      />
    </>
  );
}
