import Actions from './actions'
import Constants from './constants'

export default class ActionsLord {
    constructor(parent) {
        this.Actions   = new Actions(parent.$root)
        this.Constants = new Constants(parent.$root)

        Object.assign(this, this.Actions.methods)
        Object.assign(this, this.Constants)
    }
}