import UserAvatar from "./user-avatar";
import "./user-avatar.css";

function UserAvatarWithDetails({
  fullName,
  email,
  workEmail,
  style,
  photo,
  badge,
  showAvatar
}: any) {
  const url = photo || null;
  // const size1 = size || "default";
  const showAvatar1 = showAvatar !== undefined ? showAvatar : true;

  return (
    <div className="users-container" style={style}>
      {showAvatar1 && (
        <UserAvatar
          url={url}
          isRect={false}
          email={email}
          fullName={fullName}
        />
      )}
      <div className="name-email">
        <div className="name">
          {fullName || "N/A"} {badge}
        </div>
        <div className="email">{email}</div>
        {workEmail && (
          <div className="email">
            <b>Email:</b> <br /> {workEmail}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAvatarWithDetails;
