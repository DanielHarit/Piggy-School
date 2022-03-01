import express from 'express'
import config from './config.js'
import {initializeDbConnection} from './DAL/mongoConnectios.js'
import {getChildrenById, getCreditCardByChildrenId} from './DAL/children.js'
import {getChildrenByParentId, getParentById} from './DAL/parent.js'
import {getAvatarById,getAllAvatars} from './DAL/avatar.js'
import {getAllBackgroundColors,getBackgroundColorById} from './DAL/backgroudColor.js'

var port = process.env.PORT || config.app.port;
const app = express();

initializeDbConnection().then(() => {
    app.listen(port, function() {
        console.log('Server started on port: ' + port);
    });
});

// childrens
app.get('/children/:id', async (req, res) => {
    const children = await getChildrenById(req.params.id);
    res.send(children);
});

app.get('/children/creditCard/:id', async (req, res) => {
    const creditCard = await getCreditCardByChildrenId(req.params.id);
    res.send(creditCard);
});

// parent
app.get('/parentChild/:id', async (req, res) => {
    const children = await getChildrenByParentId(req.params.id);
    res.send(children);
});
app.get('/parent/:id', async (req, res) => {
    const parent = await getParentById(req.params.id);
    res.send(parent);
});

// Avatars
app.get('/avatar/:id', async (req, res) => {
    const avatar = await getAvatarById(req.params.id);
    res.send(avatar);
});

app.get('/avatar', async (req, res) => {
    const avatars = await getAllAvatars(req.params.id);
    res.send(avatars);
});

// BackgroudColor
app.get('/backgroundColor/:id', async (req, res) => {
    const backgoundColor = await getBackgroundColorById(req.params.id);
    res.send(backgoundColor);
});

app.get('/backgroundColor', async (req, res) => {
    const backgoundColors = await getAllBackgroundColors(req.params.id);
    res.send(backgoundColors);
});