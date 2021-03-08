// model
const Item = require('../models/item');

module.exports = {
    // 모든 상품 가져옴
    all_items: async(req, res) => {
        await Item.find(function(err, items){
            if(err) return res.json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })                    
    },
    // id로 검색 (1개) 
    read_one: async(req, res) => {
        await Item.findOne({_id: req.params.item_id}, function(err, item) {
            if(err) return res.status(500).json({ success: false, err });
            if(!item) return res.status(404).json({ success: false, message: 'item not found'});
            return res.json({item, success: true});
        })
    },
    // 퍼스널 컬러로 찾기 - 모든 상품 
    // 이 경우 클릭 로그 순위로 정렬해서 아이템을 가져오지 않을까
    read_pcrs : async(req, res) => {
        await Item.find({personalColor: req.params.personalColor}).sort({'click_log': -1}).exec(function(err, items){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })
    },
    // 퍼스널 컬러로 찾기 - 하나의 상품 
    // 이 경우 클릭 로그 순위로 정렬해서 제일 순위가 높은 아이템을 가져오지 않을까
    // read_pcrs_one : async(req, res) => {
    //     await Item.findOne({personalColor: req.params.personalColor}).sort({"click_log": -1}).exec(function(err, item){
    //         if(err) return res.status(500).json({ success: false, err });
    //         if(!item) return res.status(404).json({ success: false, message: 'item not found'});
    //         return res.json({item, success: true});
    //     })
    // },
    // 카테고리로 찾기 - 모든 상품
    // 네이버 api 에서 제공하는 아이템의 카테고리는 4개임 -> 데이터 가공을 먼저 해야함
    // category 2: 화장품/미용
    // category 3: 색조메이크업 이런 식인듯
    read_category2 : async(req, res) => {
        await Item.find({category2: req.params.category2}).sort({'click_log': -1}).exec(function(err, items){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })
    },
    // 카테고리로 찾기 - 하나의 상품
    // read_category2_one : async(req, res) => {
    //     await Item.findOne({category2: req.params.category2}, function(err, item){
    //         if(err) return res.status(500).json({ success: false, err });
    //         if(!item) return res.status(404).json({ success: false, message: 'item not found'});
    //         return res.json({item, success: true});
    //     })
    // },

    read_category3 : async(req, res) => {
        await Item.find({category3: req.params.category3}, function(err, item){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })
    },
}