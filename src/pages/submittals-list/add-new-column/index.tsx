/* eslint-disable react/no-unstable-nested-components */

import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusIcon } from "components/svg-icons";
import "./add-new-column.css";
import {
  NumberCellEditor,
  CurrencyCellEditor,
  DateCellEditor
} from "components";
import { camelCase } from "utils/stringutil";

interface Props {
  onNewColumnAddition: Function;
}
function AddNewColumn({ onNewColumnAddition }: Props) {
  const [form] = Form.useForm<{ name: string; inputType: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((value) => {
      let newColumObject;
      switch (value.inputType) {
        case "date":
          newColumObject = {
            field: camelCase(value.name),
            headerName: value.name.toUpperCase(),
            minWidth: 140,
            cellEditor: DateCellEditor
          };
          break;
        case "number":
          newColumObject = {
            field: camelCase(value.name),
            headerName: value.name.toUpperCase(),
            minWidth: 140,
            cellEditor: NumberCellEditor
          };
          break;
        case "currency":
          newColumObject = {
            field: camelCase(value.name),
            headerName: value.name.toUpperCase(),
            minWidth: 140,
            editable: true,
            filter: "agNumberColumnFilter",
            cellEditor: CurrencyCellEditor
          };
          break;

        default:
          newColumObject = {
            field: camelCase(value.name),
            headerName: value.name.toUpperCase(),
            minWidth: 140
          };
          break;
      }
      onNewColumnAddition(newColumObject);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
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
        <Form layout="vertical" name="control-hooks" preserve form={form}>
          <Form.Item
            name="name"
            label="Name"
            className="add-new-column-label"
            rules={[
              { required: true, message: "Please Enter new column name!" }
            ]}
          >
            <Input
              name="name"
              className="add-new-column-input"
              placeholder="Enter column name"
            />
          </Form.Item>
          <Form.Item
            className="add-new-column-label"
            name="inputType"
            label="Input type"
            rules={[
              { required: true, message: "Please select the column data type!" }
            ]}
          >
            <Select
              className="add-new-column-input-type"
              size="large"
              placeholder="Select column data type"
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
