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
    read_pcrs : async(req, res) => {
        await Item.find({personalColor: req.params.personalColor}, function(err, items){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })
    },
    // 퍼스널 컬러로 찾기 - 하나의 상품 
    // read_pcrs_one : async(req, res) => {
    //     await Item.findOne({personalColor: req.params.personalColor}, function(err, item){
    //         if(err) return res.status(500).json({ success: false, err });
    //         if(!item) return res.status(404).json({ success: false, message: 'item not found'});
    //         return res.json({item, success: true});
    //     })
    // },

    read_category2 : async(req, res) => {
        await Item.find({category2: req.params.category2}, function(err, items){
            if(err) return res.status(500).json({ success: false, err });
            else{
                if (items.length === 0) return res.send({message: "no items"}) // 아예 아이템이 존재하지 않을 때. (!items) 는 빈 배열[] 을 리턴함
                return res.json({items, success: true});
            }
        })
    },

}