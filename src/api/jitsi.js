const domain = 'webinar.blockconf.digital';

module.exports = {
    lala () {
        const options = {
          roomName: 'lala',
          width: 700,
          height: 700,
          parentNode: document.querySelector('#meet'),
          interfaceConfigOverwrite: {
            DEFAULT_BACKGROUND: '#474747',
            DISABLE_VIDEO_BACKGROUND: false,
      
            INITIAL_TOOLBAR_TIMEOUT: 20000,
            TOOLBAR_TIMEOUT: 4000,
            TOOLBAR_ALWAYS_VISIBLE: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Jitster',
            DEFAULT_LOCAL_DISPLAY_NAME: 'me',
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
            // TOOLBAR_BUTTONS: [
            //   'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            //   'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
            //   'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            //   'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            //   'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            // ],
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            ],
      
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
            SHOW_CHROME_EXTENSION_BANNER: false
      
            /**
             * When enabled, the kick participant button will not be presented for users without a JWT
             */
            // HIDE_KICK_BUTTON_FOR_GUESTS: false
      
            /**
             * How many columns the tile view can expand to. The respected range is
             * between 1 and 5.
             */
            // TILE_VIEW_MAX_COLUMNS: 5,
      
            /**
             * Specify custom URL for downloading android mobile app.
             */
            // MOBILE_DOWNLOAD_LINK_ANDROID: 'https://play.google.com/store/apps/details?id=org.jitsi.meet',
      
            /**
             * Specify URL for downloading ios mobile app.
             */
            // MOBILE_DOWNLOAD_LINK_IOS: 'https://itunes.apple.com/us/app/jitsi-meet/id1165103905',
      
            /**
             * Specify mobile app scheme for opening the app from the mobile browser.
             */
            // APP_SCHEME: 'org.jitsi.meet',
      
            /**
             * Specify the Android app package name.
             */
            // ANDROID_APP_PACKAGE: 'org.jitsi.meet',
      
            /**
             * Override the behavior of some notifications to remain displayed until
             * explicitly dismissed through a user action. The value is how long, in
             * milliseconds, those notifications should remain displayed.
             */
            // ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 15000,
      
            // List of undocumented settings
            /**
             INDICATOR_FONT_SIZES
            MOBILE_DYNAMIC_LINK
            PHONE_NUMBER_REGEX
            */
          },
          configOverwrite: {
            hosts: {
              domain: 'webinar.blockconf.digital',
      
              // When using authentication, domain for guest users.
              // anonymousdomain: 'guest.example.com',
      
              // Domain for authenticated users. Defaults to <domain>.
              // authdomain: 'webinar.blockconf.digital',
      
              // Jirecon recording component domain.
              // jirecon: 'jirecon.webinar.blockconf.digital',
      
              // Call control component (Jigasi).
              // call_control: 'callcontrol.webinar.blockconf.digital',
      
              // Focus component domain. Defaults to focus.<domain>.
              // focus: 'focus.webinar.blockconf.digital',
      
              muc: 'conference.webinar.blockconf.digital'
            },
      
            // BOSH URL. FIXME: use XEP-0156 to discover it.
            bosh: '//webinar.blockconf.digital/http-bind',
      
            // Websocket URL
            // websocket: 'wss://webinar.blockconf.digital/xmpp-websocket',
      
            // The name of client node advertised in XEP-0115 'c' stanza
            clientNode: 'http://jitsi.org/jitsimeet',
      
            // The real JID of focus participant - can be overridden here
            // focusUserJid: 'focus@auth.webinar.blockconf.digital',
      
      
            // Testing / experimental features.
            //
      
            testing: {
              // Enables experimental simulcast support on Firefox.
              enableFirefoxSimulcast: false,
      
              // P2P test mode disables automatic switching to P2P when there are 2
              // participants in the conference.
              p2pTestMode: false
      
              // Enables the test specific features consumed by jitsi-meet-torture
              // testMode: false
      
              // Disables the auto-play behavior of *all* newly created video element.
              // This is useful when the client runs on a host with limited resources.
              // noAutoPlayVideo: false
            },
      
            // Disables ICE/UDP by filtering out local and remote UDP candidates in
            // signalling.
            // webrtcIceUdpDisable: false,
      
            // Disables ICE/TCP by filtering out local and remote TCP candidates in
            // signalling.
            // webrtcIceTcpDisable: false,
      
      
            // Media
            //
      
            // Audio
      
            // Disable measuring of audio levels.
            // disableAudioLevels: false,
            // audioLevelsInterval: 200,
      
            // Enabling this will run the lib-jitsi-meet no audio detection module which
            // will notify the user if the current selected microphone has no audio
            // input and will suggest another valid device if one is present.
            enableNoAudioDetection: true,
      
            // Enabling this will run the lib-jitsi-meet noise detection module which will
            // notify the user if there is noise, other than voice, coming from the current
            // selected microphone. The purpose it to let the user know that the input could
            // be potentially unpleasant for other meeting participants.
            enableNoisyMicDetection: true,
      
            // Start the conference in audio only mode (no video is being received nor
            // sent).
            // startAudioOnly: false,
      
            // Every participant after the Nth will start audio muted.
            // startAudioMuted: 10,
      
            // Start calls with audio muted. Unlike the option above, this one is only
            // applied locally. FIXME: having these 2 options is confusing.
            // startWithAudioMuted: false,
      
            // Enabling it (with #params) will disable local audio output of remote
            // participants and to enable it back a reload is needed.
            // startSilent: false
      
            // Video
      
            // Sets the preferred resolution (height) for local video. Defaults to 720.
            // resolution: 720,
      
            // w3c spec-compliant video constraints to use for video capture. Currently
            // used by browsers that return true from lib-jitsi-meet's
            // util#browser#usesNewGumFlow. The constraints are independent from
            // this config's resolution value. Defaults to requesting an ideal
            // resolution of 720p.
            // constraints: {
            //     video: {
            //         height: {
            //             ideal: 720,
            //             max: 720,
            //             min: 240
            //         }
            //     }
            // },
      
            // Enable / disable simulcast support.
            // disableSimulcast: false,
      
            // Enable / disable layer suspension.  If enabled, endpoints whose HD
            // layers are not in use will be suspended (no longer sent) until they
            // are requested again.
            // enableLayerSuspension: false,
      
            // Every participant after the Nth will start video muted.
            // startVideoMuted: 10,
      
            // Start calls with video muted. Unlike the option above, this one is only
            // applied locally. FIXME: having these 2 options is confusing.
            // startWithVideoMuted: false,
      
            // If set to true, prefer to use the H.264 video codec (if supported).
            // Note that it's not recommended to do this because simulcast is not
            // supported when  using H.264. For 1-to-1 calls this setting is enabled by
            // default and can be toggled in the p2p section.
            // preferH264: true,
      
            // If set to true, disable H.264 video codec by stripping it out of the
            // SDP.
            // disableH264: false,
      
            // Desktop sharing
      
            // The ID of the jidesha extension for Chrome.
            desktopSharingChromeExtId: null,
      
            // Whether desktop sharing should be disabled on Chrome.
            // desktopSharingChromeDisabled: false,
      
            // The media sources to use when using screen sharing with the Chrome
            // extension.
            desktopSharingChromeSources: [ 'screen', 'window', 'tab' ],
      
            // Required version of Chrome extension
            desktopSharingChromeMinExtVersion: '0.1',
      
            // Whether desktop sharing should be disabled on Firefox.
            // desktopSharingFirefoxDisabled: false,
      
            // Optional desktop sharing frame rate options. Default value: min:5, max:5.
            // desktopSharingFrameRate: {
            //     min: 5,
            //     max: 5
            // },
      
            // Try to start calls with screen-sharing instead of camera video.
            // startScreenSharing: false,
      
            // Recording
      
            // Whether to enable file recording or not.
            // fileRecordingsEnabled: false,
            // Enable the dropbox integration.
            // dropbox: {
            //     appKey: '<APP_KEY>' // Specify your app key here.
            //     // A URL to redirect the user to, after authenticating
            //     // by default uses:
            //     // 'https://webinar.blockconf.digital/static/oauth.html'
            //     redirectURI:
            //          'https://webinar.blockconf.digital/subfolder/static/oauth.html'
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
      
            // Disables or enables RTX (RFC 4588) (defaults to false).
            // disableRtx: false,
      
            // Disables or enables TCC (the default is in Jicofo and set to true)
            // (draft-holmer-rmcat-transport-wide-cc-extensions-01). This setting
            // affects congestion control, it practically enables send-side bandwidth
            // estimations.
            // enableTcc: true,
      
            // Disables or enables REMB (the default is in Jicofo and set to false)
            // (draft-alvestrand-rmcat-remb-03). This setting affects congestion
            // control, it practically enables recv-side bandwidth estimations. When
            // both TCC and REMB are enabled, TCC takes precedence. When both are
            // disabled, then bandwidth estimations are disabled.
            // enableRemb: false,
      
            // Defines the minimum number of participants to start a call (the default
            // is set in Jicofo and set to 2).
            // minParticipants: 2,
      
            // Use XEP-0215 to fetch STUN and TURN servers.
            // useStunTurn: true,
      
            // Enable IPv6 support.
            // useIPv6: true,
      
            // Enables / disables a data communication channel with the Videobridge.
            // Values can be 'datachannel', 'websocket', true (treat it as
            // 'datachannel'), undefined (treat it as 'datachannel') and false (don't
            // open any channel).
            // openBridgeChannel: true,
      
      
            // UI
            //
      
            // Use display name as XMPP nickname.
            // useNicks: false,
      
            // Require users to always specify a display name.
            // requireDisplayName: true,
      
            // Whether to use a welcome page or not. In case it's false a random room
            // will be joined when no room is specified.
            enableWelcomePage: true,
      
            // Enabling the close page will ignore the welcome page redirection when
            // a call is hangup.
            // enableClosePage: false,
      
            // Disable hiding of remote thumbnails when in a 1-on-1 conference call.
            // disable1On1Mode: false,
      
            // Default language for the user interface.
            // defaultLanguage: 'en',
      
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
                // Enables peer to peer mode. When enabled the system will try to
                // establish a direct connection when there are exactly 2 participants
                // in the room. If that succeeds the conference will stop sending data
                // through the JVB and use the peer to peer connection instead. When a
                // 3rd participant joins the conference will be moved back to the JVB
                // connection.
                enabled: true,
      
                // Use XEP-0215 to fetch STUN and TURN servers.
                // useStunTurn: true,
      
                // The STUN servers that will be used in the peer to peer connections
                stunServers: [
      
                    // { urls: 'stun:webinar.blockconf.digital:4446' },
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
            makeJsonParserHappy: 'even if last key had a trailing comma'
      
            // no configuration value should follow this line.
        }
        };
        const api = new JitsiMeetExternalAPI(domain, options);
    }
}
