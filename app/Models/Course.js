'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {

  videos() {
    return this.hasMany('App/Models/Video')
  }
}

module.exports = Course
