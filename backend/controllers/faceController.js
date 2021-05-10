const AWS = require('aws-sdk');
const config = require("../config/key");
const {spawn} = require('child_process')

const downloadFile = async (file_name, local_path) => {
    const fs = require('fs');
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({accessKeyId: config.ACCESS_KEY_ID, secretAccessKey: config.SECRET_ACCESS_KEY})
    const params = {
        Bucket: config.BUCKET_NAME,
        Key: file_name
    };
    console.log(local_path)
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err)
            // throw err;
        }
        console.log(data.Body)
        fs.writeFileSync(local_path, data.Body)
    })
};

module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            const file_name = req.body.name;
            downloadFile(file_name, './utils/' + file_name)
            //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
            const python = spawn('python3', ['../utils/face_detection.py --shape-predictor shape_predictor_68_face_landmarks.dat --image jg.JPG'])

            return res.json(200)

        } catch (err) {
            console.log(err)
        }

    }
}