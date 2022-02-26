import db from './mongoConnectios.js';
import config from '../config.js'


const collectionName = config.db.collections.backgroundColor;

export const getBackgroundColorById = async (id) =>{
    const backgroundColor =  await db.collection(collectionName).findOne({_id:id})
    return backgroundColor;
}

export const getAllBackgroundColors = async () =>{
    const backgroundColors =  await db.collection(collectionName).find({});
    return backgroundColors;
}