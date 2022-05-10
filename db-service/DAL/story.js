import * as dotenv from 'dotenv';
import AWS from 'aws-sdk';
import {getChildrenByMail} from './children.js'
import config from '../config.js'
import db from './mongoConnectios.js';

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
                handleData(listObjectsToImageArray(result.WatchList, data.Contents));
            }
        })
    });
}

const listObjectsToImageArray = (watchList, listObjects) => {
    const storiesData = [];
    listObjects.forEach(imageObject => {
        if(imageObject.Key.endsWith('/')) {
            const storyPrefix = imageObject.Key.substring(0, imageObject.Key.indexOf('/'));
            const seen = watchList.includes(storyPrefix);
            const storyBatchItem = {
                "storyPrefix": storyPrefix,
                "seen": seen,
                "photos": []
            }
            storiesData.push(storyBatchItem);
        }
    });
    listObjects.forEach(imageObject => {
        if(!imageObject.Key.endsWith('/')) {
            const storyPrefix = imageObject.Key.substring(0, imageObject.Key.indexOf('/'));
            const storyBatchIndex = storiesData.findIndex((storyBatchItem) => storyBatchItem.storyPrefix == storyPrefix);
            storiesData[storyBatchIndex].photos.push(getImageUrl(imageObject.Key));
        }
    });

    return images;
}

export const addStroyIdToUserWatchList = async (userEmail, storyPrefix) => {
    const resultUpdate = await db.collection(childrenCollectionName).updateOne(
        {"Mail": userEmail} ,  { $push: {WatchList: storyPrefix}}
    )
    return resultUpdate.modifiedCount;
}