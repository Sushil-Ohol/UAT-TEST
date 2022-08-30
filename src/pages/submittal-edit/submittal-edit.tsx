import { Button, Row, Col, Select, Form, DatePicker } from "antd";
// import TextArea from "antd/lib/input/TextArea";
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
  const [dueBy, setDueBy] = useState();
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");

  const onApplyButtonClick = () => {
    const data = {
      contractor,
      status,
      assigned,
      dueBy
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
        <Col span={24} className="duebyCol">
          <section className="mt-2">
            <span className="HedingColor">DUE BY</span>
            <DatePicker
              className="dueBy"
              format="DD-MM-YYYY"
              onChange={(value: any) => {
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
              defaultValue="Select Contractor"
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
        <Col span={24} className="assignedCol">
          <section className="mt-2">
            <span className="HedingColor">ASSIGNED</span>
            <Select
              className="assignedSelect"
              defaultValue="Assigned To"
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
      </Row>

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
    </Form>
  );
}

export default SubmittalEdit;
