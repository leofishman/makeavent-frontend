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
    mediahall: "Media Hall",
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
    ok: "Ok",
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information.`
    },
    reqBusCardConfirm: `Do you want to request business card?`,
    newContactReq: 'New business card request',
    newContactReqNote: (name, company, role) => {
        return `${name} ${role} at ${company} is requesting your business card`
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
    vipMeetingRoom: `VIP e-MEETING ROOM`,
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
    watchLiveInterview: "Watch<br>live<br>interview",
    conferenceAgenda: "Conference Agenda",
    
    requestOfflineCopy: "Request recorded copy",
    success: "Success",
    offlineMaterialSent: (name) => {
        return `Offline copy of ${name} lecture was sent to your email`
    },
    upcommingInterviews: "Upcomming interviews",
    nointerviewsScheduled: "There is no upcomming interviews",
    profile: "Profile",
    my: "My",
    page: "Page",
    interviews: "Interviews",
    upcomming: "Upcomming",
    past: "Past",
    failed: "Failed",
    connected: "Connected",
    pending: "Pending",
    accept: "Accept",

    common: {
        Website: "Website",
        join: "Join",
        investor: 'Investor',
        alreadyConnected: "Connected"
    },

    StartupsDemoDay: {
        ddpb: 'Demo Day Pitching Booth',
        investors: "Investors"
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
        findInEbooth: "Find me in e-BOOTH",
        findInSpeakers: "Find me in Conference Agenda",
        findInWorkshop: "Find me in Workshop Agenda",
        findInMediaPartner: "Find me in Media e-BOOTH",
        findInStartups: "Find me in Startup Demo Day"
    },

    OngoingWorkshops: {
        ongoingWorkshops: "Ongoing workshops",
        title: "Workshop Agenda"
    },

    ProfileComponent: {
        toChangePhoto: "Hover to change photo"
    }
}