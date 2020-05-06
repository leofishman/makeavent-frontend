import {startDate} from '../env'

export default {
    Agenda: {
        conferenceAgenda: "Conference Agenda",
    },

    Agendarow: {
        remind: "Remind",
        joinSpeach: "Join Speach"
    },

    Mediahall: {
        title: "Media Hall",
        mp: "Media Partner",
        wli: "Watch Live Interview",
        ui: "Upcoming Interviews",
        nois: "There is no upcomming interviews",
        oi: "Ongoing Interviews",
        noupi: "There is no ongoing interviews"
    },

    RegistrationHall: {
        title: "Registration Hall",
        intro: "Please fill in the information that you would like to include in your virtual business card. This business card is the 'request only' and will be available only to people whose requests you confirmed. BlockConf Digital will not use this information for any other purposes.",
        email: "Email",
        emailValidation: "This email is invalid",
        linkedin: "Linkedin",
        facebook: "Facebook",
        telegram: "Telegram",
        urlValidation: "This url is invalid",
        photo: "Photo",
        submit: "Submit"
    },

    Mediapartnerbooth: {
        
    },

    Profile: {
        mbc: "My Business Card",
        mi: "My Interviews"
    },

    Company: {
        joinNowTitle: "Enter e-booth",
    },

    Chat: {
        chatPlaceholder: "Please enter your question here",
    },

    Storycreate: {
        newStoryButton: "New story",
    },

    Newstory: {
        modalTitle: "New Story",
        title: "New Story Title",
        promotionalContent: "Your Content",
        submit: "Submit"
    },

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
    mediahall: "Media Hall",
    
    team: "team",
    chatWith: "Chat with ",
    chatHint: "Shift + Enter for line break, Enter to send message",
    areYouSure: `Please confirm that you want to`,
    request: 'request',
    businessCard: 'business card',
    yes: "Yes",
    no: "No",
    ok: "Ok",
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information.`
    },
    reqBusCardConfirm: `Do you want to request business card?`,
    newContactReq: 'New business card request',
    newContactReqNote: (name, company, role) => {
        return `${name} ${role} at ${company} is requesting your business card`
    },
    acceptLaterNote: (profile) => {
        return `<strong>You can accept it later in <a href="${profile}">profile.</a></strong>`
    },
    userConfirmedSharingInfo: ({name, role, company}) => {
        return `${name} ${role} at ${company} shared business card with you`
    },
    howToConfirmBusinessCardSharing: `Go to Profile -> My Business Cards -> Pending and click "accept" to share business card.`,
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
    onlyForXWithoutUpgrade: (component, forthem) => {
        return `We are appologizing, but <strong>${component}</strong> is available only for ${forthem} attenders.`
    },
    upgradeFor: (component, forthem, forx) => {
        return `We are appologizing, but <strong>${component}</strong> is available only for ${forthem} attenders.<br>Would you like to upgrade your ticket for $${forx}.00`
    },
    requestMyBusinessCard: "Request my business card",
    sheduleAprivateCall: "Sсhedule a private call with me",
    titleForLoginWithTempEmail: "Welcome!<br>Please, reset password provided in email for the greater security",
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
    business: "Business",
    cards: "Cards",
    basic: "Basic",
    willBeAtMay: `The conference has not started yet. Please come back after May 25th at ${new Date(startDate).toString().split("2020")}`,
    followUsOnSocial: "Follow us on social media",
    chat: "Chat",
    upgradeToAccess: (x, y) => {
        return `Please upgrade your ticket to ${x} to access ${y}`
    },
    or: " or ",
    globalChat: "Global Chat",
    chooseTicketType: "Choose ticket type",
    
    requestOfflineCopy: "Request recorded copy",
    success: "Success",
    offlineMaterialSent: (name) => {
        return `Offline copy of ${name} lecture was sent to your email`
    },
    profile: "Profile",
    my: "My",
    page: "Page",
    interviews: "Interviews",
    upcomming: "Upcomming",
    past: "Past",
    failed: "Failed",
    accept: "Accept",

    toprow: {
        infDesk: "Information Desk",
        stage: "STAGE",
        vipMeetingRoom: `VIP e-MEETING ROOM`,
    },

    common: {
        Website: "Website",
        join: "Join",
        investor: 'Investor',
        alreadyConnected: "Connected",
        notify: "Notify",
        reqbizcard: "Request Business Card",
        at: "at",
        today: "Today",
        connected: "Connected",
        pending: "Pending",
    },

    StartupsDemoDay: {
        sddb: "Startups Demo Day Booth",
        ddpb: 'Demo Day Pitching Booth',
        investors: "Investors",
        joinPitching: "Join Pitching",
        ddChat: "Demo Day Chat",
        agenda: "Agenda",
        join: "Join",
        veb: "Visit E-booth",
        startup: "Startup"
    },

    Investors: {
        rem: "Request E-meeting",
    },

    MediaPartnerProfile: {
        watchLiveInterview: "Watch live interview"
    },

    InvestFundProfile: {
        watchLiveInterview: "Watch live interview"
    },

    OngoingInterviews: {
        goingInterviews: "Ongoing interviews",
        with: "with"
    },

    ErrorMessageModal: {
        webinarNotSet: "Preparing webinar..."
    },

    ErrorMessages: {
        1: 'We updating webinar host, sorry for the inconvinience'
    },

    VipMeetingRoom: {
        itsyou: "It is you",
        rbc: "Request my bussiness card",
        spc: "Schedule a private call whith me",
        findInEbooth: "Find me in e-booth",
    },

    OngoingWorkshops: {
        ongoingWorkshops: "Ongoing workshops",
        title: "Workshop Agenda"
    },
}