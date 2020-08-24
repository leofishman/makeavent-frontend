export default {
    adminSidebar: {
        items: {
            title: 'Options',
            design: {
                title: 'Design',
                button: 'Change Background',
                colors: {
                    primary: 'Primary',
                    dark: 'Dark',
                    light: 'Light',
                },
                switchers: {
                   off: 'Off',
                   active: 'Active',
                   light: 'Light Mode',
                   dark: 'Dark Mode'
                }
            },
            information: {
                title: 'Information',
                buttons: {
                    meetup: 'Edit Meetup Info',
                    company: 'Edit Company Info',
                    documents: 'Edit Documents'
                }
            },
            share: {
                title: 'Share',
                buttons: {
                    clipboard: 'Copy link to Clipboard',
                    invitations: 'Send Email Invitations',
                }
            },
            shortcuts: {
                title: 'Shortcuts',
                buttons: {
                    o_backst: 'Show Backstage Window',
                    h_backst: 'Hide Backstage Window',
                    o_recording: 'Start Recording',
                    h_recording: 'Stop Recording',
                    o_streaming: 'Start Streaming',
                    h_streaming: 'Stop Recording',
                    manage: 'Manage Backstage'
                }
            },
            speakers: {
                title: 'Speakers',
                buttons: {
                    manage: 'Manage Backstage',
                    add: 'Add Speaker',
                }
            },
            streaming: {
                title: 'Streaming',
                buttons: {
                    start: 'Start Streaming',
                    stop: 'Stop Streaming',
                    add: 'Add New Source',
                }
            },
            transmition: {
                title: 'Transmition',
                labels: {
                    meetup: 'Meetup Room',
                    networking: 'Networking Room',
                    time: 'Schedule Opening Time'
                },
                placeholders: {
                    close: 'Close',
                    time: 'Select'
                }
            },
        }
    }
}