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
        <Col span={3}>
          <SearchIcon className="search-icon" />
        </Col>
        <Col span={21}>
          <Select
            virtual={false}
            className="search-input"
            showSearch
            allowClear
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) => {
              return (
                option!.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option!.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {data.map((item: any) => (
              <Option
                title={item.topicName}
                value={item.topicId}
                key={item.topicId}
                className="select-topic-option"
              >
                {item.type === "related" && item.topicId} &nbsp;
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
