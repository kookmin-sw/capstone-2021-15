import CardComponent from "../../components/CardComponent";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import axios from 'axios'
import './CategoryPage.css'
// import Carousel from "./components/CardCarousel";

function CategoryPage() {
    const cardMargin = {
        marginBottom: "60px"
    }

    const [Products, setProducts] = useState([])
    const [Limit, setLimit] = useState(20)
    // const [currentPage, SetCurrentPage] = useState(1)
    // const [productPerPage, setProductPerPage] = useState(20)

    // const indexOfLastProduct = currentPage * productPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productPerPage;

    // const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

    // const paginate = (pageNumber: number) => SetCurrentPage(pageNumber);

    useEffect(() => {
        let mounted = true;
        let body = {
            limit: Limit
        }

        if (mounted) {
            getProducts(body);
        }
        
        return () => mounted = false;
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
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
                    <Row type="flex" gutter={[30, 30]}>
                    {
                        Products ? Products.map((product, index) => {
                            return (
                                <Col lg={6} md={12} xs={24} >
                                    <CardComponent title={product.title} season={product.season} tone={product.tone} img-url={product['img-url']} data-code={product['data-code']}></CardComponent>
                                </Col>
                            )
                        }) : ''
                    }
                        
                    {/* <CardComponent name="제품명" color="퍼스널컬러 톤" categories="카테고리" brand="브랜드"
                                style={cardMargin}></CardComponent>
                    <CardComponent PName="제품명" PColor="퍼스널컬러 톤" Categories="카테고리" Brand="브랜드"
                                style={cardMargin}></CardComponent> */}
                    {/* <Carousel></Carousel> */}
                    </Row>
                </Row>
            </div>
            <Footer/>
        </div>
    );
}

export default CategoryPage;