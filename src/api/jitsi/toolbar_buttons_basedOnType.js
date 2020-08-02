const stages = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'settings',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'fullscreen'
    ],
    business: [
        'fullscreen', 'raisehand', 'chat'
    ],
    vip: [
        'fullscreen', 'raisehand', 'chat'
    ],
    media: [
        'fullscreen', 'raisehand', 'chat'
    ],
    investor: [
        'fullscreen', 'raisehand', 'chat'
    ],
    startup: [
        'fullscreen', 'raisehand', 'chat'
    ]
}

const sponsorbooth = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'settings',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'fullscreen'
    ],
    business: [
        'fullscreen', 'raisehand', 'chat'
    ],
    vip: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ],
    media: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ],
    investor: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ],
    startup: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ]
}

const meetup = {
    speaker: [
        'mute-everyone', 'fullscreen', 'sharedvideo',
        'microphone', 'camera', 'desktop', 'tileview'
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'settings', 'recording',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    business: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    vip: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    media: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    investor: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    startup: [
        'fullscreen', 'raisehand', 'tileview'
    ]
}

const networkingroom = {
    speaker: [
        'fullscreen', 'microphone', 'camera', 'desktop', 'tileview', 'sharedvideo'
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'settings', 'recording',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    business: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    vip: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    media: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    investor: [
        'fullscreen', 'raisehand', 'tileview'
    ],
    startup: [
        'fullscreen', 'raisehand', 'tileview'
    ]
}

const demoday = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'settings',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'kick'
    ],
    business: [
        'kick'
    ],
    vip: [
        'kick'
    ],
    media: [
        'kick'
    ],
    investor: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ],
    startup: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ]
}

const interview = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    guest: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera',
    ],
    admin: [
        'mute-everyone', 'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'settings',
        'raisehand', 'videoquality', 'invite', 'stats', 'e2ee', 'security'
    ],
    basic: [
        'fullscreen'
    ],
    business: [
        'fullscreen'
    ],
    vip: [
        'fullscreen'
    ],
    media: [
        'fullscreen'
    ],
    investor: [
        'fullscreen'
    ],
    startup: [
        'fullscreen'
    ]
}

const privatecall = {

}


export default {
    stage1: stages,
    stage2: stages,
    sponsorbooth: sponsorbooth,
    demoday: demoday,
    interview: interview,
    privatecall: privatecall,
    meetup: meetup,
    networkingroom: networkingroom
}