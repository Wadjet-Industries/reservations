module.exports = function (grunt) {
  grunt.initConfig({
    aws: grunt.file.readJSON('aws-keys.json'),

    compress: {
      main: {
        options: {
          mode: 'brotli',
        },
        expand: true,
        cwd: '.',
        src: './public/main.js',
        dest: './compress',
        ext: '.js.br',
      },
    },

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
      },
      dist: {
        options: {
          bucket: 'cf-simple-s3-origin-fec-reservations-983608125475',
          compressionTypes: {
            '.br': 'br',
          },
        },
        files: [
          {
            expand: true,
            cwd: '.',
            src: ['./compress/public/main.js.br'],
            dest: '/',
          },
        ],
      },
    },


  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('default', ['compress']);
  grunt.registerTask('deploy', 'aws_s3:dist');
};
