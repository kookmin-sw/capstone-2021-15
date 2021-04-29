import React , { useState } from 'react';
import {  } from 'react-bootstrap';
import { Row, Col, Card, Button } from 'antd';
import './Question.css';
//import img1 from '../orange.png'

const Question = props =>  {
    const [value, setValue] = useState('');
    // const [a, setA] = useState('gray');
    // const [b, setB] = useState('gray');
    // const [c, setC] = useState('gray');
    // const [d, setD] = useState('gray');
    // const [e, setE] = useState('gray');
    // const [f, setF] = useState('gray');
    // const [g, setG] = useState('gray');
    
    //const img1 = `../${props.img1}`;
    const img1 = props.img1;
    const img2 = props.img2;

    const radioHandler = e => {
        setValue(e.target.id);
    };

    return (
        <>
        <Card title={props.title} bodyStyle={{backgroundColor:"white"}} style={{textAlign:"center",marginBottom:"30px"}}>
            {/* <Row style={{display:"inline-block", alignItems: "center"}}>
                <Col span={12}><img src={img1} style={{height:"300px", marginRight:"30px"}}/></Col>
                <Col span={12}><img src={img2} style={{height:"300px"}}/></Col>
            </Row>
            <Row type="flex" style={{alignItems: "center", justifyContent:"center", marginTop:"30px"}}>
                <Button onClick={radioHandler} value="a" type={a} shape="circle" size="large"></Button>
                <Button onClick={radioHandler} value="b" type={b} shape="circle"></Button>
                <Button onClick={radioHandler} value="c" type={c} shape="circle" size="small"></Button>
                <Button onClick={radioHandler} value="d" type={d} shape="circle"></Button>
                <Button onClick={radioHandler} value="e" type={e} shape="circle"size="large"></Button>
            </Row> */}
            <Row type="flex" style={{alignItems: "center"}}>
                <Col span={8}><img src={img1} style={{height:"200px", marginRight:"30px"}}/></Col>
                <Col span={8} style={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
                    <button className={`btn-circle btn-xl ${value === 'a'? 'active':''}`} onClick={radioHandler} id="a" />
                    <button className={`btn-circle btn-lg ${value === 'b'? 'active':''}`} onClick={radioHandler} id="b" />
                    <button className={`btn-circle btn-md ${value === 'c'? 'active':''}`} onClick={radioHandler} id="c" />
                    <button className={`btn-circle btn-sm ${value === 'd'? 'active':''}`} onClick={radioHandler} id="d" />
                    <button className={`btn-circle btn-md ${value === 'e'? 'active':''}`} onClick={radioHandler} id="e" />
                    <button className={`btn-circle btn-lg ${value === 'f'? 'active':''}`} onClick={radioHandler} id="f" />
                    <button className={`btn-circle btn-xl ${value === 'g'? 'active':''}`} onClick={radioHandler} id="g" />
                </Col>
                <Col span={8}><img src={img2} style={{height:"200px"}}/></Col>
            </Row>
        </Card>
        </>
    )

}

export default Question;