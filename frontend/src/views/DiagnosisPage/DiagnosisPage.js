import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import './DiagnosisPage.css'
import * as config from '../../Config'

function DiagnosisPage(props) {
    const dispatch = useDispatch();
    const selectedFile = useState(null)
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [img, setImage] = useState(null);

    const onChange = (e) => {
        setImage(e.target.files[0])
    }

    console.log(img)
    return (
        <div className="box">
            <input type="file" name="image" onChange={onChange}/>
        </div>
    )
}

export default withRouter(DiagnosisPage)
