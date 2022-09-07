import { Card } from "antd";
import { ITooltipParams } from "ag-grid-community";
import "./depends-on-tooltip.css";

function DependsOnTooltip(props: ITooltipParams) {
  const { value, api } = props;
  const data = api.getRowNode(value!)?.data || {};

  return (
    <>
      <span />
      {Object.keys(data).length > 0 && (
        <Card className="depends-tooltip">
          <div>
            <p>
              <span>
                <section className="submittalId">
                  {data.id}{" "}
                  <span className="submittalName">{data.submittal}</span>
                </section>
                <section>
                  <span className="submittalStatus">{data.status}</span>

                  <span className="dueBy"> Due by {data.dueBy}</span>
                </section>
              </span>
            </p>
          </div>
        </Card>
      )}
    </>
  );
}

export default DependsOnTooltip;
