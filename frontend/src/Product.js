import React , { useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import CardComponent from "./components/CardComponent";
import Footer from "./components/Footer";
import './Product.css';
import product_img from "./product_img.jpg";
import likeBtn_img from "./likeBtn_img.png";



const Product = ( props ) => {


    const sampleData = [{
        "brand" : "컬러하울",
        "name" : "루즈핏 무지 여자 반팔 티셔츠",
        "product_img" : product_img,
        "product_color" : "#791B2D",
        "product_color_name" : "누아르 루즈",
        "personal_color" : "",
        "personal_color_name_ko" : "겨울 쿨 딥",
        "personal_color_name_en" : "Winter Cool Deep",
        "price" : "31000",
        "like" : "28",
        "rank" : "5",
    },];

    var data = sampleData[0];

    return (
        <>
        <Header></Header>
        <Navigation></Navigation>
        <Container>
            <div className="product_inner">
                <div className="product_title">
                    <img className="product_img" src={data.product_img}></img>
                    <div className="product_name">
                        <div>[ {data.brand} ] {data.name}</div>
                    </div>
                </div>
                <div className="product_personal_color">{data.personal_color_name_ko}<br/>
                ( {data.personal_color_name_en} )</div>
                <div style={{backgroundColor:"#2F2F2F"}}>
                    <div className="product_info">
                            <div className="product_like">
                                <span>찜하기</span>
                                <Button>
                                    <img className="likebtn_img" src={likeBtn_img}/>
                                </Button>
                                <span>{data.like}</span>
                            </div>
                            <div className="liveRanking"># 실시간 순위 {data.rank}위</div>
                            <Row className="product_detail">
                                <Col className="left">
                                    <div style={{fontSize: "35px", marginBottom: "15px"}}>색상</div>
                                    <div style={{height:"150px", width: "150px", backgroundColor:"#791B2D", marginBottom: "10px"}}></div>
                                    <div style={{fontSize: "20px"}}>{data.product_color_name}</div>
                                </Col>
                                <Col className="right">
                                    <div style={{fontSize: "35px", marginBottom: "15px"}}>가격</div>
                                    <div style={{fontSize: "20px"}}>{data.price}원</div>
                                    <Button>구매하러 가기 &gt;</Button>
                                </Col>
                            </Row>
                    </div>
                    <div className="other_contents">
                        추천 컨텐츠
                        <hr style={{border: "solid 1px white", marginRight: "45px"}}></hr>
                        <Row style={{marginLeft: "80px", marginRight: "100px", justifyContent: "space-between", paddingBottom: "50px"}}>
                            <CardComponent/>
                            <CardComponent/>
                            <CardComponent/>
                        </Row>
                        
                    </div>
                </div>
            </div>
        </Container>
        <Footer/>
        </>
    )
};

export default Product;