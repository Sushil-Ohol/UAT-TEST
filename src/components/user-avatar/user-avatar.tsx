/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Avatar } from "antd";
import "./user-avatar.css";
// const SIZES = { small: "22", default: "34" };

type UserAvatarProps = {
  url: string;
  email: string;
  fullName: string;
  isRect: boolean;
  // size: string;
};
function UserAvatar({ url, email, fullName, isRect }: UserAvatarProps) {
  const shape = isRect ? "square" : "circle";
  const avatarWidth = isRect ? "100px" : "34px";
  // const _size = size || "default";
  const letterSplit = (fullName && fullName.split(" ")) || ["No", "Name"];
  let letters = letterSplit.map((word: string) => word[0]).join("");
  if (letters.length > 3) {
    letters = letters.slice(0, 3);
  }
  if (!url && email) {
    url = `https://www.gravatar.com/avatar/${email}?d=robohash`;
  }

  // const heightWidth = SIZES[_size as keyof typeof SIZES] || "34";

  return (
    <div className="avator">
      {!url && (
        <Avatar
          shape={shape}
          style={{ width: avatarWidth, textTransform: "uppercase" }}
        >
          {letters}
        </Avatar>
      )}
      {url && <img src={url} alt="Profile" height={34} width={34} />}
    </div>
  );
}

export default UserAvatar;
