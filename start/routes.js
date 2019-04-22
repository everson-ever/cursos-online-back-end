'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')


// Route.resource('categories', 'CategoryController')
//   .apiOnly()
//   .middleware('auth')


Route.get('/categories', 'CategoryController.index')
Route.get('/categories/:id', 'CategoryController.show')
Route.post('/categories', 'CategoryController.store')
Route.delete('/categories/:id', 'CategoryController.destroy').middleware('auth')

Route.get('/courses', 'CourseController.index')
Route.get('/courses/:id', 'CourseController.show')
Route.post('/courses', 'CourseController.store')
Route.delete('/courses/:id', 'CourseController.destroy').middleware('auth')

Route.post('courses/:id/videos', 'VideoController.store')
  // .middleware('auth')

//Route.get('/videos/:path', 'VideoController.show')
Route.get('/videos/courses/:id/:path', 'VideoController.show')
Route.post('/videos/completed', 'VideoController.completed')

Route.get('/videos/comments/:id', 'VideoController.getComments')


Route.post('/videos/comments', 'VideoCommentController.store')

