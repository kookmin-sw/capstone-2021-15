// model
const Product = require('../models/product');

module.exports = {
    // logout: async (req, res) => {
    //     // req: auth 미들웨어에서 받은
    //     // token: '' : 토큰 지우기
    //     await User.findOneAndUpdate({_id: req.user._id}, { token : "" }, (err, user) => {
    //         if(err) return res.json({ success: false, err});
    //         return res.status(200).send({ success : true });
    //     })
    // },
    update_impression: async (req, res) => {
        await Product.findOneAndUpdate(
            {_id: req.query.id},
            {$inc: {impression: 0.5}},
            (err, product) =>{
                if(err) return res.json({impressionSuccess:false, err});
                return res.status(200).send({ impressionSuccess:true })
            })
    },
    update_click_log: async (req, res) => {
        await Product.findOneAndUpdate(
            // req.query._id : 해당 상품 아이디
            {_id: req.query.id},
            {$inc:{click_log:0.5}},
            (err, product) => {
                if(err) return res.json({ClickLogSuccess:false, err});
                return res.status(200).send({ ClickLogSuccess:true })
            })
    },
    read_products: async (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) :30;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        // let price = '' ? req.body.season : '';
        // 검색창에 들어오는 단어 처리
        let term = req.body.searchTerm;
        console.log(req.body)

        if(term){
            console.log(term);
            await Product.find()
            .find({$text: {$search:term}})
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({ success: false, err });
                else{
                    if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!products) 는 빈 배열[] 을 리턴함
                    return res.status(200).json({ success: true, productInfo, postSize:productInfo.length});
                }
            }) 
        } else{
            await Product.find()
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({ success: false, err });
                else{
                    if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!products) 는 빈 배열[] 을 리턴함
                    return res.status(200).json({ success: true, productInfo, postSize:productInfo.length});
                }
            })
        }
    },
    // id로 검색 (1개) 
    read_product_by_datacode: async(req, res) => {
        // console.log(req.query)
        await Product.find({'data-code': req.query.datacode},
            function(err, productInfo) {
                if(err) return res.status(500).json({ success: false, err });
                if(!productInfo) return res.status(404).json({ success: false, message: 'product not found'});
                return res.json({productInfo, success: true
            });
        })
    },
    // 해당 계절 다 읽어오기
    read_season_products:(req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) : 30;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;
        let season = req.params.season!=='' ? req.params.season :'spring'
        if (season!=='') {
            Product.find({'season':season})
                .limit(limit)
                .skip(skip)
                .exec((err, productInfo) => {
                    if(err) return res.status(500).json({ success: false, err });
                    else{
                        if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!productInfo) 는 빈 배열[] 을 리턴함
                        return res.json({productInfo, success: true});
                    }
                })
        }
        else{
            Product.find()
                .limit(limit)
                .skip(skip)
                .exec((err, productInfo) => {
                    if(err) return res.status(500).json({ success: false, err });
                    else{
                        if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!productInfo) 는 빈 배열[] 을 리턴함
                        return res.json({productInfo, success: true});
                    }
                })
        }
    },
    read_season_product_one : async(req, res) => {
        await Product.findOne({
            season: req.params.season}, function(err, productInfo){
            if(err) return res.status(500).json({ success: false, err });
            if(!productInfo) return res.status(404).json({ success: false, message: 'product not found'});return res.json({productInfo, success: true});
        })
    },
    // 아직 tone을 query parameter로 줄지 path parameter로 줄지 ㅜㅠ
    read_season_tone: (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        Product.find({season: req.params.season},{tone: req.query.tone}) 
            .limit(limit)
            .skip(skip)
            .exec((err, productInfo) => {
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!productInfo) 는 빈 배열[] 을 리턴함
                return res.json({productInfo, success: true});
            }
        })
    },
    // category1: makeup
    read_category1_products : (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        Product.find({category1: req.params.category1}) 
            .limit(limit)
            .skip(skip)
            .exec((err, productInfo) => {
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!productInfo) 는 빈 배열[] 을 리턴함
                return res.json({productInfo, success: true});
            }
        })
    },
    // category2: lip 이렇게
    read_category2_products : (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) : 30;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        Product.find({category2:req.params.category2}) 
            .limit(limit)
            .skip(skip)
            .exec((err, productInfo) => {
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!productInfo) 는 빈 배열[] 을 리턴함
                return res.json({productInfo, success: true});
            }
        })
    },

}