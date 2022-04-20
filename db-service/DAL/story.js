import * as dotenv from 'dotenv';
import AWS from 'aws-sdk';
import {getChildrenByMail} from './children.js'
import config from '../config.js'

const BUCKET_NAME = "piggy-stories";
const childrenCollectionName = config.db.collections.children;
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: BUCKET_NAME
});

export const getImageUrl = (path) => {
    const params = {Bucket: BUCKET_NAME, Key: path};
    const url = s3.getSignedUrl('getObject', params);
    return url;
}

export const getImageListWithWatchIndicator = (userEmail, handleData) => {
    const params = {Bucket: BUCKET_NAME};
    getChildrenByMail(userEmail).then((result) => {
        s3.listObjects(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                handleData(listObjectsToImageArray(result.watchList, data.Contents));
            }
        })
    });
}

const listObjectsToImageArray = (watchList, listObjects) => {
    const images = [];
    console.log(watchList);
    listObjects.forEach(element => {
        if(!element.Key.endsWith('/')) {
            images.push({'imageUrl': getImageUrl(element.Key), 'imagePath': element.Key, 'seen' : false});
        }
    });
    return images;
}

export const addPiggyCoinsAftetStroyWatch = (userEmail, storyPrefix) => {
    const resultUpdate = db.collection(childrenCollectionName).updateOne(
        {"Mail": userEmail} ,  { $set: {[propertySettings] : value}}
    )
    return resultUpdate.modifiedCount;
}