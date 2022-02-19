// That will be used to integrate with the cards supplier service
var request = require('request');

module.exports.get_card_info = function(cardid) {
    // TODO get card info from other serivce
    // TODO get card trasactions from other service
    var cardInfo = {
        cardid: cardid,
        cashAmount: 1200,
        transactions: [
            {
                "id": '123',
                "amount": 100,
                "to": "124134324",
                "category": "food"
            },
            {
                "id": '124',
                "amount": 160,
                "to": "2137812703",
                "category": "finance"
            }
        ]
    }

    return new Promise((resolve, reject) => {
        resolve(cardInfo);
    });
}

module.exports.update_card = function(cardid, amount) { 
    // raise error if amount is 0 or less
    if (amount <= 0) {
        throw new Error('Not possiable to add negative amount of money');
    }
    // card exists - add money
    if (cardid == "123456789") {
        return new Promise((resolve, reject) => {
            resolve(this.get_card_info(cardid));
        });
    } 
    // new card - create card with amount of money
    else {
        return new Promise((resolve, reject) => {
            resolve(this.get_card_info(cardid));
        });
    }
}