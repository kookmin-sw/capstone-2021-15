import React from 'react'
import { Card} from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Card>
                {/* {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{width:'100%', maxHeight:'400px'}}
                            src={`http://localhost:5000/${image}`}/>
                    </div>
                ))} */}
                    <img style={{width:'100%', maxHeight:'400px'}}
                            src={props['img-url']}/>
            </Card>
        </div>
    )
}

export default ImageSlider