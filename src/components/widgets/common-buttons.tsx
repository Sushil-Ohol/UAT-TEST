import { MoreOutlined } from "@ant-design/icons";

function MoreOutlinedButton() {
  return <MoreOutlined />;
}

function CommentButton() {
  return <i className="far fa-comments mx-auto btn-lg" aria-hidden="true" />;
}

function NotificationBellButton() {
  return (
    <i
      className="far fa-bell align-items-center d-flex col-md-6 btn-lg"
      aria-hidden="true"
    />
  );
}

function RevisionButton() {
  return (
    <i
      className="far fa-file align-items-center d-flex col-md-6 btn-lg"
      aria-hidden="true"
    />
  );
}

export default {
  MoreOutlinedButton,
  CommentButton,
  NotificationBellButton,
  RevisionButton
};
