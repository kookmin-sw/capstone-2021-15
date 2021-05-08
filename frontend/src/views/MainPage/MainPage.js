import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import CardComponent from "../../components/CardComponent";
import Carousel from 'react-bootstrap/Carousel'
import { Col, Row, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import './MainPage.css';
import m1 from '../../m1.jpg'
import m2 from '../../m2.png'
import k1 from '../../k1.png'


function MainPage(props) {
    // 이건 backend에서 가져와야댐
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    // 처음에 3개의 아이템만 가져옴
    const [Limit, setLimit] = useState(3)
    const [PostSize, setPostSize] = useState(0)
    const [PersonalColor, setPersonalColor] = useState('')
    const [InterestCategory, setInterestCategory ] = useState([])
    const [userPrice, setUserPrice] = useState([9000, 100000]);
    const [UserInfo, setUserInfo] = useState({})
    const [IsMount, setIsMount] = useState(true)

    // console.log('props', props)
    useEffect(() => {
        // 처음 렌더링 시 props에 user데이터가 없음
        // 처음 렌더링은 제외 
        if (IsMount) {
            setIsMount(false)
        } else {
            let body = {
            skip: Skip,
            limit: Limit
            }
            setPersonalColor(props.user.userData.season)
            setInterestCategory(props.user.userData.interestCategory)
            // state인 PersonalColor로 인자로 주면 안됨
            // -> 아마 비동기로 동작해서 순서대로 state에 저장이 안됨
            // 걍 initial state인 ''임 
            // 만약 PersonalColor로 인자로 주면 그 다음에 set State된 PersonalColor 반영됨
            getProducts(body, props.user.userData.season)

        }
    }, [props])

    // impresssion 쌓으려면 주석을 푸세용
    // useEffect(()=> {
    //      function asyncUpdateImpression(products)  {
    //          products.map((product) => updateImpression(product));
    //     }
    //     asyncUpdateImpression(Products)
    // }, [Products])
    //
    const updateImpression = (product) => {
        // console.log(body)
        axios.post(`/api/product/impression/product_by_id?id=${product._id}`)
            .then(response => {
                if(response.data.impressionSuccess) {
                    // console.log(response)
                }
            })
    }

    const getProducts = ( body, personalColor) => {
        axios.post(`/api/product/season/${personalColor}`, body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore){
                        setProducts([...response.data.productInfo])

                    } else{
                        console.log(response.data.productInfo)
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('상품을 가져오는데 실패했습니다')
                }
            })
    }

    const reloadHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }
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
    // const getProducts = ( body, personalColor) => {
    //     axios.post(`/api/product/season/${personalColor}`, body)
    //         .then(response => {
    //             if(response.data.success) {
    //                 if(body.loadMore){
    //                     setProducts([...response.data.productInfo])
    //
    //                 } else{
    //                     console.log(response.data.productInfo)
    //                     setProducts(response.data.productInfo)
    //                 }
    //                 setPostSize(response.data.postSize)
    //             } else {
    //                 alert('상품을 가져오는데 실패했습니다')
    //             }
    //         })
    // }

    const categoryHandler = InterestCategory.map((category, index) => {
        // let categoryName = category.toUpperCase();
        let categoryName = 'LIP'
        return (
            <Row key={index}>
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {categoryName}
                        <Button className="reloadBtn" type="circle" ghost="true" onClick={reloadHandler}>
                            <ReloadOutlined />
                        </Button>
                    </Col>
                    <Col lg={12} md={12} xs={12} style={{textAlign: "right"}}> 
                        <Link to={`/category/${category}`}>
                            <Button className="moreBtn" type="link">더 보기</Button>
                        </Link>
                    </Col>
                </Row>
                <Row type="flex" gutter={[30, 30]} >
                    {
                        Products ? Products.map((product, index) => {
                            // 반응형 -> 전체 크기 화면 24 / 8 = 3 카드
                            // 중간 화면 -> 24 / 12 = 2 카드
                            // 작은 화면 -> 24 / 24 =1 카드
                            if (product.category2 === category &&
                                product.price >= userPrice[0] && 
                                product.price <= userPrice[1]) {
                                return (
                                    <Col lg={8} md={12} xs={24} key={index} >
                                        <CardComponent
                                            user = {props.user.userData}
                                            product={product}>
                                        </CardComponent>
                                    </Col>
                                )
                            }
                        }) : ''
                    }
                </Row>
            </Row>
        )
    })
    return (
        <>
        <Header/>
        <Navigation/>
        <div className="main_inner">
            <div className="main_top">
                <div className="slider">
                    <Carousel prevLabel="" nextLabel="">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={k1}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{color:"white"}}>여기에 뭔가 들어갈거임!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={m1}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{color:"white"}}>여기에 뭔가 들어갈거임!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={m2}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>여기에 뭔가 들어갈거임!</h3>

                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
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
                    {categoryHandler}
                {/* { PostSize >= Limit && 
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <button onClick={reloadHandler}>더보기</button>
                        </div>
                    } */}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default MainPage;