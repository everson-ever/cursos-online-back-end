'use strict'

const Helpers = use('Helpers')
const Course = use('App/Models/Course')
const Video = use('App/Models/Video');

class VideoController {


  async store ({ params, request }) {

    const course = await Course.findOrFail(params.id)



    const videos = request.file('files', {
      types: ['video'],
      size: '700mb',
      extnames: ['mp4', 'MP4']
    })


   const videosUpload = videos._files.length;

    await videos.moveAll(Helpers.tmpPath('uploads'), file => ({
      // name: `${Date.now()}-${file.clientName}`
      name: `${file.clientName}`

    }))

    if (!videos.movedAll()) {
      return videos.errors()
    }

    await Promise.all(
      videos
        .movedList()
        .map(video => course.videos().create({ path: video.fileName }))
    )


    await Course
    .query()
    .where('id', params.id)
    .update({ qtd_videos: course.qtd_videos + videosUpload})

    await course.table
  }

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async completed({ request, response }) {

    const id = request.only(['id_video']).id_video;
    const status = request.only(['status']).status;
    // console.log(id);
    // return true;
    await Video
    .query()
    .where('id', id)
    .update({ completed: status })
  }




}

module.exports = VideoController
