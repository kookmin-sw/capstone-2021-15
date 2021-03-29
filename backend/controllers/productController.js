// model
const Product = require('../models/product');

module.exports = {
    // 모든 상품을 가져오되 3개씩 가져올 것
    products: (req, res) => {
        let limit = req.body.limit ? parseInt(req.body.limit) :50;
        let skip = req.body.skip ? parseInt(req.body.skip) :0;

        Product.find()
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({ success: false, err });
            else{
                if (productInfo.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!products) 는 빈 배열[] 을 리턴함
                return res.status(200).json({ success: true, productInfo, postSize:productInfo.length});
            }
        })                    
    },
    // id로 검색 (1개) 
    read_one: async(req, res) => {
        await Product.findOne({_id: req.params.product_id}, function(err, productInfo) {
            if(err) return res.status(500).json({ success: false, err });
            if(!product) return res.status(404).json({ success: false, message: 'product not found'});
            return res.json({productInfo, success: true});
        })
    },
    // 해당 계절 다 읽어오기
    season_all: async(req, res) => {
        await Product.find({season: req.params.season}, function(err, productInfo){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (products.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!products) 는 빈 배열[] 을 리턴함
                return res.json({productInfo, success: true});
            }
        })
    },
    // 계절로 찾기 - 하나의 상품 
    season_one : async(req, res) => {
        await Product.findOne({season: req.params.season}, function(err, productInfo){
            if(err) return res.status(500).json({ success: false, err });
            if(!product) return res.status(404).json({ success: false, message: 'product not found'});
            return res.json({productInfo, success: true});
        })
    },
    // category1: makeup
    // category2: lip 이렇게
    read_category2 : async(req, res) => {
        await Product.find({category2: req.params.category2}, function(err, productInfo){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (products.length === 0) return res.send({message: "no products"}) // 아예 아이템이 존재하지 않을 때. (!products) 는 빈 배열[] 을 리턴함
                return res.json({productInfo, success: true});
            }
        })
    },

}