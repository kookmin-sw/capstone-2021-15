const config = require("../config/key");
const {spawn} = require('child_process')
const {PythonShell} = require('python-shell')
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({accessKeyId: config.ACCESS_KEY_ID, secretAccessKey: config.SECRET_ACCESS_KEY})
const downloadFile = async (file_name, local_path) => {

    const params = {
        Bucket: config.BUCKET_NAME,
        Key: file_name,
    };
    var file = require('fs').createWriteStream(local_path);
    s3.getObject(params).createReadStream().pipe(file)
};

module.exports = {
    diagnosis: async (req, res, next) => {
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
                            Key: file_name,
                            Body: fs.createReadStream('./utils/' + file_name),
                            ContentType: 'image/' + 'png'
                        }
                        s3.upload(params, (err, data) => {
                            console.log('test', data)
                            // res.set({'Content-Type': 'image/png'});
                            return res.json(data)
                        })
                    })
                })
        } catch (err) {
            console.log(err)
            res.json(404)
        }
    },

    result: async (req, res, next) => {
        try {
            const data = req.body

            const warm = ["따뜻한 색이 잘 어울리는 타입", 73, 27, 86, 14]
            const cool = ["차가운 색이 잘 어울리는 타입", 71, 29, 60, 40]
            const light = ["밝은 색이 잘 어울리는 타입", 57, 43, 70, 30]
            const bright = ["비비드한 색이 잘 어울리는 타입", 64, 36, 67, 33]
            const mute = ["소프트한 색이 잘 어울리는 타입", 64, 36, 67, 33]
            const dark = ["어두운 색이 잘 어울리는 타입 ", 67, 33, 56, 44]

            var prob = {}
            var type = ''

            if (data[0] === "spring") {
                if (data[1] === "fall") {
                    prob[data[0]] = warm[1]
                    prob[data[1]] = warm[2]
                    type = warm[0]
                } else if (data[1] === "summer") {
                    prob[data[0]] = light[1]
                    prob[data[1]] = light[2]
                    type = light[0]
                } else {
                    prob[data[0]] = bright[1]
                    prob[data[1]] = bright[2]
                    type = light[0]
                }
            } else if (data[0] === "summer") {
                if (data[1] === "spring") {
                    prob[data[0]] = light[3]
                    prob[data[1]] = light[4]
                    type = light[0]
                } else if (data[1] === "fall") {
                    prob[data[0]] = mute[1]
                    prob[data[1]] = mute[2]
                    type = mute[0]
                } else {
                    prob[data[0]] = cool[1]
                    prob[data[1]] = cool[2]
                    type = cool[0]
                }
            } else if (data[0] === "fall") {
                if (data[1] === "spring") {
                    prob[data[0]] = warm[3]
                    prob[data[1]] = warm[4]
                    type = warm[0]
                } else if (data[1] === "summer") {
                    prob[data[0]] = mute[3]
                    prob[data[1]] = mute[4]
                    type = mute[0]
                } else {
                    prob[data[0]] = dark[1]
                    prob[data[1]] = dark[2]
                    type = dark[0]
                }
            } else if (data[0] === "winter") {
                if (data[1] === "spring") {
                    prob[data[0]] = bright[3]
                    prob[data[1]] = bright[4]
                    type = bright[0]
                } else if (data[1] === "summer") {
                    prob[data[0]] = cool[3]
                    prob[data[1]] = cool[4]
                    type = cool[0]
                } else {
                    prob[data[0]] = dark[3]
                    prob[data[1]] = dark[4]
                    type = dark[0]
                }
            }
            const spring = {"summer": "Light", "fall": "True", "winter": "Bright"}
            const summer = {"spring": "Light", "fall": "Soft", "winter": "True"}
            const fall = {"summer": "Soft", "spring": "True", "winter": "Dark"}
            const winter = {"spring": "Bright", "fall": "Dark", "summer": "True"}
            var worst = ""
            if (data[3] === "spring") {
                worst = spring[data[1]] + " " + data[3]
            } else if (data[3] === "summer") {
                worst = summer[data[1]] + " " + data[3]
            } else if (data[3] === "fall") {
                worst = fall[data[1]] + " " + data[3]
            } else {
                worst = winter[data[1]] + " " + data[3]
            }
            console.log(prob)
            console.log(type)
            console.log(worst)
            res.json({
                prob: prob,
                type: type,
                worst: worst
            })
        } catch (err) {
            console.log(err)
            res.json(404)
        }
    }
}