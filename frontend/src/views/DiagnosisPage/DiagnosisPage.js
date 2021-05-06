import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import './DiagnosisPage.css'
import * as config from '../../Config'
import axios from 'axios'
import S3 from "react-aws-s3"

function DiagnosisPage(props) {

    const onChange = (e) => {
        var img = e.target.files[0]
        var data = {
            'file': img,
            'filename': img.name
        }
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        }
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(data.file, data.filename)
            .then(data => {
                console.log(data)
            })

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
