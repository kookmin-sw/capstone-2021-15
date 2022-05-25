import CardComponent from "../../components/CardComponent";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { Toast } from 'react-bootstrap';
import { Row, Col, Card, Button, Radio, Checkbox, Slider } from 'antd';
import axios from 'axios'
import './CategoryPage.css'
import SearchFeature from './SearchFeature'
// import Carousel from "./components/CardCarousel";

function CategoryPage(props) {
    const [Products, setProducts] = useState([])
    const [Limit, setLimit] = useState(50)
    const [Skip, setSkip] = useState(0)
    // const [PostSize, setPostSize] = useState(0)
    const [filterPC, setFilterPC] = useState(false);
    const [filterPrice, setFilterPrice] = useState(false);
    // 검색 단어
    const [filterSearch, setFilterSearch] = useState(false);
    const [SearchTerm, setSearchTerm] = useState("")

    const [PersonalColor, setPersonalColor] = useState('spring')
    const [Price, setPrice] = useState([10, 30]); // slider에서 실시간으로 바뀌는 가격대
    const [UserPrice, setUserPrice] = useState([0, 100]); // user data로 받아올 선호 가격대가 15000~30000 이라면 500으로 나눈 값

    const [User, setUser] = useState({})
    const [IsMount, setIsMount] = useState(true)
    // 카테고리 명
    const [Category, setCategory] = useState(props.location.pathname.split("/")[2])



    const togglePC = () => {setFilterPC(!filterPC); setFilterPrice(false); setFilterSearch(false);}
    const togglePrice = () => {setFilterPrice(!filterPrice); setFilterPC(false);setFilterSearch(false);}
    const toggleSearch = () => {setFilterSearch(!filterSearch);setFilterPrice(false); setFilterPC(false);}
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
    const getProducts = (body) => {
        // axios.post(`/api/product/category2/${category2}`)
        axios.post(`/api/product/category2/${Category}`, body)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data.productInfo)
                    setProducts(response.data.productInfo)
                } else {
                    if(response.data.message === "no products") { }
                    else alert('상품을 가져오는데 실패했습니다')
                }
            })
    }
    useEffect(()=>{
        if (IsMount) {
            setIsMount(false)
        } else {
            let body = {
                skip:Skip,
                limit:Limit,
                season: PersonalColor,
            }
            getProducts(body);
            // setSkip(skip);
        }

    }, [IsMount, PersonalColor])


    const changePCHandler = (e) => {
        setPersonalColor(e.target.value);
        console.log(e.target.value)
    }

    const changePriceHandler = (value) => {
        setPrice(value);
    }

    const changeUserPriceHandler = () => {
        setUserPrice(Price);
    }
    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            searchTerm: newSearchTerm
        }
        setSearchTerm(newSearchTerm);
        getProducts(body);
    }

    // const [currentPage, SetCurrentPage] = useState(1)
    // const [productPerPage, setProductPerPage] = useState(20)

    // const indexOfLastProduct = currentPage * productPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productPerPage;

    // const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

    // const paginate = (pageNumber: number) => SetCurrentPage(pageNumber);

    // useEffect(() => {
    //     let mounted = true;

    //     if (mounted) {
    //         getProducts();
    //     }

    //     return () => mounted = false;
    // }, [])


    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <div className="main-container">
                <Row className="category_inner" >
                    <Card className="filter" id="filter" title="Filter">
                        <Button.Group>
                            <Button onClick={togglePC}>
                                Personal Color
                            </Button>
                            <Button onClick={togglePrice}>
                                Price
                            </Button>
                            <Button onClick={toggleSearch}>
                                브랜드 검색
                            </Button>
                        </Button.Group>
                        <Toast onClose={togglePC} show={filterPC}>
                            <Radio.Group options={seasons} onChange={changePCHandler} value={PersonalColor} />
                        </Toast>
                        <Toast  id="pslider" onClose={togglePrice} show={filterPrice} style={{textAlign: "center"}}>
                            {/*tipFormatter setting*/}
                            <Slider range marks={marks} defaultValue={UserPrice} onChange={changePriceHandler}/>
                            <Button id="pricebtn" onClick={changeUserPriceHandler}>적용</Button>
                        </Toast>
                        <Toast onClose={toggleSearch} show={filterSearch} style={{textAlign: "left"}}>
                            {/* {search box} */}

                            <SearchFeature refreshFunction={updateSearchTerm}/>
                        </Toast>
                    </Card>
                    <Row type="flex" gutter={[30, 30]}>
                        {
                            Products ? Products.map((product, index) => {
                                // if (product.season === PersonalColor) {

                                if (product.price >= UserPrice[0]*500 && product.price <= UserPrice[1]*500) {
                                    return (
                                        <Col  key={index} lg={6} md={12} xs={24} >
                                            <CardComponent
                                                user={props.user.userData}
                                                product={product}>
                                            </CardComponent>
                                        </Col>
                                    )
                                }
                                // }
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