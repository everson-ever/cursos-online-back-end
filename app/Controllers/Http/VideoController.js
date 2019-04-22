'use strict'

const Helpers = use('Helpers')
const Course = use('App/Models/Course')
const Video = use('App/Models/Video')
const Drive = use('Drive')

class VideoController {


  async store ({ params, request }) {

    // const exists = await Drive.exists('PHP')
    // return exists;

    const course = await Course.findOrFail(params.id)


    // Regras para um arquivo
    const videos = request.file('files', {
      types: ['video'],
      size: '700mb',
      extnames: ['mp4', 'MP4']
    })

   //Contando a quantidade de vídeos que veio para fazer upload, essa quantidade será acrescida no curso
   //associado
   const videosUpload = videos._files.length;




   //Movendo os arquivos para a pasta de destino
    await videos.moveAll(Helpers.tmpPath('uploads/courses/'+params.id), file => ({
      name: `${file.clientName}`

    }))

    if (!videos.movedAll()) {
      return videos.errors()
    }

    //Preparando o nome do arquivo


    await Promise.all(
      videos
        .movedList()
        .map(video => course.videos().create({ path: video.fileName, name:  video.fileName }))
    )

    //Atualizando a quantidade de vídeos do curso
    await Course
    .query()
    .where('id', params.id)
    .update({ qtd_videos: course.qtd_videos + videosUpload})

    await course.table
  }



  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/courses/${params.id}/${params.path}`))
  }




  // Muda o status do vídeo de 0 (não assistido) para 1 (assistido e vice-versa)
  async completed({ request, response }) {

    const id = request.only(['id_video']).id_video;
    const status = request.only(['status']).status;
    const course_id = request.only(['course_id']).course_id;

    await Video
    .query()
    .where('id', id)
    .update({ completed: status })



    // Atualizando a quantidade de cursos assistidos na tabela courses
    /*
    * Se o status do vídeo que veio do front for 1 é porque foi concluído
    * Se for 0 é porque estava concluído ( 1 ) e foi desmarcado para não concluído ( 0 )
    */

    const course = await Course.findOrFail(course_id);

    if (status == 1) {

      await Course
      .query()
      .where('id', course_id)
      .update({ complete_videos: course.complete_videos + 1 })

    }
    else if (status == 0) {

      await Course
      .query()
      .where('id', course_id)
      .update({ complete_videos: course.complete_videos - 1 })
    }

  }


  async getComments ({ params }) {

    const comments = await Video.findOrFail(params.id)
    await comments.load('comments')

    return comments
  }




}

module.exports = VideoController
