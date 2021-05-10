import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import './DiagnosisPage.css'
import axios from 'axios'
import S3 from "react-aws-s3"
import {uploadFile} from "react-s3";

const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
}

function DiagnosisPage(props) {

    const onChange = (e) => {
        e.preventDefault(); // 화면 새로고침 x
        var file = e.target.files[0]
        var data = {
            'file': file,
            'name': 'inputs/' + file.name
        }
        uploadFile(data, config)
            .then(data => console.log(data))
            .catch(err => console.log(err))

        axios.post('/api/user/face', data)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    console.log('error')
                }
            })
    }

    return (
        <div className="box">
            <input type="file" name="image" onChange={onChange}/>
        </div>
    )
}

export default withRouter(DiagnosisPage)
