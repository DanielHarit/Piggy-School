import db from './mongoConnectios.js'
import config from '../config.js'

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
    ).toArray()
    return parent[0].parentChildren;
}