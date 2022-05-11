export const parentAlerts =  {
    newAim: {
        title: 'new aim',
        text: (parentMail,childrenName)=> (`Hi ${parentMail},
        ${childrenName} added new aim to Piggy School!
        you can watch it right now on Piggy School app.
        Wish you a great day,
        Piggy School team.`)},
    newExpense: {
    title: 'new expense',
    text : (parentMail,childrenName)=>  
    (`Hi ${parentMail},
    ${childrenName} just bought something his card!
    you can watch it right now on Piggy School app.
    Wish you a great day,
    Piggy School team.`),
    },
    ReceivedMoneyLimit: {
    title: 'received money limit',
    text :  (parentMail,childrenName)=> (`Hi ${parentMail},
    The money in ${childrenName}'s card is about to be finished!
    you can pass him money right nowon Piggy School app.
    Wish you a great day,
    Piggy School team.`)
}
}

export const childrenAlerts = {
    NewStories: {
    title: 'new stories',
    text :(chidrenName)=> (`Hi ${chidrenName},
    just want you to know there are new cool stories you must watch!
    you better not miss it!
    Piggy School team.`)
},
    Allawance: {
        title: 'recieved new money',
        text : (childrenName)=>(`Hi ${childrenName},
    you received new money!.
    consider save it in order to reach your aims!
    Piggy School team`)},
    WeeklyWatch: {
        title: 'weekly watch',
        text: (childrenName)=>(`Hi ${childrenName},
    we remaind you to watch this weeks stories in Piggy school
    in order to get more Piggy coins and knowlage that will help you 
    receive your aims!
    Piggy School team
    `)}
}