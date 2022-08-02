/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* Project Create Page Component */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Space, Tabs, Card, DatePicker, Upload, Button, Checkbox } from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";
import "./submittal-details.css";

const { TabPane } = Tabs;
const { TextArea } = Input;
// const props: UploadProps = {
//     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//     listType: "picture",
//     beforeUpload(file) {
//         return new Promise(resolve => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => {
//                 const img = document.createElement("img");
//                 img.src = reader.result as string;
//                 img.onload = () => {
//                     const canvas = document.createElement("canvas");
//                     canvas.width = img.naturalWidth;
//                     canvas.height = img.naturalHeight;
//                     const ctx = canvas.getContext("2d")!;
//                     ctx.drawImage(img, 0, 0);
//                     ctx.fillStyle = "red";
//                     ctx.textBaseline = "middle";
//                     ctx.font = "33px Arial";
//                     ctx.fillText("Ant Design", 20, 20);
//                     canvas.toBlob(result => resolve(result as any));
//                 };
//             };
//         });
//     },
// };


function SubmitalDetails() {

    return (
        <div className="">
            <div className="">
                <Tabs defaultActiveKey="1" style={{ fontWeight: "600", color: "black" }}>
                    <TabPane tab="Submittal Details" key="1" >
                        <Row className="FilterRow" >
                            <Col span={22} style={{ marginLeft: "25px", justifyContent: "space-around" }}>
                                <Space>
                                    <section>
                                        <span className="HedingColor">STATUS</span>

                                        <Select style={{ width: 200 }} defaultValue="All">
                                            <option value="0">All</option>
                                            <option value="1">Assigned</option>
                                            <option value="2">In Review</option>
                                            <option value="3">Communicated</option>
                                            <option value="4">Resolved</option>
                                            <option value="5">Closed</option>
                                        </Select>
                                    </section>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <section>
                                        <span className="HedingColor">DUE BY</span>

                                        <DatePicker
                                            format="YYYY-MM-DD HH:mm:ss"
                                            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                                        />
                                    </section>

                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <section>
                                        <span className="HedingColor">CONTRACTOR</span>

                                        <Select style={{ width: 200 }} defaultValue="Construction">
                                            <option value="0">ABC Construction</option>
                                            <option value="1">Birla Construction</option>
                                            <option value="2">Acc Construction</option>
                                            <option value="3">Ambuja Construction</option>
                                            <option value="4">Tata Construction</option>
                                            <option value="5">Other Construction</option>
                                        </Select>
                                    </section>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <section>
                                        <span className="HedingColor">ASSIGNED</span>

                                        <Select style={{ width: 200 }} defaultValue="All">
                                            <option value="0">Luck Church</option>
                                            <option value="1">Jone Doe</option>
                                        </Select>
                                    </section>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <section>
                                        <span className="HedingColor">PACAKGE</span>

                                        <Select style={{ width: 200 }} defaultValue="Select packages">
                                            <option value="0">920:Electricals</option>
                                        </Select>
                                    </section>
                                </Space>
                            </Col>
                        </Row>
                        <div className="">
                            {/* <Row gutter={16}>
                                <Col span={24}>
                                    <Card bordered={false}>

                                        <TextArea style={{ color: "#000000 !important", width: "200", maxWidth: "62%", background: "##DCDCDC" }} rows={3} placeholder="" value="Fill the Discription"
                                            maxLength={400} />
                                    </Card>

                                    <Card title="Card title" bordered={false}>
                                        Card content
                                    </Card>

                                </Col>

                                
                            </Row> */}



                            <span style={{ marginLeft: "20px", }} className="HedingColor">DISCRIPTION</span>

                            <Row gutter={24} style={{ marginLeft: "10px", }} >

                                <Col span={18} >
                                    <section >
                                        <div className="">
                                            <TextArea style={{ color: "black", width: "200", maxWidth: "62%", background: "##DCDCDC" }} rows={3} placeholder="Fill the Discription" value=""
                                                maxLength={400} />
                                        </div>
                                    </section>
                                </Col>

                                <Col span={6}>
                                    <Row gutter={24} >
                                        <Col span={16}>
                                            <div className="">
                                                <span className="HedingColor">ATTACHMENTS</span>

                                            </div>
                                        </Col>
                                        <Col span={8} style={{ margin: " -5px" }}>
                                            <div className="block">
                                                <Upload>
                                                    <Button style={{
                                                        border: "none",
                                                        padding: 0,
                                                        background: "none"
                                                    }}><i className="fa fa-plus" aria-hidden="true" /></Button>
                                                </Upload>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div>
                            {/* for 3rd row implementaion */}

                            <Row gutter={24} style={{ marginTop: "20px" }}>

                                <Col span={18}>

                                    <Col span={6}>
                                        <Row gutter={24} style={{ marginLeft: "1px", }}>
                                            <Col span={16}>
                                                <div className="">
                                                    <span className="HedingColor">DEPENDS ON</span>

                                                </div>
                                            </Col>
                                            <Col span={8} style={{ margin: " -5px" }}>
                                                <div className="block">
                                                    <Upload>
                                                        <Button style={{

                                                            border: "none",
                                                            padding: 0,
                                                            background: "none"
                                                        }}><i className="fa fa-plus" aria-hidden="true" /></Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>



                            </Row>
                            <Card style={{ width: "100%", marginTop: "40px" }}>
                                <section>
                                    <ExclamationCircleOutlined style={{ marginTop: "12px" }} />&nbsp;<span style={{ color: "black", fontWeight: "bold", marginTop: "12px", fontSize: "15px" }}>Action items</span>
                                </section>

                                <section>
                                    <Checkbox style={{ fontWeight: "600", fontSize: "13px" }} >You Recevied 2 new discussion</Checkbox><br />
                                    <Checkbox style={{ fontWeight: "600", fontSize: "13px" }} >This Submittal Recived 3 New Submissions</Checkbox><br />
                                    <Checkbox style={{ fontWeight: "600", fontSize: "13px" }} >This Submittal overdue by 20 days</Checkbox><br />

                                </section>
                            </Card>

                        </div>


                    </TabPane>
                    <TabPane tab="Attachments" key="2">
                        Attachments
                    </TabPane>
                    <TabPane tab="Discussion" key="3">
                        Discussion
                    </TabPane>
                    <TabPane tab="Submission" key="4">
                        Submission
                    </TabPane>
                    <TabPane tab="Activity" key="5">
                        Activity
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default SubmitalDetails;

