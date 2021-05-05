import React , { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import CardComponent from "../../components/CardComponent";
import Footer from "../../components/Footer";
import './ProductPage.css';
import axios from 'axios'



const ProductPage = ({match}) => {

    const sampleData = [{
        "like" : "28",
        "rank" : "5",
    },];

    const [ product, setProduct ] = useState([])
    const { id } = match.params;

    const pccs = {
        'p': 'pale',
        'lt': 'light',
        'b' : 'bright',
        'v' : 'vivid',
        'ltg' :  'light grayish',
        'sf' : 'soft',
        'g' : 'grayish',
        'd' : 'dull',
        's' : 'strong',
        'dp' : 'deep',
        'dkg' : 'dark grayish',
        'dk' : 'dark'
    }

    console.log(id);
    useEffect(() => {
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.productInfo)
                    response.data.productInfo.map((product, index) => {
                        if (product['data-code'] == id) {
                            setProduct(response.data.productInfo[index])
                            console.log(response.data.productInfo[index])
                        }
                    })
                } else {
                    alert('상품을 가져오는데 실패했습니다')
                }
            })
    }, [])

    var data = sampleData[0];

    return (
        <>
        <Header></Header>
        <Navigation></Navigation>
        <div>
            {
                product ? (
                    <div className="product_inner">
                        <div className="product_top">
                            <div className="product_title">
                                <img className="product_img" src={product['img-url']}></img>
                                <div className="product_name">
                                    <div>[ {product.brand} ] {product.name} {product.title}</div>
                                </div>
                            </div>
                        </div>
                        <div className="product_bottom" style={{backgroundColor: "#2F2F2F"}}>
                            <div className="product_info">
                                <div className="product_personal_color">
                                    {product.season} {pccs[product.pccs]}</div>
                                <div className="product_like">
                                    <span>찜하기</span>
                                    <Button className="likeBtn" type="circle" ghost="true">
                                        <HeartOutlined />
                                    </Button>
                                    <span>{data.like}</span>
                                </div>
                                <div className="liveRanking"># 실시간 순위 {data.rank}위</div>
                                <Row className="product_detail">
                                    <Col className="left" lg={12} md={12} xs={12}>
                                        <div style={{fontSize: "30px", marginBottom: "15px"}}>색상</div>
                                        <img src={product['color-url']} style={{height:"150px", width: "150px", marginBottom: "10px"}}></img>
                                    </Col>
                                    <Col className="right" lg={12} md={12} xs={12}>
                                        <div style={{fontSize: "30px", marginBottom: "15px"}}>가격</div>
                                        <div style={{fontSize: "24px"}}>{product.price}원</div>
                                        <Button className="buyBtn" type="link" onClick={() => window.open(product.site, '_blank')}>구매하러 가기 &gt;</Button>
                                    </Col>
                                </Row>
                                <div className="other_contents">
                                    추천 컨텐츠
                                    <hr style={{border: "solid 1px white", marginLeft: "-30px"}}></hr>                                
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''
            }
        </div>
        <Footer/>
        </>
    )
};

export default ProductPage;