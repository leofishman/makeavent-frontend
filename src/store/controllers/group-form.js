import Services from '../routes/group-form'

class GroupForm {
    static async getGroupByName(groupNameObj){
        const res = await Services.getGroupByName(groupNameObj)
        if(res){
            const group = res.data   
            return group
        }
        return false 
    }

    static async getCountries(){        
        const res = await Services.getCountries()
        if(res){
            const locations = res.data.locations.map( item => {
                return  item.country;
            })            
            return locations
        }
        return false  
    }

    static async getInterests(){
        const res = await Services.getInterests()
        if(res){
            const locations = res.data.interests.map(i => i.interest)
            return locations
        }
        return false
    }

    static async getSubInterests(interestObj){
        const res = await Services.getSubInterests(interestObj)
        if(res){
            const subinterests = res.data.subinterests.map( item => {
                return  item.subinterest;
            })
            return subinterests 
        }
        return false  
    }

    static async getGroupName(nameObj){
        const res = await Services.getGroupName(nameObj)
        if(res){            
            const unique = res.data.unique
            return unique 
        }
        return false  
    }
}

export default GroupForm