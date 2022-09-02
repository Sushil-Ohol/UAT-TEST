import { Button, Card, Space } from "antd";
import "./submittal-list-bottom-bar.css";

function SubmittalListBottomBar(props: any) {
  const { selected, onSubmittalEditClick } = props;
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
      </Card>
    </section>
  );
}
export default SubmittalListBottomBar;
