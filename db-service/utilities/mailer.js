import * as dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import {childrenAlerts, parentAlerts} from './textMsg.js'

export const inviteParent = async (childMail, parentMail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: `<${process.env.EMAIL_USER_NAME}@gmail.com>  finance education`,
        to: parentMail,
        subject: "Piggy School Invitation",
        text: `Hi ${parentMail},
        ${childMail} invited you to Piggy School!
        Please visit us and register in: ${process.env.PIGGY_SCHOOL_CLIENT_URL}
        Waiting to see you,
        Piggy School team.`,
    });

    return "Message sent: " + info.messageId;
}

export const inviteChild = async (childMail, parentMail) => {

    try{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: `<${process.env.EMAIL_USER_NAME}@gmail.com>  finance education`,
        to: childMail,
        subject: "Piggy School Invitation",
        text: `Hi ${childMail},
        ${parentMail} invited you to Piggy School!
        Please visit us and register in: ${process.env.PIGGY_SCHOOL_CLIENT_URL}
        Waiting to see you,
        Piggy School team.`,
    });

    return "Message sent: " + info.messageId;
    } catch(e){
        return "error"
    }
}

export const alertParentMail = async (parentMail , childrenName , alertType) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    parentMail.forEach(async (mail) => {
    const info = await transporter.sendMail({
        from: `<${process.env.EMAIL_USER_NAME}@gmail.com>  finance education`,
        to: mail,
        subject: `Piggy School ${parentAlerts[alertType].title} alert!`,
        text: parentAlerts[alertType].text(parentMail, childrenName)
    });
});

    return "Message sent";
}

export const alertChildrenMail = async ( childMail, childrenName , alertType) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: `<${process.env.EMAIL_USER_NAME}@gmail.com>  finance education`,
        to: childMail,
        subject: `Piggy School ${childrenAlerts[alertType].title} alert!`,
        text: childrenAlerts[alertType].text(childrenName)
    });

    return "Message sent";
}