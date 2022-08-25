import { Button, Card, Col, Row } from "antd";

function SubmittalListBottomBar(props: any) {
  const { selected } = props;
  return (
    <section className="blue-grid">
      <Card bordered={false} className="CardDetails">
        <Row gutter={12}>
          <Col span={2}>
            <div>
              <span>{selected} Selected</span>
            </div>
          </Col>
          <Col span={3}>
            <div>
              <Button block>Create a Package...</Button>
            </div>
          </Col>
          <Col span={3}>
            <div>
              <Button block>Merge...</Button>
            </div>
          </Col>
          <Col span={3}>
            <div>
              <Button block>Archive</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </section>
  );
}
export default SubmittalListBottomBar;
