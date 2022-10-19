import { Col, Row, Select } from "antd";
import { SearchIcon } from "components/svg-icons";

function SearchDropdown({
  placeholder,
  data,
  onSelect,
  selectedValue = "",
  hasCurrentAccess
}: {
  placeholder: string;
  data: any;
  onSelect: Function;
  selectedValue: string;
  hasCurrentAccess: boolean;
}) {
  const { Option } = Select;
  const onChange = (value: string) => {
    onSelect(value);
  };

  return (
    <Row style={{ backgroundColor: "#0000000D" }}>
      <Col
        span={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SearchIcon />
      </Col>
      <Col span={20}>
        <Select
          style={{ width: "100%" }}
          bordered={false}
          value={selectedValue || null}
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          disabled={hasCurrentAccess}
          virtual={false}
        >
          {data.map((item: any) => (
            <Option value={item.submittalId} key={item.submittalId}>
              {item.submittal}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}

export default SearchDropdown;
