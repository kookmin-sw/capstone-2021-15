const config = require("../config/key");
const {spawn} = require('child_process')
const {PythonShell} = require('python-shell')
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({accessKeyId: config.ACCESS_KEY_ID, secretAccessKey: config.SECRET_ACCESS_KEY})
const downloadFile = async (file_name, local_path) => {

    const params = {
        Bucket: config.BUCKET_NAME,
        Key: 'jg.JPG',
    };
    console.log(file_name)
    var file = require('fs').createWriteStream(local_path);
    console.log(local_path)
    s3.getObject(params).createReadStream().pipe(file)
    // s3.getObject(params, (err,data) => {
    //     console.log(data)
    // })
};

module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            const file_name = req.body.name;
            downloadFile(file_name, './utils/' + file_name)
                .then(() => {
                    var options = {
                        scriptPath: './utils',
                        args: ['./utils/' + file_name, './utils/shape_predictor_68_face_landmarks.dat']
                    }

                    PythonShell.run('face_detection.py', options, (err, results) => {
                        if (err) {
                            console.log('error')
                            console.log(err)
                        }
                        console.log(results)
                        const params = {
                            Bucket: config.BUCKET_NAME,
                            Key: 'jg.JPG',
                            Body: fs.createReadStream('./utils/' + file_name),
                            ContentType: 'image/png'
                        }
                        s3.upload(params, (err, data) => {
                            console.log(data)
                        })
                        console.log('results')
                        console.log('test')
                    })


                })

            return res.json(200)

        } catch (err) {
            console.log(err)
        }

    }
}