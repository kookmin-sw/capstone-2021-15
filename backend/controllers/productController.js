// model
const Product = require('../models/product');

module.exports = {
    // 모든 상품을 가져오되 3개씩 가져올 것
    read_products: (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) :100;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        let season = req.body.season ? req.body.season : '';
        // let price = '' ? req.body.season : '';
        // 검색창에 들어오는 단어 처리
        let term = req.body.searchTerm;
        console.log(req.body)


        if(term){
            console.log(term);
            Product.find()
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
            Product.find({
                'season':season
            })
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
    read_product_one: async(req, res) => {
        await Product.findOne({_id: req.params.product_id},
            function(err, productInfo) {
                if(err) return res.status(500).json({ success: false, err });
                if(!product) return res.status(404).json({ success: false, message: 'product not found'});
                return res.json({productInfo, success: true
            });
        })
    },
    // 해당 계절 다 읽어오기
    read_season_products:(req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        Product.find({season:req.params.season}) 
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


    // 이거 어떻게 줄건지 정하기 200331
    read_season_product_one : async(req, res) => {
        await Product.findOne({
            season: req.params.season}, function(err, productInfo){
            if(err) return res.status(500).json({ success: false, err });
            if(!productInfo) return res.status(404).json({ success: false, message: 'product not found'});
            return res.json({productInfo, success: true});
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
        let limit = req.body.limit ? parseInt(req.body.limit) : 50;
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