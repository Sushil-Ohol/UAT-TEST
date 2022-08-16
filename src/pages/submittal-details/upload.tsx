import { Upload, Button } from "antd";

function UploadFile() {
  return (
    <Upload>
      <Button className="subDetailsAttachements">
        <i className="fa fa-plus subDetailsAttachIcon" aria-hidden="true" />
      </Button>
    </Upload>
  );
}

export default UploadFile;
