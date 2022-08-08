import { SearchOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Row, Col, Space, Input, Select } from "antd";
import { useRef } from "react";
import CreateSubmittal from "./create-submittal";
import { StatusOptions, ContractorOptions } from "../constant";

interface SubmittalGrid {
  id: number;
  submittal: string;
  notification: number;
  comments: number;
  revision: number;
  status: string;
  dueBy: string;
  contractor: string;
  dependsOn: string;
  assigned: string;
}

/* Project Details Page */
function Filters() {
  const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  return (
    <Row className="FilterRow">
      <Col span={24}>
        <Space>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
          <Input.Group compact>
            &nbsp;&nbsp;
            <Input style={{ width: "10%" }} defaultValue="Status" disabled />
            <Select
              style={{ width: 85 }}
              onChange={(value: any) => {
                gridRef.current!.api.setQuickFilter(value);
              }}
              defaultValue="All"
            >
              {StatusOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            {/* </Input.Group> */}
            &nbsp;&nbsp;
            {/* <Input.Group compact> */}
            <Input
              style={{ width: "10%" }}
              defaultValue="Contractor"
              disabled
            />
            <Select
              style={{ width: 85 }}
              onChange={(value: any) => {
                gridRef.current!.api.setQuickFilter(value);
              }}
              defaultValue="All"
            >
              {ContractorOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            {/* </Input.Group> */}
            &nbsp;&nbsp;
            {/* <Input.Group compact> */}
            <Input style={{ width: "10%" }} defaultValue="Due" disabled />
            <Select
              style={{ width: 100 }}
              onChange={(value: any) => {
                gridRef.current!.api.setQuickFilter(value);
              }}
              defaultValue="Past due"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <section>
              <CreateSubmittal />
            </section>
          </Input.Group>
        </Space>
      </Col>
    </Row>
  );
}

export default Filters;
