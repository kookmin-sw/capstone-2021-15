import React , { useState } from 'react';
import { Nav, Button, Row, Col } from 'react-bootstrap';
import filterimg from './filter_img.png';
import './Navigation.css';
import Filter from './Filter';


const Navigation = ( props ) =>  {

    const [filter, setFilter] = useState(false);

    const togglefilter = () => setFilter(!filter);

    return (
        <>
            <Nav className="justify-content-center">
                <Nav  className="m-2 ">
                    <Nav.Link href="">HAIR</Nav.Link>
                    <Nav.Link href="">BASE</Nav.Link>
                    <Nav.Link href="">LIP</Nav.Link>
                    <Nav.Link href="">EYE</Nav.Link>
                    <Nav.Link href="">CHEEK</Nav.Link>
                    <Nav.Link href="">TOP</Nav.Link>
                    <Button onClick={togglefilter}>
                        <img className="filter_img" src={filterimg}></img>
                        tone
                    </Button>
                </Nav>
            </Nav>
            <Row className="row justify-content-center bg-transparent">
                <Col className="col-sm-6">
                    <Filter togglefilter={togglefilter} filter={filter}></Filter>
                </Col>
            </Row>
        </>
    )
}

export default Navigation;

