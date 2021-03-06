import db from './mongoConnectios.js';
import config from '../config.js'
import {getChildrenByMail} from './children.js'

const collectionName = config.db.collections.backgroundColor;

export const getBackgroundColorById = async (id) =>{
    const backgroundColor =  await db.collection(collectionName).findOne({_id:id})
    return backgroundColor;
}

export const getBackgroundColorByChildrenMail = async (childrenMail) =>{
    const backgroundColorId = await getChildrenByMail(childrenMail);
    const backgroundColor = await getBackgroundColorById(backgroundColorId.UserSettings.BackgroudColor);
    return backgroundColor.Color;
}

export const getAllBackgroundColors = async () =>{
    const backgroundColors =  await db.collection(collectionName).find({}).toArray();
    return backgroundColors;
}