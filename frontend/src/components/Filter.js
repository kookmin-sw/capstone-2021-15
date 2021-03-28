import React from 'react';
import { Button, Toast } from 'react-bootstrap';
import './Filter.css';


const Filter = ( { togglefilter, filter } ) =>  {

    return (
        <>
            <Toast onClose={togglefilter} show={filter}>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                    />
                    <div className="mr-auto">
                        <Button variant="outline-secondary">warm</Button>{' '}
                        <Button variant="outline-secondary">cool</Button>{' '}
                        <Button variant="outline-dark">Apply</Button>  </div>
                </Toast.Header>
            </Toast>
        </>
    )

}

export default Filter;