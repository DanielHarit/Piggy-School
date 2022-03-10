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

    try {
        response = await axios.get(`${process.env.EXTEND_SERVICE_URL}/card/${cardid}`);
        return response.data;
    }
    catch(err) {
        throw new Error(`Error getting card details! cardid: ${cardid}`);
    }
}

module.exports.update_card = async function(userid, amount) { 
    // Raise error if amount is 0 or less
    if (amount <= 0) {
        throw new Error('Not possiable to add negative amount of money');
    }

    // Get the children with his card id
    try {
        var response = await axios.get(`${process.env.DB_SERVICE_URL}/children/${userid}`);
        var children = response.data;
        var cardid = children["CardId"];
    }
    catch(err) {
        throw new Error("Error connecting to DB service!");
    }

    // Card does not exists - create card and update children with his new card id
    if (!cardid || cardid == "") {
        try {
            response = await axios.post(`${process.env.EXTEND_SERVICE_URL}/card`, {
                "cardHolderName": children["UserSettings"]["DisplayName"]
            });
            
            cardid = response.data["id"];
            
            response = await axios.put(`${process.env.DB_SERVICE_URL}/children/creditCard/${userid}`, { 
                "cardId": cardid
            });
        }
        catch(err) {
            throw new Error(`Error creating new card for user with userid: ${userid}`);
        }
    }

    // Load money to card
    try {
        response = await axios.put(`${process.env.EXTEND_SERVICE_URL}/card/loadMoney`, {
            "id": cardid,
            "amount": amount
        });
        
        return response.data;
    }
    catch(err) {
        throw new Error(`Error load money to card: ${cardid}`);
    }
}