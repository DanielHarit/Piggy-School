'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.route('/card/:userid')
        .get(controller.get_card_info);
    app.route('/card/:userid')
        .put(controller.update_card);
    app.route('/card/resend/:userid')
        .get(controller.resend_card_details);
};