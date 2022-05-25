import React, {useState} from 'react'
import { Input } from 'antd';
const { Search } = Input;


function SearchFeature(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }
    return (
        <div>
            <Search
                placeholder="brand"
                onChange={searchHandler}
                style={{ width: 300 }}
                value={SearchTerm}
                enterButton
            />
        </div>
    )
}

export default SearchFeature