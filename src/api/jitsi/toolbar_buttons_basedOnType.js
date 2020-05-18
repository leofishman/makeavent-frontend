const stages = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
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
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
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
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
    ],
    basic: [
        'fullscreen', 'raisehand', 'chat',
    ],
    business: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    vip: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    media: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    investor: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    startup: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ]
}

const demoday = {
    speaker: [
        'mute-everyone', 'fullscreen', 'chat',
        'microphone', 'camera', 'desktop'
    ],
    admin: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
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

}

const privatecall = {

}

const networkingbooth = {
    speaker: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    admin: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
    ],
    basic: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    business: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    vip: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    media: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    investor: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ],
    startup: [
        'fullscreen', 'raisehand', 'chat', 'microphone', 'camera'
    ]
}

export default {
    stage1: stages,
    stage2: stages,
    sponsorbooth: sponsorbooth,
    demoday: demoday,
    interview: interview,
    privatecall: privatecall,
    meetup: meetup
}