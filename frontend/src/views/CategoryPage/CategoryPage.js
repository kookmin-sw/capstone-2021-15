import CardComponent from "../../components/CardComponent";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { Toast } from 'react-bootstrap';
import { Row, Col, Card, Button, Radio, Checkbox, Slider } from 'antd';
import axios from 'axios'
import './CategoryPage.css'
// import Carousel from "./components/CardCarousel";

function CategoryPage({match}) {

    const [Products, setProducts] = useState([])
    const [Limit, setLimit] = useState(20)
    const [filterPC, setFilterPC] = useState(false);
    const [filterPrice, setFilterPrice] = useState(false);

    const { category2 } = match.params;

    const togglePC = () => {setFilterPC(!filterPC); setFilterPrice(false);}
    const togglePrice = () => {setFilterPrice(!filterPrice); setFilterPC(false);}

    const seasons =[
        'spring',
        'summer',
        'fall',
        'winter'
    ];

    // 최고가 5만원으로 설정
    // 실제 가격은 *500
    const marks = {
        0: '0',
        20: '1만원',
        40: '2만원',
        60: '3만원',
        80: '4만원',
        100:'5만원'
    }

    const changePCHandler = e => {
        setPersonalColor(e.target.value);
    }

    const changePriceHandler = (value) => {
        setPrice(value);
    }

    const changeUserPriceHandler = () => {
        setUserPrice(price);
    }

    const [personalColor, setPersonalColor] = useState('spring')
    const [price, setPrice] = useState([10, 30]); // slider에서 실시간으로 바뀌는 가격대
    const [userPrice, setUserPrice] = useState([30, 60]); // user data로 받아올 선호 가격대가 15000~30000 이라면 500으로 나눈 값

    // const [currentPage, SetCurrentPage] = useState(1)
    // const [productPerPage, setProductPerPage] = useState(20)

    // const indexOfLastProduct = currentPage * productPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productPerPage;

    // const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

    // const paginate = (pageNumber: number) => SetCurrentPage(pageNumber);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getProducts();
        }
        
        return () => mounted = false;
    }, [])

    const getProducts = () => {
        // axios.post(`/api/product/category2/${category2}`)
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.productInfo)
                    setProducts(response.data.productInfo)
                } else {
                    alert('상품을 가져오는데 실패했습니다')
                }
            })
    }

    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <div className="main-container">
                <Row className="category_inner" >
                    <Card className="filter" title="Filter">
                        <Button onClick={togglePC}>
                            Personal Color
                        </Button>
                        <Button onClick={togglePrice}>
                            Price
                        </Button>
                        <Toast onClose={togglePC} show={filterPC}>
                            <Radio.Group options={seasons} onChange={changePCHandler} value={personalColor} />
                        </Toast>
                        <Toast onClose={togglePrice} show={filterPrice} style={{textAlign: "center"}}>
                            <Slider range marks={marks} defaultValue={userPrice} onChange={changePriceHandler}/>
                            <Button onClick={changeUserPriceHandler}>적용</Button>
                        </Toast>
                    </Card>
                    <Row type="flex" gutter={[30, 30]}>
                    {
                        Products ? Products.map((product, index) => {
                            if (product.season == personalColor) {
                                if (product.price >= userPrice[0]*500 && product.price <= userPrice[1]*500) {
                                    return (
                                        <Col lg={6} md={12} xs={24} >
                                            <CardComponent brand={product.brand} name={product.name} title={product.title} pccs={product.pccs} season={product.season} img-url={product['img-url']} data-code={product['data-code']} price={product.price}></CardComponent>
                                        </Col>
                                    )
                                }
                                
                            
                            }
                        }) : ''
                    }
                    </Row>
                </Row>
            </div>
            <Footer/>
        </div>
    );
}

export default CategoryPage;