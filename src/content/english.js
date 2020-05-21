import {startDate, meetupDate} from '../env'

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
        email: "Business Email (optional)",
        emailValidation: "This email is invalid",
        linkedin: "Linkedin (optional)",
        facebook: "Facebook (optional)",
        telegram: "Telegram (optional)",
        photo: "Photo (optional)",
        urlValidation: "This url is invalid",
        submit: "Submit",
        skip: "Skip"
    },

    Meetup: {
        title: "e-Meetup",
        intro: `Welcome to BlockConf Digital Virtual Meetup with Kaspersky, RSK, Decred, and Dash.<br><br>
        We opened our virtual doors today to let you test BlockConf Digital and our virtual hall. We are constantly working to make our solution better. Our team will appreciate any feedback as in this way we will be able to deliver the best experience for you during the main event on <b>${new Date(startDate).toLocaleString()}</b>.<br><br>
        BlockConf Digital is powered by make.A.vent, a disruptive solution for the event industry.`,
    },
    Booth: {
        title: "lorem ipsum",
        joinNowTitle: "Join E-booth"
    },

    Profile: {
        mbc: "My Business Card",
        mi: "My Interviews"
    },

    Company: {
        joinNowTitle: "Enter e-booth",
        requestBC: "You can request our bussiness cards from the VIP e-meeting room"
    },

    Chat: {
        chatPlaceholder: "Please enter your question here",
    },

    Storycreate: {
        newStoryButton: "New story",
    },

    reminders: {
        0: "will start speaking in 10 minutes",
    },

    Privatecall: {
        reqPrivateCall: `Do you want to request private call?`,
        checkAvailability: "",
        selectDateAndTime: ""
    },

    BusinessCard: {
        reqBusCardConfirm: "Do you want to request business card?",
        newContactReqNote: (name, company, role) => {
            return `${name} ${role} at ${company} is requesting your business card`
        },
    },

    ResetPwd: {
        text: "Login with your email and the password that was sent to your email. If you can not find the email with your password",
        textFinish: "to resend. Make sure to check your SPAM folder!",
        clickHere: "Click Here"
    },

    ResetPwdPopup: {
        text: "Please provide email used for registration",
        reset: "Reset",
        emailSent: "Please check your inbox, we sent a link to reset password"
    },

    passwordNotSame: "Passwords are not same!",
    minLength: "Minimum password length is 6 symbols.",

    logout: "Logout",

    noAccessTitle: (to) => { return `We are apologizing but You don't have access to ${to}`},

    acceptLaterNote: (profile) => {
        return `<strong>You can accept it later in <a href="${profile}">profile.</a></strong>`
    },
    userConfirmedSharingInfo: ({name, role, company}) => {
        return `${name} ${role} at ${company} shared business card with you`
    },
    howToConfirmBusinessCardSharing: "Go to Profile -> My Business Cards -> Pending and click 'accept' to share business card.",
    
    buyTicket: (type) => {
        return `Buy ${type} ticket`
    },

    googleHint: "For the better experience our team recommends to use Google Chrome",
    home: "Home",
    comebackSoon: "Page will be available when conference starts",
    pageWillBeLater: "Please come back later",
    agenda: "Agenda",
    mediahall: "Media Hall",
    eMeetup: "E-Meetup",
    networkingBooth: "Networking Booth",
    
    team: "team",
    chatWith: "Chat with ",
    chatHint: "Shift + Enter for line break, Enter to send message",
    areYouSure: `Please confirm that you want to`,
    request: 'request',
    businessCard: 'business card',
    yes: "Yes",
    no: "No",
    
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information.`
    },
    
    print: "Print",
    save: "Save",
    actionsWithBusCard: 'Click save to send card to your email or print to see it now',
    reply: "Reply",    
    email: "Email",
    emailPlaceholder: "Please enter your email",
    passwordPlaceholderFromEmail: "Please enter password from email",
    
    submit: "Submit",
    wrongPassTitle: "No account with such email and password",
    error: "Error",
    openChat: "Open Chat",
    closeChat: "Close Chat",
    
    contactSupport: "If you have issues logging in or did not receive email with password, please contact support at",
    onlyForUsertype: (component, forthem) => {
        return `We are appologizing, but <strong>${component}</strong> is available only for ${forthem} attenders.<br><br>Would you like to upgrade your ticket?`
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
    passwordConfirmation: "Confirm Password",
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
    cards: "Cards",

    vip: "VIP",
    business: "Business",
    basic: "Basic",

    willBeAtMay: `Meetup will be on ${new Date(meetupDate).toString().split("2020")}<br>Main Conference starts on ${new Date(startDate).toString().split("2020")}`,
    // The conference has not started yet. Please come back 14th of May at ${}`,
    followUsOnSocial: "Follow us on social media",
    chat: "Chat with Us",
    upgradeToAccess: (x, y) => {
        return `Please upgrade your ticket to ${x} to access ${y}`
    },
    or: " or ",
    globalChat: "Global Chat",
    
    requestOfflineCopy: "Request recorded copy",
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
    backstage: `Backstage will be available ${new Date(startDate).toString().split("2020")}`,

    toprow: {
        infDesk: "Information Desk",
        stage1: "BEGINNERS STAGE",
        stage2: "ADVANCED STAGE",
        vipMeetingRoom: `VIP e-MEETING ROOM`,
        sponsored: "Sponsored by"
    },

    common: {
        Website: "Website",
        join: "Join",
        investor: 'Investor',
        alreadyConnected: "Connected",
        viewBc: "Open Business Card",
        notify: "Notify",
        reqbizcard: "Request Business Card",
        at: "at",
        today: "Today",
        connected: "Connected",
        pending: "Pending",
        close: "Close",
        success: "Success",
        itsYou: "It is you :)",
        ok: "Ok",
        oops: "Oops",
        vipChat: "VIP Chat",
        coffeeChat: "Coffee-break Chat",
        replyHint: 'Right mouse click to reply',
        webinarNotStarted: "Webinar not started yet",
        noAccount: "Don't have account? Register!",
        haveAccount: "Already have account? Login!"
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
        rbc: "Request my business card"
    },

    WebinarSponsors: {
        powered: "Powered by"
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
        webinarNotSet: "Preparing webinar...",
        oops: "Oops",
        explorer: "We love that you are an explorer"
    },

    ErrorMessages: {
        0: 'This will be available <b>25 of May</b>',
        1: 'We updating webinar host, sorry for the inconvinience',
        2: 'We appologies, but there is a error adding reminder for you.<br>Please contact <b>support@blockconf.digital</b>',
        3: 'We appologies, but <b>Startups Demo Day</b> available only for <b>Investors, Startups and Media Partners</b>',
        4: 'Please provide at least 1 social network or photo. This is necessary so that your business contacts can identify you',
        5: 'We appologies, but <b>Startups Demo Day Pitching e-Booth</b> is available only for <b>Investors</b>',
        6: 'We appologies, but we preparing Fund profile',
        7: 'We appologies, but this company is not a part of <b>BLOCKCONF.DIGITAL</b>. <br><br>We suggest requesting business card and asking for a company website.',
        8: 'No user with such email'
    },

    VipMeetingRoom: {
        itsyou: "It is you",
        rbc: "Request my bussiness card",
        spc: "Schedule a private call with me",
        findInEbooth: "Find me in e-booth",
    },

    OngoingWorkshops: {
        ongoingWorkshops: "Ongoing workshops",
        title: "Workshop Agenda"
    },

    Upgradeticket: {
        chooseTicketType: "Please choose ticket type",
        ticketType: "Ticket type"
    },

    Register: {
        title: "Please provide your registration details.<br><br>All the information will be included in your <b>business card</b>.<br>This business card is the <b>'request only'</b> and will be available only to people whose requests you confirmed.<br>BlockConf Digital <b>will not</b> use this information for any other purposes.",
        chooseTicketType: "Choose ticket type",
        reqFree: "Investor or Media?",
        linkedin: "Linkedin (optional)",
        facebook: "Facebook (optional)",
        telegram: "Telegram (optional)",
        photo: "Photo (optional)",
        free: "Free"   
    },

    Snackbars: {
        bcAccepted: (data) => {
            return `${data.name} ${data.role ? data.role + " at " + data.company : ''} accepted your business card request`
        }
    }
}