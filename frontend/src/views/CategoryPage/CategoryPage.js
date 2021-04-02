import CardComponent from "../../components/CardComponent";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import {  Toast } from 'react-bootstrap';
import { Row, Col, Radio, Card, Button } from 'antd';
import axios from 'axios'
import './CategoryPage.css'
// import Carousel from "./components/CardCarousel";

function CategoryPage({match}) {

    const [Products, setProducts] = useState([])
    const [Limit, setLimit] = useState(20)
    const [filter, setFilter] = useState(false);

    const { Meta } = Card;

    // const [category, setCategory] = useState('lip');
    // const categoryHandler = e => {
    //     console.log('click: ', e);
    //     setCategory(e.key);
    // }

    const togglefilter = () => setFilter(!filter);

    const seasons =[
        'spring',
        'summer',
        'fall',
        'winter'
    ];

    const changetoneHandler = e => {
        console.log('changed tone', e.target.value)
        setPersonalColor(e.target.value);
    }

    // const { category } = match.params;
    const category = 'makeup';
    const [personalColor, setPersonalColor] = useState('spring')

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
                        <Button onClick={togglefilter}>
                            Personal Color
                        </Button>
                        <Toast onClose={togglefilter} show={filter} style={{marginTop: "15px"}}>
                            <Radio.Group options={seasons} onChange={changetoneHandler} value={personalColor} />
                        </Toast>
                    </Card>
                    <Row type="flex" gutter={[30, 30]}>
                    {
                        Products ? Products.map((product, index) => {
                            if (product.category1 == category && product.season == personalColor) {
                                return (
                                    <Col lg={6} md={12} xs={24} >
                                        <CardComponent title={product.title} season={product.season} tone={product.tone} img-url={product['img-url']} data-code={product['data-code']}></CardComponent>
                                    </Col>
                                )
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