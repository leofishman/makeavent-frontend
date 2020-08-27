import {api, communitySrv} from '@/env'

export const AUTH = {
    LOGIN: api + '/login'
}

export const MEETUP = {
    getById: communitySrv + '/meetup/get',
    getSpeakers: communitySrv + '/meetup/get-speakers',
    getCustomCss: communitySrv + '/meetup/get-custom-css',
    getMeetupAttendees: communitySrv + '/meetup/get-members',
    getMeetupRooms: communitySrv + '/meetup/get-rooms',
    addMeetupRoom: communitySrv + '/meetup/add-room',
    joinMeetupRoom: communitySrv + '/meetup/join-room',
    leaveMeetupRoom: communitySrv + '/meetup/leave-room',
    toggleNetworkingRoom: communitySrv + '/meetup/toggle-networking-room',
    toggleWebinarStatus: communitySrv + '/meetup/toggle-webinar-status',
    getMeetupBackstage: communitySrv + '/meetup/get-backstage',
    getMeetupFrontstage: communitySrv + '/meetup/get-mainstage',
    sendToBackstage: communitySrv + '/meetup/send-to-backstage',
    sendToMainstage: communitySrv + '/meetup/send-to-mainstage',
    removeSpeakerFromMeetup: communitySrv + '/meetup/delete-from-meetup'
}