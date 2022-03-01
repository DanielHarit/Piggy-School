// That will be used to integrate with the cards supplier service and the cards DB
var axios = require('axios');

module.exports.get_card_info = async function(userid) {
    try {
        var response = await axios.get(`${process.env.DB_SERVICE_URL}/children/creditCard/${userid}`);
        var cardid = response.data;
    }
    catch(err) {
        throw new Error("Error connecting to DB service!");
    }

    if (!cardid) {
        throw new Error("No card with this userid found");
    }
    
    // TODO get card info from extend
    var cardInfo = {
        userid: userid,
        cardid: cardid,
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

    try {
        var response = await axios.get(`${process.env.DB_SERVICE_URL}/children/creditCard/${userid}`);
        var cardid = response.data;
    }
    catch(err) {
        throw new Error("Error connecting to DB service!");
    }

    // card exists - add money
    if (cardid && cardid != "") {
        // TODO: Add money to the card using the extend service
        return cardid;
    } 
    
    // new card - create card with amount of money
    else {
        // TODO: Add money to the new card using the extend service before create the db item for it
        return axios.put(`${process.env.DB_SERVICE_URL}/children/creditCard/${userid}`, 
                                    { 
                                        "cardid": Math.random() * 1000 + 1 
                                    });
    }
}