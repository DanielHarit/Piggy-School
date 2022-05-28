import { MongoClient } from 'mongodb'
import db from './mongoConnectios.js'
import config from '../config.js'
import { updateParentChildrens } from './parent.js'
import { v4 as uuidv4 } from 'uuid'
import { getAvatarById } from './avatar.js'

const collectionName = config.db.collections.children

export const getChildrenById = async (id) => {
  const children = await db.collection(collectionName).findOne({ _id: id })
  return children
}

export const getChildrenByMail = async (mail) => {
  const children = await db.collection(collectionName).findOne({ Mail: mail })
  if (!children) return null
  const avatar = await getAvatarById(children.UserSettings.AvatarId)
  return {
    ...children,
    UserSettings: { ...children.UserSettings, avatarURL: avatar.URL },
  }
}

export const getCreditCardByChildrenId = async (id) => {
  const children = await getChildrenById(id)
  return children.CardId
}

export const updateCreditCardByChildrenId = async (childrenId, cardId) => {
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne({ _id: childrenId }, { $set: { CardId: cardId } })
  return resultUpdate.modifiedCount
}

export const registerChild = async (userMail, displayName, parentMail) => {
  const child = await db.collection(collectionName).findOne({ Mail: userMail })
  let newChildDocument

  if (!child) {
    newChildDocument = {
      _id: uuidv4(),
      Mail: userMail,
      CardId: '',
      PiggyCoins: 0,
      totalPiggyCoins: 0,
      PurchesHistory: [],
      UserSettings: {
        DisplayName: displayName,
        AvatarId: '62171cef74e8cac9530332b',
        BackgroudColor: '62171cef74e8cac9530d56a',
        AlertsSettings: {
          WeeklyWatch: true,
          NewStories: true,
          Allowance: true,
        },
      },
      Budget: {
        entertainment: 0,
        food: 0,
        other: 0,
        shopping: 0,
      },
      WatchList: [],
      WishList: [],
    }

    await db.collection(collectionName).insertOne(newChildDocument)
  }

  const childId = child ? child._id : newChildDocument._id
  return updateParentChildrens(childId, userMail, parentMail)
}
export const updateChildrenSettings = async (childrenId, settings) => {
  const property = Object.keys(settings)[0]
  const value = settings[property]
  const propertySettings = 'UserSettings.AlertsSettings.' + property
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne({ _id: childrenId }, { $set: { [propertySettings]: value } })
  return resultUpdate.modifiedCount
}

export const updateChildrenDisplayName = async (childrenId, newName) => {
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne(
      { _id: childrenId },
      { $set: { 'UserSettings.DisplayName': newName } }
    )

  return resultUpdate.modifiedCount
}

export const addWish = async (childrenId, newWish) => {
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne({ _id: childrenId }, { $push: { WishList: newWish } })

  return resultUpdate.modifiedCount
}

export const updateWishList = async (childrenId, wishListUpdates) => {
  const idsToRemove = wishListUpdates.idsToRemove
  if (idsToRemove.length)
    await db
      .collection(collectionName)
      .updateMany(
        { _id: childrenId },
        { $pull: { WishList: { id: { $in: idsToRemove } } } }
      )

  const { WishList } = await db
    .collection(collectionName)
    .findOne({ _id: childrenId })

  const prioritiesMap = {}
  wishListUpdates.priorities.forEach(
    ({ id, priority }) => (prioritiesMap[id] = priority)
  )

  const newWishList = WishList.map((wish) => ({
    ...wish,
    priority: prioritiesMap[wish.id],
  }))
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne({ _id: childrenId }, { $set: { WishList: newWishList } })

  return resultUpdate.modifiedCount
}

export const updateChildBudget = async (childId, newBudget) => {
  const resultUpdate = await db
    .collection(collectionName)
    .updateOne({ _id: childId }, { $set: { Budget: newBudget } })

  return resultUpdate.modifiedCount
}
