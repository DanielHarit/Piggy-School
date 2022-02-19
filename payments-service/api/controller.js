'use strict';

var card = require('../service/card');

var controllers = {
    get_card_info: function(req, res) {
        card.get_card_info(req.params.cardid)
        .then(card => {
            if(!card) {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardid
                });
            }
            res.send(card);
        }).catch(err => {
            return res.status(500).send({
                message: "Error find card with id " + req.params.cardid
            });
        });
    },

    update_card: function(req, res) {
        if(!req.body.amount) {
            return res.status(400).send({
                message: "Amount to trasfer should be specified"
            });
        }

        card.update_card(req.params.cardid, req.body.amount)
        .then(card => {
            res.send(card);
        }).catch(err => {
            return res.status(500).send({
                message: "Error transfer money to card with id " + req.params.cardid
            });
        });
    },
};

module.exports = controllers;
