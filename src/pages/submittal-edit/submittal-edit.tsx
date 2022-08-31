import { Button, Row, Col, Select, Form, DatePicker } from "antd";
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
        <Col span={24} className="packageCol">
          <section className="mt-2">
            <span className="HedingColor">Status</span>
            <br />
            <Select
              className="statusSelect"
              onChange={(value: any) => {
                setStatus(value);
              }}
            >
              {DropDownData.StatusOptions.filter((x) => x !== "All").map(
                (item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                )
              )}
            </Select>
          </section>
        </Col>
        <Col span={24} className="packageCol">
          <section className="mt-2">
            <span className="HedingColor">Due Date</span>
            <br />
            <DatePicker
              className="drawerDatePicker"
              onChange={(value) => {
                if (value) {
                  setDueBy(value.format("MM/DD/YYYY"));
                }
              }}
            />
          </section>
        </Col>
        <Col span={24} className="contractorCol">
          <section className="mt-2">
            <span className="HedingColor">Contractor</span>
            <Select
              className="constructionSelect"
              onChange={(value: any) => {
                setContractor(value);
              }}
            >
              {DropDownData.ContractorOptions.filter((x) => x !== "All").map(
                (item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                )
              )}
            </Select>
          </section>
        </Col>
        <Col span={24} className="contractorCol">
          <section className="mt-2">
            <span className="HedingColor">Assigned</span>
            <Select
              className="constructionSelect"
              onChange={(value: any) => {
                setAssigned(value);
              }}
            >
              {DropDownData.AssigneeOptions.filter((x) => x !== "All").map(
                (item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                )
              )}
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
