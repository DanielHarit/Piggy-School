import db from './mongoConnectios.js';
import config from '../config.js'

const parentCollectionName = config.db.collections.parent;
const childrenCollectionName = config.db.collections.children;

export const getUserType = async (mail) => {
    const parent =  await db.collection(parentCollectionName).findOne({Mail:mail});
    if (parent) {
        return { "type": "parent" };
    }

    const child =  await db.collection(childrenCollectionName).findOne({Mail:mail});
    if (child) {
        return { "type": "child" };
    }

    return { "type": "none" };
}