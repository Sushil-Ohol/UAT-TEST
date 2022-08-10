import { Drawer, Space, Button, Row, Col, Input, Select } from "antd";

import { useState } from "react";

import "./add-column.css";

function AddColumn() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button onClick={showDrawer} className="addCoumn">
        + Add Column
      </Button>
      <Drawer
        title="Add Column"
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
        <span className="HedingColor">Column Name</span>
        <Row gutter={30}>
          <Col span={24}>
            <section className="mt-2">
              <div className="">
                <Input placeholder="" allowClear />
              </div>
            </section>
          </Col>
          <Col span={24} className="typeCloumn">
            <section className="mt-2">
              <span className="HedingColor">Type</span>

              <Select style={{ width: "100%" }} defaultValue="Please Select">
                <option value="0">String</option>
                <option value="1">Text</option>
                <option value="2">Date</option>
              </Select>
            </section>
          </Col>

          <Col span={12} className="submitaddColumnBtn">
            <div>
              <section>
                <Button size="middle" className="submit">
                  Submit
                </Button>
              </section>
            </div>
          </Col>
          <Col span={12} className="cancleaddColumnBtn">
            <section className="mt-2">
              <div>
                <Button size="middle" className="cancle" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </section>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default AddColumn;
