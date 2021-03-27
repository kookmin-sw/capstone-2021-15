import './MainPage.css';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, {useEffect, useState} from "react";
import Recommand from "../../components/Recommand";
import { withRouter } from 'react-router-dom';
import { Col, Row, Card} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import axios from 'axios'

function MainPage() {
    // 이건 backend에서 가져와야댐
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    // 처음에 3개의 아이템만 가져옴
    const [Limit, setLimit] = useState(3)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body);
    }, [])
    const personalColors = [{'_id':1, 'name':'Cool'},{'_id':2, 'name':'Warm' } ];
    const getProducts = (body) => {
        axios.get('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore){
                        setProducts([...Products, ...response.data.productInfo])

                    } else{
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
            skip: Skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }
    // const renderCards = Products.map((product, index) => {
    const renderCards = (() => {
        // 반응형 -> 전체 크기 화면 24 / 8 = 3 카드
        // 중간 화면 -> 24 / 12 = 2 카드
        // 작은 화면 -> 24 / 24 =1 카드
        return <Col lg={8} md={12} xs={24} >
        
            <Card
                cover={<ImageSlider/>}
                // cover={<ImageSlider images={product.images}/>}
            >
                {/* <Meta 
                    title={product.title}
                    description={`${product.personal_color}`}
                    /> */}
            </Card>
        </Col>
    })
    // })
    return (
        <div className="main">
            <Header/>
            <Navigation/>
            <div className="main-container">
                {/* {cards} */}
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
                <br/>

            </div>
            <Footer/>
        </div>
    );
}

export default withRouter(MainPage)