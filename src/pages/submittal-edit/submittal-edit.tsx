import { Button, Row, Col, Select, Form, Input } from "antd";
import { useState } from "react";
import { DropDownData } from "../../constants";
import "./submittal-edit.css";

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick } = props;
  const [contractor, setContractor] = useState("");
  const [dueBy, setDueBy] = useState("");
  const [assigned, setAssigned] = useState("");
  const [status, setStatus] = useState("");

  const onApplyButtonClick = () => {
    const data = {
      contractor,
      status,
      dueBy,
      assigned
    };
    onApplyClick(data);
  };

  return (
    <Form>
      <Row gutter={2}>
        {/* <span className="HedingColor">DESCRIPTION</span>
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
        </Col> */}
        <Col span={24} className="packageCol">
          <section className="mt-2">
            <span className="HedingColor">STATUS</span>
            <br />
            <Select
              className="statusSelect"
              defaultValue="Select Status"
              onChange={(value: any) => {
                setStatus(value);
              }}
            >
              {DropDownData.StatusOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </section>
        </Col>
        <Col span={24} className="packageCol">
          <section className="mt-2">
            <span className="HedingColor">Due Date</span>
            <br />
            <Input
              className="statusSelect"
              defaultValue="Set Due By"
              onBlur={(value: any) => {
                setDueBy(value);
              }}
            />
          </section>
        </Col>
        <Col span={24} className="contractorCol">
          <section className="mt-2">
            <span className="HedingColor">CONTRACTOR</span>
            <Select
              className="constructionSelect"
              defaultValue="Construction"
              onChange={(value: any) => {
                setContractor(value);
              }}
            >
              {DropDownData.ContractorOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </section>
        </Col>
        <Col span={24} className="contractorCol">
          <section className="mt-2">
            <span className="HedingColor">Assigned</span>
            <Select
              className="constructionSelect"
              defaultValue="Luke"
              onChange={(value: any) => {
                setAssigned(value);
              }}
            >
              {DropDownData.AssigneeOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </section>
        </Col>
        <Col span={24}>
          <section className="mt-2">
            <div id="outerBox" style={{ margin: 10 }}>
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
