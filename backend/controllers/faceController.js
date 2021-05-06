const AWS = require('aws-sdk');
const config = require("../config/key");
const {spawn} = require('child_process')


async function uploadImage(req, res) {
    console.log('backend')
    console.log(req.body.file)
    const file = req.body.filename;
    //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
    const python = spawn('python3', ['../utils/face_detection.py --shape-predictor shape_predictor_68_face_landmarks.dat --image'] + file.name)

    AWS.config.region = 'ap-northeast-2'; //Seoul
    AWS.config.update({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
    });
    var s3_params = {
        Bucket: 'utpr',
        Key: `outputs/${file.name}`,
    };
    var s3obj = new AWS.S3();
    s3obj.getObject(s3_params, (err, data) => {
        if (err)
            return err;
        var objectData = data.Body.toString('utf-8');
        console.log(objectData)
        return res.json(objectData)
    })


}

module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            console.log('backend')
            console.log(req.body.file)
            const file = req.body.filename;
            //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
            const python = spawn('python3', ['../utils/face_detection.py --shape-predictor shape_predictor_68_face_landmarks.dat --image'] + file.name)

            AWS.config.region = 'ap-northeast-2'; //Seoul
            AWS.config.update({
                accessKeyId: config.ACCESS_KEY_ID,
                secretAccessKey: config.SECRET_ACCESS_KEY,
            });
            var s3_params = {
                Bucket: 'utpr',
                Key: `outputs/${file.name}`,
            };
            var s3obj = new AWS.S3();
            s3obj.getObject(s3_params, (err, data) => {
                if (err)
                    return err;
                var objectData = data.Body.toString('utf-8');
                console.log(objectData)
                return res.json(objectData)
            })
        } catch (err) {
            console.log(err)
        }

    }
}