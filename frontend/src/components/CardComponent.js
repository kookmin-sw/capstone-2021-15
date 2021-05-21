import React, { useEffect , useState } from "react";
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './CardComponent.css';
import axios from "axios";

const { Meta } = Card;
function CardComponent(props) {
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
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(props.user)
        setProduct(props.product)
    },[props.product, props.user])


    const onClickToSaveClickProduct = (product, user) => {
        let body = {
            product_data_code: product['data-code'],
            product_id: product._id,
            user_id: user._id,
            user_season: user.season,
            product_season: product.season
        }
        // console.log(body)
        axios.post('/api/click-product/click-log', body)
            .then(response => {
                if(response.data.clickLogSuccess) {
                    // console.log(response)
                }
            })
    }
    const onClickToUpdateClickLog = (product) => {
        axios.post(`/api/product/click-log/product_by_id?id=${product._id}`)
            .then(response => {
                if(response.data.ClickLogSuccess) {
                    // console.log(response)
                }
            })
    }
    return (
        <>
            {/* <Link to={`/product/${props['data-code']}`}> */}
                <Card cover={
                        <Link
                            // onClick={()=>{
                            //     // onClickToSaveClickProduct(product, user);
                            //     // onClickToUpdateClickLog(product)
                            // }}

                            to={`/product/${props.product['data-code']}`}>
                            <img src={props.product['img-url']}/>
                        </Link>
                    }
                >
                    <Meta 
                        title={props.product.name+" "+props.product.title}
                        description={
                            <div>
                                [ {props.product.brand} ]
                                <br/>
                                {props.product.season} {pccs[props.product.pccs]}
                                <br/>
                                {props.product.price}원
                            </div>
                            }
                    />
                </Card>
        </>
    )
}
export default CardComponent;