import {MongoClient} from 'mongodb';
import db from './mongoConnectios.js';
import config from '../config.js'
import {updateParentChildrens} from './parent.js';
import { v4 as uuidv4 } from 'uuid';

const collectionName = config.db.collections.children;

export const getChildrenById = async (id) =>{
    const children =  await db.collection(collectionName).findOne({_id:id});
    return children;
}
export const getCreditCardByChildrenId = async (id) =>{
    const children =  await getChildrenById(id);
    return children.CardId;
}

export const updateCreditCardByChildrenId = async (childrenId,cardId) =>{
    const resultUpdate = await db.collection(collectionName).updateOne(
        {"_id": childrenId} ,  { $set: {"CardId" : cardId}}
    )
    return resultUpdate.modifiedCount;
}

export const registerChild = async (userMail, displayName, parentMail) =>{
    const child =  await db.collection(collectionName).findOne({Mail:userMail});
    let newChildDocument;

    if (!child) {
        newChildDocument =  {
            _id: uuidv4(),
            Mail: userMail,
            CardId: "",
            PiggyCoins: 0,
            PurchesHistory: [],
            UserSettings: {
                "DisplayName": displayName,
                "AvaterId": "62171cef74e8cac9530332b",
                "BackgroudColor":"62171cef74e8cac9530d56a"
            },
            Budget: [],
            WatchList: []
        }
        
        await db.collection(collectionName).insertOne(newChildDocument);
    }

    const childId = child ? child._id : newChildDocument._id;
    return updateParentChildrens(childId, parentMail);
}