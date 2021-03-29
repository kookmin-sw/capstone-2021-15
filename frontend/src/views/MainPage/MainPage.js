// import './MainPage.css';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, {useEffect, useState} from "react";
import Recommand from "../../components/Recommand";
import { Col, Row, Card} from 'antd';
import axios from 'axios'

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
                        setProducts([...Products, ...response.data.productInfo])

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
    // const renderCards = (() => {
        // 반응형 -> 전체 크기 화면 24 / 8 = 3 카드
        // 중간 화면 -> 24 / 12 = 2 카드
        // 작은 화면 -> 24 / 24 =1 카드
        return <Col lg={8} md={12} xs={24} key={index} >
            <Card
                size="small"
                hoverable
                cover={ <img src={product['img-url']} style={{width:'300px'}} />}
            >
                <Meta 
                    title={product.title}
                    description={product.season}
                />
            </Card>
        </Col>
    })
    // })
    return (
        <div className="main">
            <div style = {{width:'75%', margin: '3rem auto'}}>
                <div style={{textAlign: 'center'}}>
                    <h2>메인 페이지</h2>
                </div>
            <Header/>
            <Navigation/>
                {/* {cards} */}
                <Row type="flex" gutter={[16, 16]} >
                    {renderCards}
                </Row>
                <br/>
            
            { PostSize >= Limit && 
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <button onClick={loadMoreHandler}>더보기</button>
                    </div>
                }
            <Footer/>
            </div>
        </div>
    );
}

export default MainPage