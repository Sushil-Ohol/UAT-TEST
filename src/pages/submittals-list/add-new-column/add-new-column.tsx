import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusIcon } from "components/svg-icons";
import "./add-new-column.css";

function AddNewColumn() {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="add-new-column-btn" onClick={showModal}>
        <PlusIcon />
      </Button>
      <Modal
        className="add-new-column"
        title="New Column"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Add"
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="name" label="Name" className="add-new-column-label">
            <Input name="name" className="add-new-column-input" />
          </Form.Item>
          <Form.Item
            className="add-new-column-label"
            name="gender"
            label="Input type"
          >
            <Select
              className="add-new-column-input-type"
              size="large"
              placeholder=""
              allowClear
            >
              <Option value="string">String</Option>
              <Option value="text">Text</Option>
              <Option value="date">Date</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddNewColumn;
