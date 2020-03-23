export default {
    noAccessTitle:`We are apologizing but You don't have access`,
    sorryAttender: `Sorry our dear attender.`,
    reasonWhyNoAccess: `It seems like you are trying to open conferense in many tabs.<br> We restricted opening many tabs of conference hall for security reasons.<br> Sorry for any inconvinice.`,
    buyTicket: "Buy ticket",
    home: "Home",
    comebackSoon: "Page will be available when conference starts",
    pageWillBeLater: "Please come back later",
    agenda: "Agenda",
    joinNowTitle: "Enter e-booth",
    team: "team",
    chatWith: "Chat with",
    chatHint: "Shift + Enter for line break, Enter to send message",
    chatPlaceholder: "Please enter your question here",
    areYouSure: `Please confirm that you want to`,
    request: 'request',
    businessCard: 'business card',
    yes: "Yes",
    no: "No",
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information. If ${p1} will confirm it you will receive ${p1}'s contact information`
    },
    newContactReq: 'New business card request',
    newContactReqNote: (name, company, role) => {
        return `${name} ${role} at ${company} is requesting your business card. If you agree sharing your contact information click "Yes" unless click "No"`
    },
    userConfirmedSharingInfo: ({name, role, company}) => {
        return `${name} ${role} at ${company} shared business card with you`
    },
    print: "Print",
    save: "Save",
    actionsWithBusCard: 'You can save business card, print it, or access later at any time',
    reply: "Reply",
    loginWithTicket: "Login with your ticket",
    email: "Email",
    emailPlaceholder: "Please enter your email",
    passwordPlaceholder: "Please enter password from email",
    submit: "Submit",
    wrongPassTitle: "No account with such email and password",
    error: "Error",
    openChat: "Open Chat",
    closeChat: "Close Chat",
    vipChat: "VIP Chat",
    coffeeChat: "Coffee-break Chat"
}