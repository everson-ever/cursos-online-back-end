'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Course extends Model {

  videos() {
    return this.hasMany('App/Models/Video')
  }

  // moreVideos(id) {
  //    Database
  //     .table('courses')
  //     .where('id', id)
  //     .update({qtd_videos: 1})
  // }
}

module.exports = Course
