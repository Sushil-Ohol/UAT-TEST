import { Button, Row, Col, Input, Select, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { DropDownData } from "../../constants";
import "./submittal-edit.css";

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick } = props;

  const onApplyButtonClick = () => {
    const data = {
      description: "",
      status: "Approved"
    };
    onApplyClick(data);
  };

  return (
    <Form>
      <Row gutter={2}>
        <span className="HedingColor">DESCRIPTION</span>
        <Col span={24} className="discriptionColumn">
          <section className="mt-2">
            <TextArea
              className="discriptionArea"
              rows={3}
              placeholder="Fill the Discription"
              value=""
              maxLength={400}
            />
          </section>
        </Col>
        <Col span={24} className="packageCol">
          <section className="mt-2">
            <span className="HedingColor">STATUS</span>
            <br />
            <Select className="statusSelect" defaultValue="Select Status">
              {DropDownData.StatusOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </section>
        </Col>
        <Col span={24} className="contractorCol">
          <section className="mt-2">
            <span className="HedingColor">CONTRACTOR</span>

            <Select className="constructionSelect" defaultValue="Construction">
              {DropDownData.ContractorOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </section>
        </Col>
        &nbsp;&nbsp;
        <Col span={24}>
          <section className="mt-2">
            <div>
              <span className="HedingColor">EXTRA COLUMN 1</span>
            </div>
            <Form.Item>
              <Input placeholder="" className="ExtraColumn" />
            </Form.Item>
          </section>
        </Col>
        &nbsp;&nbsp;
        <Col span={24}>
          <section className="mt-2">
            <div>
              <span className="HedingColor">EXTRA COLUMN 2</span>
            </div>
            <Input />
          </section>
        </Col>
        &nbsp;&nbsp;
        <Col span={24}>
          <section className="mt-2">
            <div id="outerBox">
              <div className="innerBox">
                <Button className="SubEditCancelBtn" onClick={onCancelClick}>
                  Cancel
                </Button>
              </div>
              <div className="innerBox">
                <Button
                  type="primary"
                  className="SubEditApplyBtn"
                  onClick={onApplyButtonClick}
                >
                  Apply
                </Button>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Form>
  );
}

export default SubmittalEdit;
