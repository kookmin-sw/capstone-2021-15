import React from 'react'
import { Carousel} from 'antd';
import testImg from '../lip.jpg'
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {/* {props.images.map((image, index) => (
                    <div key={index}> */}
                        <img style={{width:'100%', maxHeight:'400px'}}
                            src={testImg}/>
                            {/* src={`http://localhost:5000/${image}`}/> */}
                    {/* </div> */}
                {/* ))} */}
            </Carousel>
        </div>
    )
}

export default ImageSlider