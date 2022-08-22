import { useCallback } from "react";
import { Input, Select, Button, Col, Row, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DropDownData } from "../../../constants";
import "../submittal-list.css";

function SubmittalListFilterComponent(props: any) {
  const { gridRef, onNewClick, onSubmittalEditClick } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  return (
    <div className="FilterRow" style={{ display: "flex" }}>
      <Space>
        <section>
          <Row gutter={10}>
            <Col span={3}>
              <div className="SearchInput">
                <Input.Group compact>
                  <Input
                    type="text"
                    id="filter-text-box"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onInput={onFilterTextBoxChanged}
                  />
                </Input.Group>
              </div>
            </Col>
            &nbsp;
            <Col span={4}>
              <Input.Group compact>
                <Input className="StatusInput" defaultValue="Status" disabled />
                <Select
                  className="StatusInputSelect"
                  onChange={(value: any) => {
                    gridRef.current!.api.setQuickFilter(value);
                  }}
                  defaultValue="All"
                >
                  {DropDownData.StatusOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
            <Col span={4}>
              <Input.Group compact>
                <Input
                  className="ContractorInput"
                  defaultValue="Contractor"
                  disabled
                />
                <Select
                  className="ContractorInputInputSelect"
                  onChange={(value: any) => {
                    gridRef.current!.api.setQuickFilter(value);
                  }}
                  defaultValue="All"
                >
                  {DropDownData.ContractorOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
            <Col span={4}>
              <Input.Group compact>
                <Input className="DueInput" defaultValue="Due" disabled />
                <Select
                  className="DueInputSelect"
                  onChange={(value: any) => {
                    gridRef.current!.api.setQuickFilter(value);
                  }}
                  defaultValue="All"
                >
                  {DropDownData.PastDueOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
            <Col span={4}>
              <Input.Group compact>
                <Input
                  className="DependsOnInput"
                  defaultValue="Depends On"
                  disabled
                />
                <Select
                  className="DependsOnInputSelect"
                  onChange={(value: any) => {
                    gridRef.current!.api.setQuickFilter(value);
                  }}
                  defaultValue="All"
                >
                  {DropDownData.DependsOnOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
            <Col span={4}>
              <Input.Group compact>
                <Input
                  defaultValue="Assigned"
                  className="AssignedInput"
                  disabled
                />
                <Select
                  className="AssignedInputSelect"
                  onChange={(value: any) => {
                    gridRef.current!.api.setQuickFilter(value);
                  }}
                  defaultValue="All"
                >
                  {DropDownData.AssigneeOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
          </Row>
        </section>
      </Space>

      <div id="outer" className="EditSubmittalbtn">
        <span>
          <div>
            <div className="inner">
              <Button
                onClick={onSubmittalEditClick}
                size="middle"
                className="EditBtn"
              >
                Edit
              </Button>
            </div>
            <div className="inner">
              <Button
                onClick={onNewClick}
                size="middle"
                className="NweSubmittalBtn"
              >
                + New Submittal
              </Button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default SubmittalListFilterComponent;
