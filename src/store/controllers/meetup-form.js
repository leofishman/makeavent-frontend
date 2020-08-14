import Services from '../routes/meetup-form';

class MeetupForm {
    static async postAddMeetup(meetupObj){
        const res = await Services.postAddMeetup(meetupObj)
        if(res){            
            const unique = res.data.unique
            return unique 
        }
        return false  
    }

    static async getMeetupById(meetupIdObj){
        const res = await Services.getById(meetupIdObj)
        if(res){
            const meetup = res.data.meetup 
            return meetup
        }
        return false 
    }
}

export default MeetupForm