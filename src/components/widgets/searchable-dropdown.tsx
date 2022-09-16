import { Col, Row, Select } from "antd";
import { SearchIcon } from "components/svg-icons";

function SearchableDropdown({
  placeholder,
  data,
  onSelect
}: {
  placeholder: string;
  data: any;
  onSelect: Function;
}) {
  const { Option } = Select;
  const onChange = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="search-align">
      <Row>
        <Col span={4}>
          <SearchIcon className="search-icon" />
        </Col>
        <Col span={20}>
          <Select
            className="search-input"
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
          >
            {data.map((item: any) => (
              <Option
                value={item.topicId}
                key={item.topicId}
                className="select-topic-option"
              >
                {item.topicName}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default SearchableDropdown;
