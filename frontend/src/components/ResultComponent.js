import React from "react";
import './ResultComponent.css';
import ProgressBar from "react-bootstrap/ProgressBar";
import {Statistic, Row, Col,Descriptions ,Card} from "antd";


function ResultComponent(props) {
    return (
        <div className="resultContainer" style={{height:"600px"}}>
            <div className="resultContents">
                <div className="progressContainer">
                    <p>75%</p>
                    <ProgressBar style={{width:"880px" }}>
                        <ProgressBar  variant="warning" now={75} />
                        <ProgressBar  now={25}  />
                    </ProgressBar>
                    <p>25%</p>
                </div>

                <Card title="" bordered={false} style={{ width: "880px",paddingTop:"30px" }}>
                    <h5>User님의 진단 결과</h5>
                    <Row gutter={16} style={{paddingTop:"15px"}}>
                        <Col span={12}>
                            <Statistic title="봄 웜" value={75} suffix="%" />
                        </Col>
                        <Col span={12}>
                            <Statistic title="겨울 쿨" value={25} suffix="%"/>
                        </Col>
                    </Row>
                    <div style={{padding:"30px 30px 0 30px"}}>
                    <Descriptions column={1} size="middle" >
                        <Descriptions.Item label="퍼스널컬러">PersonalColor</Descriptions.Item>
                        <Descriptions.Item label="">[Type]</Descriptions.Item>
                        <Descriptions.Item label="피해야할 톤">Worst</Descriptions.Item>
                    </Descriptions>
                    </div>
                </Card>
            </div>
        </div>

    )
}

export default ResultComponent;