/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusIcon } from "components/svg-icons";
import "./add-new-column.css";
import {
  dateCellEditor,
  numberCellEditor,
  currencyCellEditor
} from "./components";

function AddNewColumn({ setNewColumnDataField, newColumnDataField }: any) {
  const [form] = Form.useForm<{ name: string; inputType: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form.validateFields().then(() => {
      setIsModalVisible(false);
      const formValue = form.getFieldsValue();
      if (formValue.inputType === "date") {
        setNewColumnDataField([
          ...newColumnDataField,
          {
            field: formValue.name,
            headerName: formValue.name.toUpperCase(),
            minWidth: 140,
            cellEditor: dateCellEditor
          }
        ]);
      } else if (formValue.inputType === "number") {
        setNewColumnDataField([
          ...newColumnDataField,
          {
            field: formValue.name,
            headerName: formValue.name.toUpperCase(),
            minWidth: 140,
            cellEditor: numberCellEditor
          }
        ]);
      } else if (formValue.inputType === "currency") {
        setNewColumnDataField([
          ...newColumnDataField,
          {
            field: formValue.name,
            headerName: formValue.name.toUpperCase(),
            minWidth: 140,
            editable: true,
            filter: "agNumberColumnFilter",
            cellEditor: currencyCellEditor
          }
        ]);
      } else {
        setNewColumnDataField([
          ...newColumnDataField,
          {
            field: formValue.name,
            headerName: formValue.name.toUpperCase(),
            minWidth: 140
          }
        ]);
      }
      form.resetFields();
    });
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
        <Form form={form} layout="vertical" name="control-hooks" preserve>
          <Form.Item
            name="name"
            label="Name"
            className="add-new-column-label"
            rules={[{ required: true, message: "Please input your name!" }]}
            validateTrigger="onBlur"
          >
            <Input name="name" className="add-new-column-input" />
          </Form.Item>
          <Form.Item
            className="add-new-column-label"
            name="inputType"
            label="Input type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select
              className="add-new-column-input-type"
              size="large"
              placeholder=""
              allowClear
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="date">Date</Option>
              <Option value="currency">Currency</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddNewColumn;
