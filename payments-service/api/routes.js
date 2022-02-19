'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.route('/card/:cardid')
        .get(controller.get_card_info);
    app.route('/card/:cardid')
        .put(controller.update_card);
};