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
    toggleNetworkingRoom: communitySrv + '/meetup/toggle-networking-room'
}