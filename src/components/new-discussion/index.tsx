import { Form, Input, Modal } from "antd";
import { voidStartingSpaceInput } from "utils/inpututils";

export type NewDiscussionProps = {
  isGeneric: boolean;
  show: boolean;
  title: string;
  modelContent: string;
  addBtnText: string;
  addBtnClick: any;
  onCancel: any;
  selectedData: any;
};

function NewDiscussionPopup({
  isGeneric,
  show,
  selectedData,
  addBtnClick,
  onCancel,
  title,
  addBtnText,
  modelContent
}: NewDiscussionProps) {
  const [form] = Form.useForm<{ topicName: string }>();
  form.resetFields();

  const onHandleClick = () => {
    form.validateFields().then((value) => {
      addBtnClick(value.topicName || selectedData[0].submittal);
      form.resetFields();
    });
  };
  return (
    <Modal
      className={
        isGeneric ? "add-new-discussion" : "add-new-discussion align-footer-btn"
      }
      title={title}
      centered
      visible={show}
      onOk={onHandleClick}
      onCancel={onCancel}
      okText={addBtnText}
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

export default NewDiscussionPopup;
