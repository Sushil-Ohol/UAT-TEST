import {
  Drawer,
  Space,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Upload
} from "antd";

import TextArea from "antd/lib/input/TextArea";

import { useState } from "react";

function CreateSubmittal() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        style={{ marginLeft: "320px", display: "flex" }}
        onClick={showDrawer}
      >
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
              <div className="">
                <Input placeholder="" allowClear />
              </div>
            </section>
          </Col>
          <Col span={24} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor ">DISCRIPTION</span>

              <TextArea
                style={{
                  color: "black",
                  width: "100%",
                  background: "##DCDCDC"
                }}
                rows={3}
                placeholder="Fill the Discription"
                value=""
                maxLength={400}
              />
            </section>
          </Col>
          <Col span={24} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor ">DUE BY</span>
              <br />

              <DatePicker
                style={{ color: "black", width: "60%", background: "##DCDCDC" }}
              />
            </section>
          </Col>

          <Col span={24} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor">CONTRACTOR</span>

              <Select style={{ width: "100%" }} defaultValue="Construction">
                <option value="0">ABC Construction</option>
                <option value="1">Birla Construction</option>
                <option value="2">Acc Construction</option>
                <option value="3">Ambuja Construction</option>
                <option value="4">Tata Construction</option>
                <option value="5">Other Construction</option>
              </Select>
            </section>
          </Col>

          <Col span={24} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor ">ASSIGNED</span>
              <br />

              <Select style={{ width: 200 }} defaultValue="All">
                <option value="0">Luck Church</option>
                <option value="1">Jone Doe</option>
              </Select>
            </section>
          </Col>

          <Col span={24} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor">PACAKGE</span>
              <br />

              <Select style={{ width: 200 }} defaultValue="Select packages">
                <option value="0">920:Electricals</option>
              </Select>
            </section>
          </Col>

          <Col span={12} style={{ marginTop: "15px" }}>
            <div className="block">
              <section className="mt-2">
                <span className="HedingColor">DEPENDS ON</span>
                <Select style={{ width: "100%" }} defaultValue="Type to Search">
                  <option value="5">Other</option>
                </Select>
              </section>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <div className="block">
                <Button>+ 120 Electrical Wiring</Button>
                <br />
                <Button>+ 12134 design for soec</Button>
              </div>
            </section>
          </Col>

          <Col span={12} style={{ marginTop: "15px" }}>
            <div className="block">
              <section className="mt-2">
                <span className="HedingColor">ATTACHMENTS</span>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={3}
                  multiple
                >
                  <Button>+ Upload </Button>
                </Upload>
              </section>
            </div>
          </Col>
          <Col span={12} style={{ marginTop: "15px" }}>
            <section className="mt-2">
              <span className="HedingColor">Suggested</span>
              <div className="block">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={3}
                  multiple
                >
                  <Button>+ Upload </Button>
                </Upload>
              </div>
            </section>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default CreateSubmittal;
