import { Button, Card, Space } from "antd";
import "./submittal-list-bottom-bar.css";

function SubmittalListBottomBar(props: any) {
  const {
    selected,
    onSubmittalEditClick,
    onStagingZoneClick,
    showStagingZone
  } = props;
  return (
    <section className="blue-grid" style={{ marginTop: "15px" }}>
      <Card
        bordered={false}
        className="CardDetails"
        style={{ paddingLeft: "15px", padding: "10px" }}
      >
        <Space size={15}>
          <div>
            <span>{selected} Selected</span>
          </div>
          <div>
            <Button
              onClick={onSubmittalEditClick}
              size="middle"
              disabled={selected === 0}
              className="bottomBarBtn"
            >
              Edit
            </Button>
          </div>
          <div>
            <Button block disabled={selected === 0} className="bottomBarBtn">
              Create a Package
            </Button>
          </div>
          <div>
            <Button block disabled={selected === 0} className="bottomBarBtn">
              Merge...
            </Button>
          </div>
          <div>
            <Button block disabled={selected === 0} className="bottomBarBtn">
              Archive
            </Button>
          </div>
        </Space>
        {!showStagingZone && (
          <Button
            onClick={onStagingZoneClick}
            size="middle"
            style={{
              float: "right",
              marginTop: "0%",
              backgroundColor: "#F0F0F0",
              color: "#000",
              border: "1px solid D0D0D0"
            }}
          >
            Staging Zone
          </Button>
        )}
      </Card>
    </section>
  );
}
export default SubmittalListBottomBar;
