import {startDate} from '../env'

export default {
    noAccessTitle:`We are apologizing but You don't have access`,
    sorryAttender: `Sorry our dear attender.`,
    reasonWhyNoAccess: `It seems like you are trying to open conferense in many tabs.<br> We restricted opening many tabs of conference hall for security reasons.<br> Sorry for any inconvinice.`,
    buyTicket: (type) => {
        return `Buy ${type} ticket`
    },
    home: "Home",
    comebackSoon: "Page will be available when conference starts",
    pageWillBeLater: "Please come back later",
    agenda: "Agenda",
    joinNowTitle: "Enter e-booth",
    team: "team",
    chatWith: "Chat with ",
    chatHint: "Shift + Enter for line break, Enter to send message",
    chatPlaceholder: "Please enter your question here",
    areYouSure: `Please confirm that you want to`,
    request: 'request',
    businessCard: 'business card',
    yes: "Yes",
    no: "No",
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information.<br>If ${p1} will confirm it you will receive ${p1}'s contact information`
    },
    newContactReq: 'New business card request',
    newContactReqNote: (name, company, role) => {
        return `${name} ${role} at ${company} is requesting your business card.<br>If you agree sharing your contact information click "Yes" unless click "No"`
    },
    userConfirmedSharingInfo: ({name, role, company}) => {
        return `${name} ${role} at ${company} shared business card with you`
    },
    print: "Print",
    save: "Save",
    actionsWithBusCard: 'Click save to send card to your email or print to see it now',
    reply: "Reply",
    loginWithTicket: "Login with your ticket and password provided in email",
    email: "Email",
    emailPlaceholder: "Please enter your email",
    passwordPlaceholderFromEmail: "Please enter password from email",
    
    submit: "Submit",
    wrongPassTitle: "No account with such email and password",
    error: "Error",
    openChat: "Open Chat",
    closeChat: "Close Chat",
    vipChat: "VIP Chat",
    coffeeChat: "Coffee-break Chat",
    contactSupport: "If you have issues logging in or did not receive email with password, please contact support at",
    oops: "Oops",
    onlyForVIP: (component, forthem) => {
        return `We are appologizing, but <strong>${component}</strong> is available only for ${forthem} attenders.<br>Would you like to upgrade your ticket?`
    },
    upgradeFor: (component, forthem, forx) => {
        return `We are appologizing, but <strong>${component}</strong> is available only for ${forthem} attenders.<br>Would you like to upgrade your ticket for $${forx}.00`
    },
    findInEbooth: "Find me in e-BOOTH",
    findInSpeakers: "Find me in Conference Adenda",
    findInWorkshop: "Find me in Workshop Agenda",
    requestMyBusinessCard: "Request my business card",
    sheduleAprivateCall: "Sсhedule a private call with me",
    titleForLoginWithTempEmail: "Welcome!<br>Manager of your company or Friend purchased ticket for you.<br>Please, provide real contact information and sign in.",
    password: "Password",
    old: "Old ",
    new: "New ",
    systemGenerated: "System generated ",
    companyName: "Company Name",
    pleaseEnter: "Please enter your ",
    role: "Role",
    name: "Name",
    calendly: "Calendly",
    dontHave: (name) => { return `Dont have ${name}?` },
    optionalyProvide: (a) => { return `Optionaly you can provide ${a} for better business connections` },
    example: ", Example: ",
    openQrCode: "Open QR-code",
    businessCardSavedToEmail: "Amazing.<br>Business card was sent to your email!",
    vip: "VIP",
    business: "Buiness",
    basic: "Basic",
    willBeAtMay: `The conference has not started yet. Please come back after May 14th at ${new Date(startDate).toLocaleString().split(", ")[1]}`,
    followUsOnSocial: "Follow us on social media",
    chat: "Chat",
    upgradeToAccess: (x, y) => {
        return `Please upgrade your ticket to ${x} to access ${y}`
    },
    or: " or ",
    globalChat: "Global Chat",
    chooseTicketType: "Choose ticket type"
}