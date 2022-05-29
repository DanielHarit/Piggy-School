import { getChildrenByMail, setAvatar, setBackgroundColor, chargePiggyCoins, addItemToPurchaseHistory } from './DAL/children.js';
import { getAvatarById } from './DAL/avatar.js';
import { getBackgroundColorById } from './DAL/backgroudColor.js';

export const handleAvatarPurchase = async (childrenMail, itemId) => {
    const userDetailes = await getChildrenByMail(childrenMail);
    const avatar = await getAvatarById(itemId);
    if(userDetailes.PurchesHistory.includes(itemId)) {
        await setAvatar(userDetailes._id, itemId);
        return("avatar Changed")
    } else if(userDetailes.PiggyCoins >= avatar.Cost) {
        await chargePiggyCoins(userDetailes._id, avatar.Cost);
        await addItemToPurchaseHistory(userDetailes._id, itemId);
        await setAvatar(userDetailes._id, itemId);
        return("avatar purchased");
    } else {
        return "there isn't enouge coins to buy this avatar";
    }
}

export const handleBackgroundColorPurchase = async (childrenMail, itemId) => {
    const userDetailes = await getChildrenByMail(childrenMail);
    const backgroudColor = await getBackgroundColorById(itemId);
    if(userDetailes.PurchesHistory.includes(itemId)) {
        await setBackgroundColor(userDetailes._id, itemId);
        return("background Changed")
    } else if(userDetailes.PiggyCoins >= backgroudColor.Cost) {
        await chargePiggyCoins(userDetailes._id, backgroudColor.Cost);
        await addItemToPurchaseHistory(userDetailes._id, itemId);
        await setBackgroundColor(userDetailes._id, itemId);
        return("background purchased");
    } else {
        return "there isn't enouge coins to buy this backgroundColor";
    }
}