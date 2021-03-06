import express from 'express';
import cors from 'cors';
import config from './config.js';
import { handleAvatarPurchase, handleBackgroundColorPurchase } from './piggyStore.js'
import { initializeDbConnection } from './DAL/mongoConnectios.js';
import { getChildrenById, getChildrenByMail, getCreditCardByChildrenId, updateCreditCardByChildrenId, registerChild, updateChildrenDisplayName, updateChildrenSettings, addWish, updateWishList, updateChildBudget} from './DAL/children.js';
import { getChildrenByParentId, getParentById, registerParent, getParentByMail, updateParentSettings, updateParentDisplayName , updateParentCreditCard, updateParentChildrens, addChildren, getWishlistAlertData} from './DAL/parent.js';
import { getAvatarById, getAllAvatars } from './DAL/avatar.js';
import { getUserType } from './DAL/identity.js';
import { getAllBackgroundColors, getBackgroundColorById , getBackgroundColorByChildrenMail} from './DAL/backgroudColor.js';
import { getImageListWithWatchIndicator, addStroyIdToUserWatchList} from './DAL/story.js'
import { inviteChild, alertParentMail , alertChildrenMail} from './utilities/mailer.js'
var port = process.env.PORT || config.app.port;
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

app.post('/children/invite/:parentMail', async (req, res) => {
		const str = await inviteChild(req.body.childrenMail,req.params.parentMail);
		if(str==="error")
			res.status(500).send("error")
		else
			res.send('send mail');
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

	const parent = await getParentByMail(userMail);
	if (parent) {
		console.log(`Parent existed! ${userMail}`);
		res.status(500).send({ message: `A parent with this mail already exists: ${userMail}` });
	} else {
		try {
			newChildResponse = await registerChild(userMail, displayName, parentMail);
		} catch (err) {
			console.log(err);
			res.status(500).send({ message: `Error creating child user with mail ${userMail}` });
		}

		res.send(newChildResponse);
	}
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

app.post('/children/WishList/:id', async (req, res) => {
	const newWish = req.body;
	const countUpdated = await addWish(req.params.id, newWish);
	const parents = await getWishlistAlertData(req.params.id);
	const childrenName = await getChildrenById(req.params.id);
	alertParentMail(parents, childrenName.UserSettings.DisplayName, "newAim")
	res.send(`update ${countUpdated} documents`);
});

app.put('/children/WishList/:id', async (req, res) => {
	const wishesUpdates = req.body.wishesUpdates;
	const countUpdated = await updateWishList(req.params.id, wishesUpdates);
	res.send(`update ${countUpdated} documents`);
});

app.put('/children/Budget/:id', async (req, res) => {
  const { id: childId } = req.params
  const { newBudget } = req.body
  const countUpdated = await updateChildBudget(childId, newBudget)
  res.send(`update ${countUpdated} documents`)
})

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

app.put('/parent/AlertSettings/:id', async (req, res) => {
    const newSettings = req.body;
    const countUpdated = await updateParentSettings(req.params.id,newSettings);
    res.send(`update ${countUpdated} documents`);
});

app.put('/parent/creditCardNumber/:id', async (req, res) => {
    const creditCardNewNumber = req.body.value;
    const countUpdated = await updateParentCreditCard(req.params.id,creditCardNewNumber);
    res.send(`update ${countUpdated} documents`);
});

app.put('/parent/addChildren/:id', async (req, res) => {
	const childrenMail = req.body.value;
	const countUpdated = await addChildren(req.params.id, childrenMail);
	if(countUpdated === 0)
		res.send('')
	else
	res.send(`update ${countUpdated} documents`);
});

app.put('/parent/DisplayName/:id', async (req, res) => {
	const displayName = req.body.value;
	const countUpdated = await updateParentDisplayName(req.params.id, displayName);
	res.send(`update ${countUpdated} documents`);
});

app.post('/parent/register', async (req, res) => {
	const userMail = req.body.mail;
	const displayName = req.body.displayName;
	const creditCardNumber = req.body.creditCardNumber;
	const childrensList = req.body.childrensList;
	let newParentResponse;

	const children = await getChildrenByMail(userMail);
	if (children) {
		console.log(`Child existed! ${userMail}`);
		res.status(500).send({ message: `A child with this mail already exists: ${userMail}` });
	} else {
		try {
			newParentResponse = await registerParent(userMail, displayName, creditCardNumber, childrensList);
		} catch (err) {
			console.log(err);
			res.status(500).send({ message: `Error creating parent user with mail ${userMail}` });
		}

		res.send(newParentResponse);
	}
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

app.get('/backgroundColor/childrenMail/:mail', async (req, res) => {
	const backgoundColor = await getBackgroundColorByChildrenMail(req.params.mail);
	res.send(backgoundColor);
});

app.get('/backgroundColorByChildren/:id', async (req, res) => {
	const backgoundColor = await getBackgroundColorById(req.params.id);
	res.send(backgoundColor);
});
app.get('/backgroundColor', async (req, res) => {
	const backgoundColors = await getAllBackgroundColors(req.params.id);
	res.send(backgoundColors);
});

// stories
app.get('/stories/:userEmail', (req, res) => {
    getImageListWithWatchIndicator(req.params.userEmail, (storiesList) => {
        res.send(storiesList);
    });
});

app.post('/stories/addToWatchList', async (req, res) => {
    const successMassege = await addStroyIdToUserWatchList(req.body.userEmail, req.body.storyNumber);
    res.send(successMassege.toString());
});

// alerts
app.post('/children/alert',async (req, res)=>{
	const {alertType, childrenName , childrenMail} = req.body;
	const sendMsg = await  alertChildrenMail(childrenMail ,childrenName, alertType)
	res.send('msg sent')
});

// store
app.post('/purchase/avatar',async (req, res) => {
	const { childrenMail, itemId } = req.body;
	const result = await handleAvatarPurchase(childrenMail , itemId)
	res.send(result);
});

app.post('/purchase/backgroundColor',async (req, res) => {
	const { childrenMail, itemId } = req.body;
	const result = await handleBackgroundColorPurchase(childrenMail , itemId)
	res.send(result);
});
