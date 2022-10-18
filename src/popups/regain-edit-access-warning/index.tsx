import { DownOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Card, Divider, Dropdown } from "antd";
import { LockIcon } from "components/svg-icons";
import { CompanyChangeWarningMessages } from "constants/index";
import { useAppDispatch, useAppSelector } from "store";
import { setRegainEditModal } from "store/slices/submittalsSlices";
import "./regain-edit-access-warning-msg.css";

function RegainEditAccessWarning(props: { currentAccess: string | undefined }) {
  const { currentAccess } = props;
  const dispatch = useAppDispatch();
  const { selectedSubmittalLog } = useAppSelector((state) => state.submittals);

  const companyName = selectedSubmittalLog
    ? selectedSubmittalLog.company.name
    : "";

  const onForceRegain = () => {
    dispatch(setRegainEditModal(true));
  };

  const menu = (
    <Card style={{ width: 415 }}>
      <p
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `${CompanyChangeWarningMessages.firstMsg.replace(
            "{companyName}",
            companyName
          )}`
        }}
        style={{ margin: "14px", color: "#0000007F" }}
      />
      <Divider style={{ margin: "0px" }} />
      <div style={{ padding: "0px 14px 14px" }}>
        <p style={{ color: "#FF3535", marginBottom: "0px" }}>
          <WarningFilled style={{ marginRight: "8px" }} />
          <Button
            style={{
              border: "none",
              padding: "0px",
              margin: "0px",
              color: "#FF3535",
              boxShadow: "none"
            }}
            onClick={onForceRegain}
          >
            {CompanyChangeWarningMessages.secondMsg}{" "}
          </Button>
        </p>
        <p
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: `${CompanyChangeWarningMessages.thirdMsg.replace(
              "{companyName}",
              companyName
            )}`
          }}
          style={{ margin: "0px", marginLeft: "22px", color: "#0000007F" }}
        />
      </div>
    </Card>
  );
  return (
    <Dropdown
      overlay={menu}
      disabled={currentAccess === "You"}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Button className="dropDownBtn subDetailsSplitBtn">
        <LockIcon
          style={{
            marginRight: "8px",
            fill: currentAccess === "You" ? "#000000" : "#FF3535"
          }}
        />
        {currentAccess}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default RegainEditAccessWarning;
