import db from './mongoConnectios.js'
import config from '../config.js'
import { v4 as uuidv4 } from 'uuid';

const collectionName = config.db.collections.parent;

export const getParentById = async (id) =>{
    const parent =  await db.collection(collectionName).findOne({_id:id});
    return parent;
}

export const getChildrenByParentId = async (id) =>{    
    const parent =  await db.collection(collectionName).aggregate(
        [{$match:{'_id': id}},
            { $lookup:
               {
                 from: 'children',
                 localField: 'Childrens',
                 foreignField: '_id',
                 as: 'parentChildren'
               }
             },
             { $project : {  parentChildren : 1 }},
        ]
    ).toArray();
    return parent[0].parentChildren;
}

export const registerParent = async (userMail, displayName, creditCardNumber) =>{
    const parent =  await db.collection(collectionName).findOne({Mail:userMail});
    if (parent) {
        throw new Error(`User ${userMail} already existed`);
    }

    const newParentDocument =  {
        _id: uuidv4(),
        Childrens: [],
        NotificationsSettings: 
        {
            "newExpense": true,
            "newAim": true,
            "ReceivedMonyLimit": true 
        },
        Mail: userMail,
        DisplayName: displayName,
        Creditcard: creditCardNumber
    }

    await db.collection(collectionName).insertOne(newParentDocument);

    return ({
        "id": newParentDocument._id
    });
}

export const updateParentChildrens = async (childId, parentMail) => {
    const query = { "Mail": parentMail };
    const updateDocument = {
      $push: { "Childrens": childId }
    };

    const result = await db.collection(collectionName).updateOne(query, updateDocument);

    return ({
        "id": childId
    });
}