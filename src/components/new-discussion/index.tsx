import { Form, Input, Modal } from "antd";
import { voidStartingSpaceInput } from "utils/inpututils";

function DiscussionPopup({
  isGeneric,
  isVisible,
  selectedData,
  onAdd,
  onCancel,
  modelHeaderTitle,
  onAddText,
  modelContent
}: any) {
  const [form] = Form.useForm<{ topicName: string }>();
  form.resetFields();
  const onHandleClick = () => {
    form.validateFields().then((value) => {
      onAdd(value.topicName || selectedData[0].submittal);
      form.resetFields();
    });
  };
  return (
    <Modal
      className={
        isGeneric ? "add-new-discussion" : "add-new-discussion align-footer-btn"
      }
      title={modelHeaderTitle}
      centered
      visible={isVisible}
      onOk={onHandleClick}
      onCancel={onCancel}
      okText={onAddText}
    >
      {isGeneric ? (
        <>
          <div className="selected-topic-name">
            Discussion Name:
            <div className="topic-title">
              {selectedData[0].id}: {selectedData[0].submittal}
            </div>
          </div>
          <p className="pop-content">{modelContent}</p>
        </>
      ) : (
        <>
          <div className="topic-name">Topic name </div>
          <Form layout="vertical" name="control-hooks" preserve form={form}>
            <Form.Item
              name="topicName"
              className="add-new-column-label"
              rules={[
                {
                  required: true,
                  message: "Please enter a topic name!"
                }
              ]}
            >
              <Input onInput={voidStartingSpaceInput} />
            </Form.Item>
          </Form>
          <p className="pop-content">{modelContent}</p>
        </>
      )}
    </Modal>
  );
}

export default DiscussionPopup;
