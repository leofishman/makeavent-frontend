import {startDate, meetupDate} from '../env'

export default {
    Agenda: {
        conferenceAgenda: "Conference Agenda",
    },

    Agendarow: {
        remind: "Remind",
        joinSpeach: "Join Speach"
    },

    Backstage: {
        hint: "If you have popup blocked, try clicking the link below",
        open: "Open Backstage"
    },

    JitsiStream: {
        willStartIn: "Meetup will start in "
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

    Rooms: {
        NetworkingRoom: "Networking Room",
        MeetupHall: "Meetup Hall"
    },

    Navbar: {
        backTo: (to) => { return `Back to ${to}` },
        settings: "Settings",
        networkingBooth: "Networking Booth",
        home: "Home",
        profile: "Profile",
        agenda: "Agenda",
        logout: "Logout",
        openChat: "Open Chat",
        closeChat: "Close Chat",
    },

    ActionsWithUsers: {
        title: "Request business card",
        note: "Add note to your business card request",
    },

    RegistrationHall: {
        title: "Registration Hall",
        intro: `Please fill in the information that you would like to include in your virtual business card. This business card is the 'request only' and will be available only to people whose requests you confirmed. ${window.capitalizeFirstLetter(process.env.VUE_APP_APP_NAME)} will not use this information for any other purposes.`,
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
    },
    Booth: {
        title: "lorem ipsum",
        joinNowTitle: "Join E-booth"
    },

    Profile: {
        mbc: "My Business Card",
        mi: "My Interviews",
        editProfile: "Edit Profile",
        setUrl: "Set URL",
    },

    Meetup: {
        joinNowTitle: "Enter e-booth",
		requestBC: "You can request our bussiness cards from the VIP e-meeting room",
		networkingRoom: "Networking Room",
		join: "Join",
		currentlyOnline: "Currently online",
		viewDemo: "▶ View Demo",
		demos: "Demo",
		viewMaterials: "View Materials",
        materials: "Materials",
        readMore: "Read more",
        showLess: "Show less"
    },

    DragableJitsi: {
        room: "Room",
        loading: "Connecting you to the room, please wait."
    },

	NetworkingRooms: {
        // intro: "You can create a new chat by clicking on a “Start Chat” button next to the person you want to talk to in the Attendees Section ( at the right side of the screen) or get in the mix by joining existing networking room.",
        intro: `You can create a new room by clicking on <b>Create new Room</b> button or get in the mix by joining existing networking room.`,
		newRoom: "Create new Room",
		attendeesList: "Attendees List",
		tips: "Tips",
		needTips: "Need some Tips?",
		needTipsShort: "Tips?",
		peopleOnline: "user online",
		atRoom: "At room",
		notInRoom: "Not in a room",
        requestBizcard: "Request Business Card",
        viewBusinessCard: "View Business Card",
        startChat: "Start a Chat",
        join: "Join",
        searchAttendee: "Search attendee",
        tip1: `This is the Networking room, grab a drink, turn on your camera and connect with other attendees! Remember that networking is always better if others can see your face. <strong> Don’t be shy, turn on your camera!</strong>`,
        tip2: `Below you can request business cards from the meetup attendees and join the video chat to have a live networking with the person from the list`,
        joinRoom: "Join Room",
        room: "Room",
        networkingRoom: "Networking Room"
    },

    MeetupAdminSidebar: {
        toggleNetworkingRoom: "Open Networking Room",
        networkingRoom: "Networking Room",
        isOpened: " is opened",
        isClosed: " is closed",
    },
    
    Member: {
        request: "Request Business Card",
        scheduleMeeting: "Schedule e-meeting"
    },

    Company: {
        joinNowTitle: "Enter e-booth",
        requestBC: "You can request our bussiness cards from the VIP e-meeting room"
    },

    Chat: {
        chatPlaceholder: "Please enter your question here",
        hint: "Shift + Enter for line break, Enter to send message",
        chatWith: "Chat with ",
        chatHint: `<b>- Shift + Enter</b> for line break<br>
            <b>- Enter</b> to send message.<br>
            <b>- Click</b> on chat member name to get Business Card`,
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
        clickHere: "<strong class='click'>Click here</strong> to reset pwd"
    },

    ResetPwdPopup: {
        text: "Please provide email used for registration",
        reset: "Reset",
        emailSent: "Please check your inbox, we sent a link to reset password"
    },

    Login: {
        hint: "For the better experience our team recommends to use Google Chrome"
    },

    passwordNotSame: "Passwords are not same!",
    minLength: "Minimum password length is 6 symbols.",

    noAccessTitle: (to) => { return `We are apologizing but You don't have access to ${to}`},

    acceptLaterNote: (profile) => {
        return `<strong>You can accept it later in <a href="${profile}">profile.</a></strong>`
    },
    userConfirmedSharingInfo: ({name, role, company}) => {
        return `${name} ${role} at ${company} shared business card with you`
    },
    howToConfirmBusinessCardSharing: `Go to Profile -> My Business Cards -> Pending and click 'accept' to share business card.`,
    
    buyTicket: (type) => {
        return `Buy ${type} ticket`
    },

    googleHint: "For the better experience our team recommends to use Google Chrome",

    comebackSoon: "Page will be available when conference starts",
    pageWillBeLater: "Please come back later",
    
    areYouSure: `Please confirm that you want to`,
    request: 'request',
    businessCard: 'business card',
    yes: "Yes",
    no: "No",
    
    requestContact: (p1) => {
        return `${p1} will receive notification that you requesting contact information.`
    },
    
    print: "Print",
    actionsWithBusCard: 'Click save to send card to your email or print to see it now',
    reply: "Reply",    
    email: "Email",
    emailPlaceholder: "Please enter your email",
    passwordPlaceholderFromEmail: "Please enter password from email",
    
    wrongPassTitle: "No account with such email and password",
    error: "Error",
    
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
    pleaseEnter: "Please enter your ",
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
        or: " or ",
        submit: "Submit",
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
        haveAccount: "Already have account? Login!",
        cancel: 'Cancel',
        save: "save",
        company: "Company",
        companyName: "Company Name",
        role: "Role",
        yourRole: "Your Role",
        pwd_place: "123456",
        team: "team",
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
        2: 'We appologies, but there is a error adding reminder for you.<br>Please contact <b>support@makeavent.com</b>',
        3: 'We appologies, but <b>Startups Demo Day</b> available only for <b>Investors, Startups and Media Partners</b>',
        4: 'Please provide at least 1 social network or photo. This is necessary so that your business contacts can identify you',
        5: 'We appologies, but <b>Startups Demo Day Pitching e-Booth</b> is available only for <b>Investors</b>',
        6: 'We appologies, but we preparing Fund profile',
        7: `We appologies, but this company is not a part of <b>${window.capitalizeFirstLetter(process.env.VUE_APP_APP_NAME)}</b>. <br><br>We suggest requesting business card and asking for a company website.`,
        8: 'No user with such email',
        9: 'We appologies, but meetup organizator has not opened <b>Networking Room</b> yet'
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
        title: `Please provide your registration details.<br><br>All the information will be included in your <b>business card</b>.<br>This business card is the <b>'request only'</b> and will be available only to people whose requests you confirmed.<br>${window.capitalizeFirstLetter(process.env.VUE_APP_APP_NAME)} <b>will not</b> use this information for any other purposes.`,
        chooseTicketType: "Choose ticket type",
        reqFree: "Investor or Media?",
        linkedin: "Linkedin (optional)",
        facebook: "Facebook (optional)",
        telegram: "Telegram (optional)",
        photo: "Photo (optional)",
        free: "Free",
        name_place: "Tom",
        pwd_place: "123456",
        email_place: "example.com",
    },

    Snackbars: {
        bcAccepted: (data) => {
            return `${data.name} ${data.role ? data.role + " at " + data.company : ''} accepted your business card request`
        }
    }
}