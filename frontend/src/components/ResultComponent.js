import React from "react";
import './ResultComponent.css';
import ProgressBar from "react-bootstrap/ProgressBar";
import {Statistic, Row, Col, Descriptions, Card} from "antd";


function ResultComponent(props) {
    const weather = {
        "spring": "봄 웜",
        "summer": "여름 쿨",
        "fall": "가을 웜",
        "winter": "겨울 쿨"
    }

    const key = Object.keys(props.prob)
    return (
        <div className="resultContainer" style={{height: "600px"}}>
            <div className="resultContents">
                <div className="progressContainer">
                    <p>{props.prob[key[0]]}%</p>
                    <ProgressBar style={{width: "880px"}}>
                        <ProgressBar variant="warning" now={props.prob[key[0]]}/>
                        <ProgressBar now={props.prob[key[1]]}/>
                    </ProgressBar>
                    <p>{props.prob[key[1]]}%</p>
                </div>

                <Card title="" bordered={false} style={{width: "880px", paddingTop: "30px"}}>
                    <h5>{props.userInfo.nickName}님의 진단 결과</h5>
                    <Row gutter={16} style={{paddingTop: "15px"}}>
                        <Col span={12}>
                            <Statistic title={weather[key[0]]} value={props.prob[key[0]]} suffix="%"/>
                        </Col>
                        <Col span={12}>
                            <Statistic title={weather[key[1]]} value={props.prob[key[1]]} suffix="%"/>
                        </Col>
                    </Row>
                    <div style={{padding: "30px 30px 0 30px"}}>
                        <Descriptions column={1} size="middle">
                            <Descriptions.Item label="퍼스널컬러">{weather[key[0]]}</Descriptions.Item>
                            <Descriptions.Item label="">[{props.type}]</Descriptions.Item>
                            <Descriptions.Item label="피해야할 톤">{props.worst}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ResultComponent;