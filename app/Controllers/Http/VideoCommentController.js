'use strict'


const Comment = use('App/Models/Comment')

class VideoCommentController {


  async store ({ request, response }) {

    const data = request.only([
      'title',
      'content'
    ]);

    const video_id = request.only([ 'video_id' ]).video_id



    //const video = await Video.findOrFail(video_id);

    const comment = await Comment.create({ ...data, video_id: video_id});

    return comment;
  }

}

module.exports = VideoCommentController
