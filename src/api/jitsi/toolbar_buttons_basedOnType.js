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

export default {
    stage1: stages,
    stage2: stages
}