import { useCallback } from "react";
import { Input, Select, Button, Col, Row, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DropDownData } from "../../../constants";
import "../submittal-list.css";

function SubmittalListFilterComponent(props: any) {
  const { gridRef, onApplyClick, onNewClick } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  return (
    <div className="FilterRow" style={{ display: "flex" }}>
      <Space>
        <section>
          <Row gutter={30}>
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
            &nbsp;&nbsp;
            <Col span={4}>
              <div>
                <Input.Group compact>
                  <Input
                    className="StatusInput"
                    defaultValue="Status"
                    disabled
                  />
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
              </div>
            </Col>
            <Col span={4}>
              <div className="block">
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
              </div>
            </Col>
            <Col span={4}>
              <div className="block">
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
              </div>
            </Col>
            <Col span={4}>
              <div className="block">
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
                    {DropDownData.ContractorOptions.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Input.Group>
              </div>
            </Col>
            <Col span={4}>
              <div className="block">
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
                    {DropDownData.AssignOptions.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Input.Group>
              </div>
            </Col>
          </Row>
        </section>
      </Space>

      <div style={{ marginLeft: "auto" }}>
        <span>
          <Button onClick={onApplyClick} size="small">
            Apply
          </Button>
          <Button onClick={onNewClick} size="small">
            + New Submittal
          </Button>
        </span>
      </div>
    </div>
  );
}

export default SubmittalListFilterComponent;
