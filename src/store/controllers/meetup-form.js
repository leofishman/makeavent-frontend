import Services from '../routes/meetup-form';

class MeetupForm {
    static async postAddMeetup(meetupObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Services.postAddMeetup(meetupObj)
                if(res){            
                    const unique = res.data.unique
                    resolve(unique)
                }
                resolve(false)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    static async getMeetupById(meetupIdObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Services.getById(meetupIdObj)
                if(res){
                    const meetup = res.data.meetup 
                    resolve(meetup)
                }
                resolve(false)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    static async getMeetupStreamingSources(meetupIdObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Services.getMeetupStreamingSources(meetupIdObj)
                if (res) {
                    resolve(res.data)
                }
                resolve(false)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    static async getStreamStats (meetupIdObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Services.getStreamStats(meetupIdObj)
                if (res) {
                    resolve(res.data)
                }
                resolve(false)
            }
            catch (e) {
                reject(e)
            }
        })
    }
}

export default MeetupForm