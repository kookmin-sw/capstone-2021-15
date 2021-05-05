import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import CardComponent from "../../components/CardComponent";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Recommand from "../../components/Recommand";
import { Col, Row, Card, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import axios from 'axios'
import './MainPage.css';

const { Meta } = Card;


function MainPage(props) {
    // 이건 backend에서 가져와야댐
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    // 처음에 3개의 아이템만 가져옴
    const [Limit, setLimit] = useState(3)
    const [PostSize, setPostSize] = useState(0)
    
    const [PersonalColor, setPersonalColor] = useState('spring')
    const [InterestCategory, setInterestCategory ] = useState(['lip', 'hair'])
    const [userPrice, setUserPrice] = useState([20000, 35000]);
    // console.log('ㅠㅠ', props)

    const [IsMount, setIsMount] = useState(true)
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
            // console.log('props', props.user.userData)
            // let user_season = props.user.userData.season ? props.user.userData.season : ''
            // setPersonalColor(user_season)
            // console.log('Personal-COLOR: ', user_season)
            getProducts(body)
        }
        // return () => mounted = false;
    }, [props.user, PersonalColor]) // personalColor없으면 setPersonalColor에 적용 xx
    // const person

    const getProducts = ( body) => {
        axios.post(`/api/product/season/${PersonalColor}`, body)
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

    const categoryHandler = InterestCategory.map((category, index) => {
        let categoryName = category.toUpperCase();
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
                                            brand={product.brand} 
                                            name={product.name} 
                                            title={product.title}
                                            pccs={product.pccs} 
                                            season={product.season} 
                                            img-url={product['img-url']} 
                                            data-code={product['data-code']}
                                            price={product.price}>    
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

export default MainPage