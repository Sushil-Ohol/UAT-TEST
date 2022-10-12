import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { PlusIcon } from "components/svg-icons";
import "./add-new-column.css";
import {
  NumberCellEditor,
  CurrencyCellEditor,
  DateCellEditor
} from "components";
import { camelCase } from "utils/stringutil";
import { voidStartingSpaceInput } from "utils/inpututils";

interface Props {
  onNewColumnAddition: Function;
  gridRef: any;
}
function AddNewColumn({ onNewColumnAddition, gridRef }: Props) {
  const [form] = Form.useForm<{ name: string; inputType: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const isColumnExists = (columnName: string): boolean => {
    const index = gridRef.current.props.columnDefs.findIndex(
      (x: any) => x.field === camelCase(columnName)
    );
    return index > -1;
  };

  const handleOk = () => {
    form.validateFields().then((value) => {
      if (!isColumnExists(value.name)) {
        let newColumObject;
        switch (value.inputType) {
          case "date":
            newColumObject = {
              field: camelCase(value.name),
              headerName: value.name.toUpperCase(),
              cellEditor: DateCellEditor,
              cellEditorParams: { type: "date" }
            };
            break;
          case "number":
            newColumObject = {
              field: camelCase(value.name),
              headerName: value.name.toUpperCase(),
              cellEditor: NumberCellEditor,
              cellEditorParams: { type: "number" }
            };
            break;
          case "currency":
            newColumObject = {
              field: camelCase(value.name),
              headerName: value.name.toUpperCase(),
              cellEditor: CurrencyCellEditor,
              cellEditorParams: { type: "currency" },
              cellRenderer: (params: any) =>
                params.value !== undefined &&
                params.value !== "" &&
                `$ ${parseFloat(params.value).toFixed(2)}`
            };
            break;

          default:
            newColumObject = {
              field: camelCase(value.name),
              headerName: value.name.toUpperCase()
            };
            break;
        }
        onNewColumnAddition(newColumObject);
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Column already exists");
      }
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
              {
                required: true,
                message: "Please enter name for a new column!"
              }
            ]}
          >
            <Input
              name="name"
              className="add-new-column-input"
              placeholder="Enter column name"
              onInput={voidStartingSpaceInput}
            />
          </Form.Item>
          <Form.Item
            className="add-new-column-label"
            name="inputType"
            label="Input type"
            rules={[
              {
                required: true,
                message: "Please select an input type for a new column!"
              }
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
