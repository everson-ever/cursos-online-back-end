'use strict'


const Model = use('Model')
const Helpers = use('Helpers')
const Env = use('Env')


class Video extends Model {

  // course() {
  //   return this.belongsTo('App/Models/Course');
  // }

  static get computed () {
    return ['url']
  }

  getUrl ({ path, course_id }) {
    //return `${Env.get('APP_URL')}/videos/courses/${course_id}/${path}`
    return `${Env.get('APP_URL')}/videos/courses/${course_id}/${path}`
  }

  comments() {
    return this.hasMany('App/Models/Comment')
  }

}

module.exports = Video
