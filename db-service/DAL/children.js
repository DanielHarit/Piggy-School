import {MongoClient} from 'mongodb';
import db from './mongoConnectios.js';
import config from '../config.js'

const collectionName = config.db.collections.children;

export const getChildrenById = async (id) =>{
    const children =  await db.collection(collectionName).findOne({_id:id});
    return children;
}
export const getCreditCardByChildrenId = async (id) =>{
    const children =  await getChildrenById(id);
    return children.CardId;
}

