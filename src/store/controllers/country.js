import Services from '../routes/country'

class Country {
    static async fetch(){
        const res = await Services.fetch()
        if(res){
            const locations = res.data.locations.map( item => {
                return  item.country;
            })            
            return locations
        }
        return false  
    }
}

export default Country