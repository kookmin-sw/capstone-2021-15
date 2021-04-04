import React , { useState } from 'react';
import {  } from 'react-bootstrap';
import { Row, Col, Card, Button } from 'antd';
import './Question.css';

const Question = (props) =>  {
    const [value, setValue] = useState('a');
    const [a, setA] = useState('default');
    const [b, setB] = useState('default');
    const [c, setC] = useState('default');
    const [d, setD] = useState('default');
    const [e, setE] = useState('default');

    const radioHandler = e => {

        //oldValue의 테두리 하이라이트 제거
        if (value == "a") setA('default');
        else if (value == "b") setB('default');
        else if (value == "c") setC('default');
        else if (value == "d") setD('default');
        else if (value == "e") setE('default');

        //newValue <- oldValue
        setValue(e.target.value);

        //newValue의 테두리 하이라이트
        if (e.target.value == "a") setA('primary');
        else if (e.target.value == "b") setB('primary');
        else if (e.target.value == "c") setC('primary');
        else if (e.target.value == "d") setD('primary');
        else if (e.target.value == "e") setE('primary');
    };

    return (
        <>
        <Card title={props.title} bodyStyle={{backgroundColor:"white"}} style={{marginBottom:"30px"}}>
            <Row type="flex" style={{alignItems: "center"}}>
                <Col span={8}>{props.text1}</Col>
                <Col span={8} style={{display:"flex", alignItems:"center"}}>
                    <Button onClick={radioHandler} value="a" type={a} shape="circle" size="large"></Button>
                    <Button onClick={radioHandler} value="b" type={b} shape="circle"></Button>
                    <Button onClick={radioHandler} value="c" type={c} shape="circle" size="small"></Button>
                    <Button onClick={radioHandler} value="d" type={d} shape="circle"></Button>
                    <Button onClick={radioHandler} value="e" type={e} shape="circle"size="large"></Button>
                </Col>
                <Col span={8}>{props.text2}</Col>
            </Row>
        </Card>
        </>
    )

}

export default Question;