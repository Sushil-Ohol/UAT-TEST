import { SearchOutlined } from "@ant-design/icons";
// import { AgGridReact } from "ag-grid-react";
import { Row, Col, Space, Input, Select } from "antd";
// import { useCallback, useRef } from "react";
import CreateSubmittal from "./create-submittal";
import { StatusOptions, ContractorOptions } from "../constant";

// interface SubmittalGrid {
//   id: number;
//   submittal: string;
//   notification: number;
//   comments: number;
//   revision: number;
//   status: string;
//   dueBy: string;
//   contractor: string;
//   dependsOn: string;
//   assigned: string;
// }
// type onhangeProps = {
//   gridRef: any;
// };

/* Project Details Page */
function Filters(gridRef: any) {
  // const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  console.log(gridRef, "gridrefcall");

  // const onFilterTextBoxChanged = useCallback(() => {
  //   gridRef.current!.api.setQuickFilter(
  //     (document.getElementById("filter-text-box") as HTMLInputElement).value
  //   );
  // }, []);
  return (
    <Row className="FilterRow">
      <Col span={24}>
        <Space>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Search"
            prefix={<SearchOutlined />}
            // onInput={onFilterTextBoxChanged}
          />
          <Input.Group compact>
            &nbsp;&nbsp;
            <Input style={{ width: "10%" }} defaultValue="Status" disabled />
            <Select
              style={{ width: 85 }}
              // onChange={(value: any) => {
              //   gridRef.current!.api.setQuickFilter(value);
              // }}
              defaultValue="All"
            >
              {StatusOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            &nbsp;&nbsp;
            <Input
              style={{ width: "10%" }}
              defaultValue="Contractor"
              disabled
            />
            <Select
              style={{ width: 85 }}
              // onChange={(value: any) => {
              //   gridRef.current!.api.setQuickFilter(value);
              // }}
              defaultValue="All"
            >
              {ContractorOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            &nbsp;&nbsp;
            <Input style={{ width: "10%" }} defaultValue="Due" disabled />
            <Select
              style={{ width: 100 }}
              // onChange={(value: any) => {
              //   gridRef.current!.api.setQuickFilter(value);
              // }}
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
