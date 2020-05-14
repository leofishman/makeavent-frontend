const domain = 'meet.jit.si';
import toolbar_buttons_basedOnType from './jitsi/toolbar_buttons_basedOnType'
import {startDate} from '@/env'

export default class JitsiModal {
  constructor ({ vueapp, data }) {
    this.name = data.name
    this.webinarId = data.webinarId
    this.parentNode = data.parentNode
    this.username = vueapp.$root.profile.name
    this.type = vueapp.$root.profile._id == data.speakerId ? "speaker" : vueapp.$root.usertype

    if (vueapp.$root.usertype == "basic") {
      vueapp.$root.showMessageToUpgradeBusOrVip(`During the main conference <b>${new Date(startDate).toLocaleString()}</b> you won't have access to microphone, video or raise hand in webinars. If you want to keep that feature please <b style="color:#9D6DBE">Upgrade</b> your ticket to Business or Vip`)
    }

    this.webinarType = ""

    if (this.name.includes('stage'))
      this.webinarType = this.name
    
    else if (this.name.includes('sponsorbooth'))
      this.webinarType = 'sponsorbooth'

    else if (this.name == 'demoday')
      this.webinarType = "demoday"

    else if (this.name.includes("interview"))
      this.webinarType = "interview"

    else if (this.name.includes('meetup'))
      this.webinarType = "meetup"

    vueapp.$root.getUser().then(
      this.connect()
    )
  }
  connect () {
    const options = {
      roomName: this.webinarId,
      width: "100%",
      height: 500,
      parentNode: this.parentNode,
      interfaceConfigOverwrite: {
        DEFAULT_BACKGROUND: '#474747',
        DISABLE_VIDEO_BACKGROUND: false,
  
        INITIAL_TOOLBAR_TIMEOUT: 5000,
        TOOLBAR_TIMEOUT: 4000,
        TOOLBAR_ALWAYS_VISIBLE: false,
        DEFAULT_REMOTE_DISPLAY_NAME: this.username,
        SHOW_JITSI_WATERMARK: false,
        JITSI_WATERMARK_LINK: 'https://jitsi.org',
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: '',
        SHOW_POWERED_BY: false,
        SHOW_DEEP_LINKING_IMAGE: false,
        GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
        DISPLAY_WELCOME_PAGE_CONTENT: true,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        APP_NAME: 'Blockconf Digital',
        NATIVE_APP_NAME: 'Block Digital',
        PROVIDER_NAME: 'Blockconf',
        LANG_DETECTION: true,
        INVITATION_POWERED_BY: true,
        AUTHENTICATION_ENABLE: true,

        TOOLBAR_BUTTONS: toolbar_buttons_basedOnType[this.webinarType][this.type],
  
        SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
        VIDEO_LAYOUT_FIT: 'both',
        filmStripOnly: false,
        VERTICAL_FILMSTRIP: true,
        CLOSE_PAGE_GUEST_HINT: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        RANDOM_AVATAR_URL_PREFIX: false,
        RANDOM_AVATAR_URL_SUFFIX: false,
        FILM_STRIP_MAX_HEIGHT: 120,
        ENABLE_FEEDBACK_ANIMATION: false,
        DISABLE_FOCUS_INDICATOR: false,
        DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
        DISABLE_TRANSCRIPTION_SUBTITLES: false,
        DISABLE_RINGING: false,
        AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
        AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',
        POLICY_LOGO: null,
        LOCAL_THUMBNAIL_RATIO: 16 / 9,
        REMOTE_THUMBNAIL_RATIO: 1,
        LIVE_STREAMING_HELP_LINK: 'https://jitsi.org/live',
        MOBILE_APP_PROMO: true,
        MAXIMUM_ZOOMING_COEFFICIENT: 1.3,
        SUPPORT_URL: 'https://community.jitsi.org/',
        CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
        CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
        CONNECTION_INDICATOR_DISABLED: true,
        VIDEO_QUALITY_LABEL_DISABLED: false,
        RECENT_LIST_ENABLED: true,
        OPTIMAL_BROWSERS: [ 'chrome', 'chromium', 'firefox', 'nwjs', 'electron' ],
        UNSUPPORTED_BROWSERS: [],
        AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
        DISABLE_PRESENCE_STATUS: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        SHOW_CHROME_EXTENSION_BANNER: false,
        HIDE_KICK_BUTTON_FOR_GUESTS: true,
      },
      configOverwrite: {
        hosts: {
          domain: 'meet.jit.si',  
          muc: 'conference.meet.jit.si'
        },
  
        bosh: '//meet.jit.si/http-bind',
        websocket: 'wss://meet.jit.si/xmpp-websocket',
  
        clientNode: 'http://jitsi.org/jitsimeet',  
        testing: {
          enableFirefoxSimulcast: false,
          p2pTestMode: false
        },
        enableNoAudioDetection: true,
        enableNoisyMicDetection: true,

        useNicks: false,
  
        // Start the conference in audio only mode (no video is being received nor
        // sent).
        // startAudioOnly: false,
  
        
        // Video
        // },
        
        // Every participant after the Nth will start audio muted.
        startAudioMuted: 0,
        // Every participant after the Nth will start video muted.
        startVideoMuted: 0,
  
        // Start calls with video muted. Unlike the option above, this one is only
        // applied locally. FIXME: having these 2 options is confusing.
        // startWithVideoMuted: false,
        desktopSharingChromeExtId: null,
        desktopSharingChromeSources: [ 'screen', 'window', 'tab' ],
        desktopSharingChromeMinExtVersion: '0.1',
    
        // Recording
  
        // Whether to enable file recording or not.
        // fileRecordingsEnabled: false,
        // Enable the dropbox integration.
        // dropbox: {
        //     appKey: '<APP_KEY>' // Specify your app key here.
        //     // A URL to redirect the user to, after authenticating
        //     // by default uses:
        //     // 'https://meet.jit.si/static/oauth.html'
        //     redirectURI:
        //          'https://meet.jit.si/subfolder/static/oauth.html'
        // },
        // When integrations like dropbox are enabled only that will be shown,
        // by enabling fileRecordingsServiceEnabled, we show both the integrations
        // and the generic recording service (its configuration and storage type
        // depends on jibri configuration)
        // fileRecordingsServiceEnabled: false,
        // Whether to show the possibility to share file recording with other people
        // (e.g. meeting participants), based on the actual implementation
        // on the backend.
        // fileRecordingsServiceSharingEnabled: false,
  
        // Whether to enable live streaming or not.
        // liveStreamingEnabled: false,
  
        // Transcription (in interface_config,
        // subtitles and buttons can be configured)
        // transcribingEnabled: false,
  
        // Enables automatic turning on captions when recording is started
        // autoCaptionOnRecord: false,
  
        // Misc
  
        // Default value for the channel "last N" attribute. -1 for unlimited.
        channelLastN: -1,
        requireDisplayName: false,
        enableWelcomePage: true,
  
        // Enabling the close page will ignore the welcome page redirection when
        // a call is hangup.
        // enableClosePage: false,
  
        // Disable hiding of remote thumbnails when in a 1-on-1 conference call.
        // disable1On1Mode: false,
  
        defaultLanguage: this.language,
  
        // If true all users without a token will be considered guests and all users
        // with token will be considered non-guests. Only guests will be allowed to
        // edit their profile.
        enableUserRolesBasedOnToken: false,
  
        // Whether or not some features are checked based on token.
        // enableFeaturesBasedOnToken: false,
  
        // Enable lock room for all moderators, even when userRolesBasedOnToken is enabled and participants are guests.
        // lockRoomGuestEnabled: false,
  
        // When enabled the password used for locking a room is restricted to up to the number of digits specified
        // roomPasswordNumberOfDigits: 10,
        // default: roomPasswordNumberOfDigits: false,
  
        // Message to show the users. Example: 'The service will be down for
        // maintenance at 01:00 AM GMT,
        // noticeMessage: '',
  
        // Enables calendar integration, depends on googleApiApplicationClientID
        // and microsoftApiApplicationClientID
        // enableCalendarIntegration: false,
  
        // Stats
        //
  
        // Whether to enable stats collection or not in the TraceablePeerConnection.
        // This can be useful for debugging purposes (post-processing/analysis of
        // the webrtc stats) as it is done in the jitsi-meet-torture bandwidth
        // estimation tests.
        // gatherStats: false,
  
        // The interval at which PeerConnection.getStats() is called. Defaults to 10000
        // pcStatsInterval: 10000,
  
        // To enable sending statistics to callstats.io you must provide the
        // Application ID and Secret.
        // callStatsID: '',
        // callStatsSecret: '',
  
        // enables sending participants display name to callstats
        // enableDisplayNameInStats: false,
  
        // enables sending participants email if available to callstats and other analytics
        // enableEmailInStats: false,
  
        // Privacy
        //
  
        // If third party requests are disabled, no other server will be contacted.
        // This means avatars will be locally generated and callstats integration
        // will not function.
        // disableThirdPartyRequests: false,
  
  
        // Peer-To-Peer mode: used (if enabled) when there are just 2 participants.
        //
  
        p2p: {
            enabled: true,
  
            // Use XEP-0215 to fetch STUN and TURN servers.
            // useStunTurn: true,
  
            // The STUN servers that will be used in the peer to peer connections
            stunServers: [
                // { urls: 'stun:meet.jit.si:4446' },
                { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
            ],
  
            // Sets the ICE transport policy for the p2p connection. At the time
            // of this writing the list of possible values are 'all' and 'relay',
            // but that is subject to change in the future. The enum is defined in
            // the WebRTC standard:
            // https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum.
            // If not set, the effective value is 'all'.
            // iceTransportPolicy: 'all',
  
            // If set to true, it will prefer to use H.264 for P2P calls (if H.264
            // is supported).
            preferH264: true
  
            // If set to true, disable H.264 video codec by stripping it out of the
            // SDP.
            // disableH264: false,
  
            // How long we're going to wait, before going back to P2P after the 3rd
            // participant has left the conference (to filter out page reload).
            // backToP2PDelay: 5
        },
  
        analytics: {
            // The Google Analytics Tracking ID:
            // googleAnalyticsTrackingId: 'your-tracking-id-UA-123456-1'
  
            // The Amplitude APP Key:
            // amplitudeAPPKey: '<APP_KEY>'
  
            // Array of script URLs to load as lib-jitsi-meet "analytics handlers".
            // scriptURLs: [
            //      "libs/analytics-ga.min.js", // google-analytics
            //      "https://example.com/my-custom-analytics.js"
            // ],
        },
  
        // Information about the jitsi-meet instance we are connecting to, including
        // the user region as seen by the server.
        deploymentInfo: {
            // shard: "shard1",
            // region: "europe",
            // userRegion: "asia"
        },
  
        // Decides whether the start/stop recording audio notifications should play on record.
        // disableRecordAudioNotification: false,
  
        // Information for the chrome extension banner
        // chromeExtensionBanner: {
        //     // The chrome extension to be installed address
        //     url: 'https://chrome.google.com/webstore/detail/jitsi-meetings/kglhbbefdnlheedjiejgomgmfplipfeb',
  
        //     // Extensions info which allows checking if they are installed or not
        //     chromeExtensionsInfo: [
        //         {
        //             id: 'kglhbbefdnlheedjiejgomgmfplipfeb',
        //             path: 'jitsi-logo-48x48.png'
        //         }
        //     ]
        // },
  
        // Local Recording
        //
  
        // localRecording: {
        // Enables local recording.
        // Additionally, 'localrecording' (all lowercase) needs to be added to
        // TOOLBAR_BUTTONS in interface_config.js for the Local Recording
        // button to show up on the toolbar.
        //
        //     enabled: true,
        //
  
        // The recording format, can be one of 'ogg', 'flac' or 'wav'.
        //     format: 'flac'
        //
  
        // },
  
        // Options related to end-to-end (participant to participant) ping.
        // e2eping: {
        //   // The interval in milliseconds at which pings will be sent.
        //   // Defaults to 10000, set to <= 0 to disable.
        //   pingInterval: 10000,
        //
        //   // The interval in milliseconds at which analytics events
        //   // with the measured RTT will be sent. Defaults to 60000, set
        //   // to <= 0 to disable.
        //   analyticsInterval: 60000,
        //   },
  
        // If set, will attempt to use the provided video input device label when
        // triggering a screenshare, instead of proceeding through the normal flow
        // for obtaining a desktop stream.
        // NOTE: This option is experimental and is currently intended for internal
        // use only.
        // _desktopSharingSourceDevice: 'sample-id-or-label',
  
        // If true, any checks to handoff to another application will be prevented
        // and instead the app will continue to display in the current browser.
        // disableDeepLinking: false,
  
        // A property to disable the right click context menu for localVideo
        // the menu has option to flip the locally seen video for local presentations
        // disableLocalVideoFlip: false,
  
        // Deployment specific URLs.
        // deploymentUrls: {
        //    // If specified a 'Help' button will be displayed in the overflow menu with a link to the specified URL for
        //    // user documentation.
        //    userDocumentationURL: 'https://docs.example.com/video-meetings.html',
        //    // If specified a 'Download our apps' button will be displayed in the overflow menu with a link
        //    // to the specified URL for an app download page.
        //    downloadAppsUrl: 'https://docs.example.com/our-apps.html'
        // },
  
        // Options related to the remote participant menu.
        // remoteVideoMenu: {
        //     // If set to true the 'Kick out' button will be disabled.
        //     disableKick: true
        // },
  
        // If set to true all muting operations of remote participants will be disabled.
        // disableRemoteMute: true,
  
        // List of undocumented settings used in jitsi-meet
        /**
         _immediateReloadThreshold
        autoRecord
        autoRecordToken
        debug
        debugAudioLevels
        deploymentInfo
        dialInConfCodeUrl
        dialInNumbersUrl
        dialOutAuthUrl
        dialOutCodesUrl
        disableRemoteControl
        displayJids
        etherpad_base
        externalConnectUrl
        firefox_fake_device
        googleApiApplicationClientID
        iAmRecorder
        iAmSipGateway
        microsoftApiApplicationClientID
        peopleSearchQueryTypes
        peopleSearchUrl
        requireDisplayName
        tokenAuthUrl
        */
  
        // List of undocumented settings used in lib-jitsi-meet
        /**
         _peerConnStatusOutOfLastNTimeout
        _peerConnStatusRtcMuteTimeout
        abTesting
        avgRtpStatsN
        callStatsConfIDNamespace
        callStatsCustomScriptUrl
        desktopSharingSources
        disableAEC
        disableAGC
        disableAP
        disableHPF
        disableNS
        enableLipSync
        enableTalkWhileMuted
        forceJVB121Ratio
        hiddenDomain
        ignoreStartMuted
        nick
        startBitrate
        */
  
  
        // Allow all above example options to include a trailing comma and
        // prevent fear when commenting out the last value.
        makeJsonParserHappy: 'even if last key had a trailing comma',
    }
    };
    this.jitsiWebinar = new JitsiMeetExternalAPI(domain, options);

    this.jitsiWebinar.addEventListener('participantJoined', (e) => {
      console.log(e)
    })
  }
}
