// That will be used to integrate with the cards supplier service
var request = require('request');
const Card = require('../models/card.model.js');

module.exports.get_card_info = async function(userid) {
    var card = await Card.findOne({userid: userid});

    if (!card) {
        throw new Error("No card with this userid found");
    }
    
    // TODO get card info from other serivce
    // TODO get card trasactions from other service
    var cardInfo = {
        userid: userid,
        cardid: card.cardid,
        cashAmount: 1200,
        transactions: [
            {
                "id": '123',
                "amount": 100,
                "to": "124134324",
                "category": "food",
                "date": Date.now()
            },
            {
                "id": '124',
                "amount": 160,
                "to": "2137812703",
                "category": "finance",
                "date": Date.now()
            }
        ]
    }
    
    return cardInfo;
}

module.exports.update_card = async function(userid, amount) { 
    // raise error if amount is 0 or less
    if (amount <= 0) {
        throw new Error('Not possiable to add negative amount of money');
    }

    card = await Card.findOne({userid: userid});

    // card exists - add money
    if (card) {
        // TODO: Add money to the card using the extend service
        return card;
    } 

    // new card - create card with amount of money
    else {
        // TODO: Add money to the card using the extend service before create the db item for it
        const newcard = new Card({
            cardid: Math.random() * 1000 + 1,
            userid: userid
        });

        return newcard.save();
    }
}