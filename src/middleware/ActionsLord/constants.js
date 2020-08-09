export default class Constants {
    constructor (parent) {
        this.parent = parent

        this.GET_RESOURCES = (this.parent.project.type == 'meetup') ? false : true;
    }
}