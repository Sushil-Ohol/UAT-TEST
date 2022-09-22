/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dropdown, Menu } from "antd";
import "./account-menu.css";
import { UserAvatarWithDetails } from "components/user-avatar";
import { useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { RootState } from "store/slices";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store";
import { logOut } from "store/slices/signIn";
import { UserIcon } from "../svg-icons/index";

function AccountMenu() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSignOut = () => {
    dispatch(logOut());
    history.replace("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <UserAvatarWithDetails
          showAvatar
          fullName={auth.currentUser?.name}
          email={auth.currentUser?.email}
        />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="sign-out">
        <div onClick={() => onSignOut()} className="sign-out">
          <LogoutOutlined />
          <div style={{ marginLeft: ".25em" }}>Sign out</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={auth.currentUser ? menu : <div>No data</div>}
      trigger={["click"]}
    >
      <div data-cy="account" className="accMenuContainer">
        <UserIcon />
      </div>
    </Dropdown>
  );
}

export default AccountMenu;
