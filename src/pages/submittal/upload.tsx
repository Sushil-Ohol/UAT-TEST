import { Upload, Button } from "antd";

function UploadFile() {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={3}
      multiple
    >
      <Button>+ Upload </Button>
    </Upload>
  );
}

export default UploadFile;
