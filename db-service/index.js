import express from 'express'
import cors from 'cors'
import config from './config.js'
import {initializeDbConnection} from './DAL/mongoConnectios.js'
import {getChildrenById, getChildrenByMail, getCreditCardByChildrenId, updateCreditCardByChildrenId, registerChild, updateChildrenDisplayName} from './DAL/children.js'
import {getChildrenByParentId, getParentById, registerParent, getParentByMail} from './DAL/parent.js'
import {getAvatarById, getAllAvatars} from './DAL/avatar.js'
import {getUserType} from './DAL/identity.js'
import {getAllBackgroundColors, getBackgroundColorById} from './DAL/backgroudColor.js'

var port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

initializeDbConnection().then(() => {
	app.listen(port, function () {
		console.log('Server started on port: ' + port);
	});
});

// identity
app.get('/identity/:mail', async (req, res) => {
	const userType = await getUserType(req.params.mail);
	res.send(userType);
});

// childrens
app.get('/children/:id', async (req, res) => {
	const children = await getChildrenById(req.params.id);
	res.send(children);
});
app.get('/children/mail/:mail', async (req, res) => {
	const children = await getChildrenByMail(req.params.mail);
	res.send(children);
});

app.get('/children/creditCard/:id', async (req, res) => {
	const creditCard = await getCreditCardByChildrenId(req.params.id);
	res.send(creditCard);
});

app.put('/children/creditCard/:id', async (req, res) => {
	const cardId = req.body.cardId;
	const countUpdated = await updateCreditCardByChildrenId(req.params.id, cardId);
	res.send(`update ${countUpdated} documents`);
});

app.post('/children/register', async (req, res) => {
	const userMail = req.body.mail;
	const displayName = req.body.displayName;
	const parentMail = req.body.parentMail;
	let newChildResponse;

	try {
		newChildResponse = await registerChild(userMail, displayName, parentMail);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: `Error creating child user with mail ${userMail}` });
	}

	res.send(newChildResponse);
});

app.put('/children/AlertSettings/:id', async (req, res) => {
	const newSettings = req.body;
	const countUpdated = await updateChildrenSettings(req.params.id, newSettings);
	res.send(`update ${countUpdated} documents`);
});

app.put('/children/DisplayName/:id', async (req, res) => {
	const displayName = req.body.value;
	const countUpdated = await updateChildrenDisplayName(req.params.id, displayName);
	res.send(`update ${countUpdated} documents`);
});

app.put('/children/AlertSettings/:id', async (req, res) => {
    const newSettings = req.body;
    const countUpdated = await updateChildrenSettings(req.params.id,newSettings);
    res.send(`update ${countUpdated} documents`);
});

app.put('/children/DisplayName/:id', async (req, res) => {
    const displayName = req.body.value;
    const countUpdated = await updateChildrenDisplayName(req.params.id,displayName);
    res.send(`update ${countUpdated} documents`);
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
app.get('/parent/mail/:mail', async (req, res) => {
	const parent = await getParentByMail(req.params.mail);
	res.send(parent);
});

app.post('/parent/register', async (req, res) => {
	const userMail = req.body.mail;
	const displayName = req.body.displayName;
	const creditCardNumber = req.body.creditCardNumber;
	const childrensList = req.body.childrensList;
	let newParentResponse;

	try {
		newParentResponse = await registerParent(userMail, displayName, creditCardNumber, childrensList);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: `Error creating parent user with mail ${userMail}` });
	}

	res.send(newParentResponse);
});

app.post('/parent/child', async (req, res) => {
	const parentMail = req.body.parentMail;
	const childId = req.body.childId;
	let newParentChild;

	try {
		newParentChild = await updateParentChildrens(childId, parentMail);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: `Error adding child ${childMail} to parent ${parentMail}` });
	}

	res.send(newParentChild);
});
app.get('/user/type/:id', async (req, res) => {
	const isParent = await getParentById(req.params.id);
	res.send(isParent ? 'Parent' : 'Child');
});
app.get('/user/type/:id' , async (req, res) => {
    const isParent = await getParentById(req.params.id);
    res.send(isParent ? "Parent" : "Child");
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
