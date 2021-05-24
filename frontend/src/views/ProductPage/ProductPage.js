import React , { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import './ProductPage.css';
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const ProductPage = (props) => {
    const productId = props.match.params.id;
    const sampleData = [{
        "like" : "28",
        "rank" : "5",
    },];
    // console.log('product-page', props)
    const [ product, setProduct ] = useState({})
    // const { id } = match.params;
    
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
    useEffect(()=>{
        axios.post(`/api/product/product_by_datacode?datacode=${productId}`)
            .then(response => {
                // console.log(response.data.productInfo[0])
                setProduct(response.data.productInfo[0])
            }).catch(err => console.log(err))
    }, [])
    // console.log(match)
    // console.log(id);
    // useEffect(() => {
    //     axios.post(`/api/product/${product['data-code']}`)
    //         .then(response => {
    //             if(response.data.success) {
    //                 console.log(response.data.productInfo)
    //                 response.data.productInfo.map((product, index) => {
    //                     if (product['data-code'] == id) {
    //                         setProduct(response.data.productInfo[index])
    //                         console.log(response.data.productInfo[index])
    //                     }
    //                 })
    //             } else {
    //                 alert('상품을 가져오는데 실패했습니다')
    //             }
    //         })
    // }, [])

    var data = sampleData[0];
    const onClickToSaveBuyProduct = (product, user) => {
        let body = {
            product_data_code: product['data-code'],
            product_id: product._id,
            user_id: user._id,
            user_season: user.season,
            product_season: product.season
        }
        // console.log(body)
        axios.post('/api/buy-product/buy-log', body)
            .then(response => {
                if(response.data.clickLogSuccess) {
                    // console.log(response)
                }
            })
    }
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
                        <div className="product_bottom">
                            <div className="product_info">
                                <div className="product_personal_color">
                                    {product.season} <br/> {pccs[product.pccs]}</div>
                                <div className="product_like">

                                </div>

                                <Row className="product_detail">
                                    <Col className="left" lg={12} md={12} xs={12}>
                                        <div style={{fontSize: "30px", marginBottom: "15px"}}>색상</div>
                                        <img src={
                                            product['color-url']} style={{height:"150px", width: "150px", marginBottom: "10px"}}/>
                                    </Col>
                                    <Col className="right" lg={12} md={12} xs={12}>
                                        <div style={{fontSize: "30px", marginBottom: "15px"}}>가격</div>
                                        <div style={{fontSize: "24px"}}>{product.price}원</div>
                                        <Button
                                            className="buyBtn"
                                            type="link"
                                            onClick={() => {
                                                    window.open(product.site, '_blank');
                                                    onClickToSaveBuyProduct(product, props.user.userData)
                                                }}>
                                            구매하러 가기 &gt;
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="other_contents">

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

export default withRouter(ProductPage);
