import { useCallback, useState } from "react";
import { Input, Select, Button, Col, Row, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ISetFilter } from "ag-grid-community";
import moment from "moment";
import { DateRangePickerModal } from "../../../components";
import { DropDownData } from "../../../constants";
import "../submittal-list.css";

export type FilterProps = {
  gridRef: any;
  onNewClick: any;
};

function SubmittalListFilterComponent(props: FilterProps) {
  const { gridRef, onNewClick } = props;
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [customDateRange, setCustomDateRange] = useState<any>();

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  const onSelectBoxChanged = (filterCol: string, selectedVal: string) => {
    const filterComponent = gridRef.current!.api.getFilterInstance(
      filterCol
    ) as ISetFilter;
    const filterValues = filterComponent.getValues().filter((value: any) => {
      if (selectedVal === "All") {
        return true;
      }
      return value === selectedVal;
    });
    filterComponent.setModel({ values: filterValues });
    gridRef.current!.api.onFilterChanged();
  };

  const onDateSelectBoxChanged = (filterCol: string, selectedVal: any) => {
    const filterComponent = gridRef.current!.api.getFilterInstance(
      filterCol
    ) as ISetFilter;

    const filterValues = filterComponent.getValues().filter((value: any) => {
      const tempDate = value.split("-");
      const currentDate = moment(
        `${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`
      ).format("MM/DD/YYYY");

      switch (selectedVal) {
        case "Past due date": {
          const selectedDate = moment()
            .subtract(1, "days")
            .format("MM/DD/YYYY");
          return currentDate < selectedDate;
        }
        case "Due today": {
          const selectedDate = moment().format("MM/DD/YYYY");
          return currentDate === selectedDate;
        }
        case "Next 3 days": {
          const nextDate = moment().add(3, "days").format("MM/DD/YYYY");
          const today = moment().format("MM/DD/YYYY");
          return currentDate <= nextDate && currentDate > today;
        }
        case "Custom":
          setModalOpen(true);
          return true;
        default:
          return false;
      }
    });
    filterComponent.setModel({ values: filterValues });
    gridRef.current!.api.onFilterChanged();
  };

  const onCustomDateFilterChanged = () => {
    if (customDateRange) {
      const from = moment(customDateRange[0]).format("MM/DD/YYYY");
      const to = moment(customDateRange[1]).format("MM/DD/YYYY");

      const filterComponent = gridRef.current!.api.getFilterInstance(
        "dueBy"
      ) as ISetFilter;
      const filterValues = filterComponent.getValues().filter((value: any) => {
        const tempDate = value.split("-");
        const currentDate = moment(
          `${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`
        ).format("MM/DD/YYYY");
        return currentDate >= from && currentDate <= to;
      });
      filterComponent.setModel({ values: filterValues });
      gridRef.current!.api.onFilterChanged();
    }
  };

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
                  onChange={(value: any) => onSelectBoxChanged("status", value)}
                  defaultValue="All"
                  dropdownClassName="select-custom-dropDown"
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
                  onChange={(value: any) =>
                    onSelectBoxChanged("contractor", value)
                  }
                  defaultValue="All"
                  dropdownClassName="select-custom-dropDown"
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
                  onChange={(value: any) =>
                    onDateSelectBoxChanged("dueBy", value)
                  }
                  defaultValue="All"
                  dropdownClassName="select-custom-dropDown"
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
                  onChange={(value: any) =>
                    onSelectBoxChanged("dependsOn", value)
                  }
                  defaultValue="All"
                  dropdownClassName="select-custom-dropDown"
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
                  onChange={(value: any) =>
                    onSelectBoxChanged("assigned", value)
                  }
                  defaultValue="All"
                  dropdownClassName="select-custom-dropDown"
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

      <DateRangePickerModal
        title="Custom Due"
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        setCustomDateRange={setCustomDateRange}
        onOkClick={onCustomDateFilterChanged}
      />
    </div>
  );
}

export default SubmittalListFilterComponent;
