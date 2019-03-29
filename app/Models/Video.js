'use strict'


const Model = use('Model')
const Env = use('Env')


class Video extends Model {

  // course() {
  //   return this.belongsTo('App/Models/Course');
  // }

  static get computed () {
    return ['url']
  }

  getUrl ({ path }) {
    return `${Env.get('APP_URL')}/videos/${path}`
  }

  // concluido() {
  //   this
  //   .query()
  //   .where('id', params.id)
  //   .update({ completed: 1})
  // }
}

module.exports = Video
