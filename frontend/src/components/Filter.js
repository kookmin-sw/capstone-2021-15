import React , { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { Radio } from 'antd';
import './Filter.css';


const Filter = ( { togglefilter, filter } ) =>  {

    const [tone, setTone] = useState('warm spring');

    const tones =[
        'warm spring',
        'cool summer',
        'warm fall',
        'cool winter'
    ];

    const changetoneHandler = e => {
        console.log('changed tone', e.target.value)
        setTone(e.target.value);
    }

    
    return (
        <>
            <Toast onClose={togglefilter} show={filter} style={{marginTop: "15px"}}>
                {/* <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                    />
                    <div className="mr-auto">
                        <Button variant="outline-secondary">warm</Button>{' '}
                        <Button variant="outline-secondary">cool</Button>{' '}
                        <Button variant="outline-dark">Apply</Button>  
                        
                    </div>
                </Toast.Header> */}
                <Radio.Group options={tones} onChange={changetoneHandler} value={tone} />
            </Toast>
        </>
    )

}

export default Filter;