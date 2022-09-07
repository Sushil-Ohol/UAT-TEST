import { Card } from "antd";
import { ITooltipParams } from "ag-grid-community";
import "./submittal-tooltip.css";

function SubmittalTooltip(props: ITooltipParams) {
  const { rowIndex, api } = props;
  const data = api.getDisplayedRowAtIndex(rowIndex!)?.data || {};

  return (
    <>
      <span />
      {Object.keys(data).length > 0 && (
        <Card className="depends-tooltip">
          <div>
            <span>
              <section className="submittalId">
                <span className="submittalName">{data.submittal}</span>
              </section>
              <section>
                <span className="submittalStatus">{data.description}</span>
              </section>
            </span>
          </div>
        </Card>
      )}
    </>
  );
}

export default SubmittalTooltip;
