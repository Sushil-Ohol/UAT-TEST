import { Select } from "antd";

type Props = {
  title: string;
  value: string | undefined;
  onChange: ((value: string, option: any) => void) | undefined;
  showSearch: boolean;
  filterOption: boolean | ((inputValue: string, option?: any) => boolean);
  children: React.ReactNode[];
  hasCurrentAccess: boolean;
};
function SelectField(props: Props) {
  const {
    title,
    value,
    onChange,
    showSearch,
    filterOption,
    children,
    hasCurrentAccess
  } = props;
  return (
    <>
      <p className="heading">{title}</p>
      <Select
        className="selectStyle"
        value={value}
        onChange={onChange}
        showSearch={showSearch}
        optionFilterProp="children"
        filterOption={filterOption}
        // defaultValue="Luke"
        disabled={hasCurrentAccess}
      >
        {children}
      </Select>
    </>
  );
}

export default SelectField;
