export default class Actions {
    constructor (parent) {
        this.parent = parent


        this.methods = {
            SHOW_MEETUP_SETTINGS_BUTTON () {
                if (this.parent.cloo(this.parent.$router.currentRoute.name,
                        'Meetup|NetworkingRoom') &&
                    this.parent.isUserAdmin)
                    return true
            },

            SHOW_BACK_TO_MEETUP_HALL () {
                if (
                    compare(this.parent.$router.currentRoute.name, 'NetworkingRoom') ||
                    (
                        this.parent.$router.history._startLocation.includes('/meetup?id=') &&
                        !compare(this.parent.$router.currentRoute.name, "Meetup")
                    ) 
                )
                    return true
            },

            DO_BACK_MEETUP_ADDNEDER () {
                if (compare(this.parent.$router.currentRoute.name, 'NetworkingRoom'))
                    this.parent.$router.push({
                        name: "Meetup",
                        query: {
                            id: this.parent.$router.currentRoute.query.id
                        }
                    })

                else {
                    this.parent.$router.push(this.parent.$router.history._startLocation)
                }
            },

            SHOULD_GET_MEETUP_ATTENDEES_ROOMS () {
                if ( compare(this.parent.$router.currentRoute.name, 'NetworkingRoom') ) {
                    return true
                }
                else
                    return false
            },

            SHOULD_GET_MEETUP () {
                if ( this.parent.cloo(this.parent.$router.currentRoute.name,
                    'Meetup|NetworkingRoom' ))
                        return true
                else
                    return false
            }
        }
    }
}