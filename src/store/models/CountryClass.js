/** Model definition file for the Movie Class **/

import store from '../index'

export default class Movie {
//   constructor (rawData = {}) {
//     this.id = rawData.id
//     this.title = rawData.title
//     this.poster_path = rawData.poster_path
//   }

  get fetch () {
    const countries = store.getters['country/countries']
  }
}
