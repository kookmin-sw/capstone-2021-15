import React , { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
// import { Menu, Button } from 'antd'
import filterimg from './filter_img.png';
import './Navigation.css';
import Filter from './Filter';


const Navigation = ( props ) =>  {

    const [filter, setFilter] = useState(false);

    // const [category, setCategory] = useState('lip');
    // const categoryHandler = e => {
    //     console.log('click: ', e);
    //     setCategory(e.key);
    // }

    const togglefilter = () => setFilter(!filter);

    return (
        <>
        {/* <div className="navigation_inner" >
            <Menu onClick={categoryHandler} selectedKeys={category} mode="horizontal">
                <Menu.Item key="hair">HAIR</Menu.Item>
                <Menu.Item key="base">BASE</Menu.Item>
                <Menu.Item key="lens">LENS</Menu.Item>
                <Menu.Item key="lip">LIP</Menu.Item>
                <Menu.Item key="top">TOP</Menu.Item>
                <Menu.Item key="acc">ACC</Menu.Item>
                <Button onClick={togglefilter}>
                    <img className="filter_img" src={filterimg}></img>
                    tone
                </Button>
            </Menu>
            <Filter togglefilter={togglefilter} filter={filter}></Filter>
        </div> */}
        <div className="navigation_inner">
            <Nav >
                <Nav.Link href="/category/hair">HAIR</Nav.Link>
                <Nav.Link href="/category/base">BASE</Nav.Link>
                <Nav.Link href="/category/lens">LENS</Nav.Link>
                <Nav.Link href="/category/lip">LIP</Nav.Link>
                <Nav.Link href="/category/top">TOP</Nav.Link>
                <Nav.Link href="/category/acc">ACC</Nav.Link>
                
            </Nav>
        </div>
        </>
    )
}

export default Navigation;