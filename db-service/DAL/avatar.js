import db from './mongoConnectios.js';
import config from '../config.js'

const collectionName = config.db.collections.avatar;

export const getAvatarById = async (id) => {
    
    const avatar =  await db.collection(collectionName).findOne({_id:id});
    return avatar;
}

export const getAllAvatars = async () =>{
    
    const avatars =  await db.collection(collectionName).find({}).toArray();
    return avatars;
}