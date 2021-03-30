import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Recommand from "../../components/Recommand";
import { Col, Row, Card, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import axios from 'axios'
import './MainPage.css';

const { Meta } = Card;


function MainPage() {
    // 이건 backend에서 가져와야댐
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    // 처음에 3개의 아이템만 가져옴
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        let mounted = true;
        let body = {
            skip: Skip,
            limit: Limit
        }
        if (mounted) {
            getProducts(body);
        }
        
        return () => mounted = false;
    }, [])
    // const personalColors = [{'_id':1, 'name':'Cool'},{'_id':2, 'name':'Warm' } ];
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore){
                        setProducts([...response.data.productInfo])

                    } else{
                        console.log(response.data.productInfo)
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                    // console.log(response.data.productInfo)
                    // setProducts(response.data.productInfo)
                } else {
                    alert('상품을 가져오는데 실패했습니다')
                }
            })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index) => {
        // 반응형 -> 전체 크기 화면 24 / 8 = 3 카드
        // 중간 화면 -> 24 / 12 = 2 카드
        // 작은 화면 -> 24 / 24 =1 카드
        return <Col lg={6} md={12} xs={24} key={index} >
            <Link to={`/product/${product['data-code']}`}>
                <Card
                    size="small"
                    hoverable
                    cover={ <img src={product['img-url']} />}
                >
                    <Meta 
                        title={product.title}
                        description={product.season+" "+product.tone}
                    />
                </Card>
            </Link>
        </Col>
    })

    return (
        <>
        <Header/>
        <Navigation/>
        <div className="main_inner">
            <div className="main_top">
                <div className="profile">
                    <div style={{fontSize:"24px"}}>
                        <span style={{color:"#F0D1D1"}}>(닉네임)</span>
                        <span>님을 위한 맞춤 추천</span>
                    </div>
                    <div style={{fontSize:"16px"}}>#personal_color</div>
                </div>
            </div>
            <div className="main_bottom">
                <div className="interest_category">
                    <Row>
                        <Col lg={12} md={12} xs={12}>
                            (카테고리 이름)
                            <Button className="reloadBtn" type="circle" ghost="true" onClick={loadMoreHandler}>
                                <ReloadOutlined />
                            </Button>
                        </Col>
                        <Col lg={12} md={12} xs={12} style={{textAlign: "right"}}> 
                            <Button className="moreBtn" type="link">더 보기</Button>
                        </Col>
                        
                    </Row>
                    <Row type="flex" gutter={[30, 30]} >
                        {renderCards}
                    </Row>
                
                {/* { PostSize >= Limit && 
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <button onClick={loadMoreHandler}>더보기</button>
                        </div>
                    } */}
                
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
    );
}

export default MainPage