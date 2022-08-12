import {
  Drawer,
  Space,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  AssigneeOptions,
  ContractorOptions,
  PackageOptions
} from "pages/constant";
import { useState } from "react";
import "./drawer.css";
import UploadFile from "./upload";

function DrawerData() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button onClick={showDrawer} className="btnNewSubmittal">
        + New Submittal
      </Button>
      <Drawer
        title="Create a new submittal"
        placement="right"
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <section className="container red-grid"> </section>
        <span className="HedingColor">SUBMITTAL</span>
        <Row gutter={30}>
          <Col span={24}>
            <section className="mt-2">
              <div>
                <Input placeholder="" allowClear />
              </div>
            </section>
          </Col>
          <Col span={24} className="discriptionColumn">
            <section className="mt-2">
              <span className="HedingColor ">DESCRIPTION</span>

              <TextArea
                className="discriptionArea"
                rows={3}
                placeholder="Fill the Discription"
                value=""
                maxLength={400}
              />
            </section>
          </Col>
          <Col span={24} className="duebyCol">
            <section className="mt-2">
              <span className="HedingColor ">DUE BY</span>
              <br />
              <DatePicker className="drawerDatePicker" />
            </section>
          </Col>

          <Col span={24} className="contractorCol">
            <section className="mt-2">
              <span className="HedingColor">CONTRACTOR</span>

              <Select
                className="constructionSelect"
                defaultValue="Construction"
              >
                {ContractorOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </section>
          </Col>

          <Col span={24} className="assignedCol">
            <section className="mt-2">
              <span className="HedingColor ">ASSIGNED</span>
              <br />
              <Select className="assignedSelect" defaultValue="All">
                {AssigneeOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </section>
          </Col>

          <Col span={24} className="packageCol">
            <section className="mt-2">
              <span className="HedingColor">PACAKGE</span>
              <br />
              <Select className="packageSelect" defaultValue="Select packages">
                {PackageOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </section>
          </Col>

          <Col span={12} className="dependsOnCol">
            <div className="block">
              <section className="mt-2">
                <span className="HedingColor">DEPENDS ON</span>
                <Select
                  className="dependsOnSelect"
                  defaultValue="Type to Search"
                >
                  <option value="5">Other</option>
                </Select>
              </section>
            </div>
          </Col>

          <Col span={12} className="drawertwoButtons">
            <section className="mt-2">
              <div className="block">
                <Button>+ 120 Electrical Wiring</Button>
                <br />
                <Button>+ 12134 design for soec</Button>
              </div>
            </section>
          </Col>

          <Col span={12} className="attachementsCol">
            <div className="block">
              <section className="mt-2">
                <span className="HedingColor">ATTACHMENTS</span>
                <UploadFile />
              </section>
            </div>
          </Col>
          <Col span={12} className="suggestedCol">
            <section className="mt-2">
              <span className="HedingColor">Suggested</span>
              <div className="block">
                <UploadFile />
              </div>
            </section>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default DrawerData;
