
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      main: {
        options: {
          sourcemap: 'auto',
          style: 'compressed'
        },
        files: {
          '../dist/css/raray.min.css': 'scss/raray.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        cascade: false
      },
      files: {
        src: '../dist/css/raray.min.css',
        dest: '../dist/css/raray.min.css'
      }
    },

    uglify : {
      main: {
        options: {
          sourceMap: true
        },
        files: {
          '../dist/js/preload.min.js' : [
            'js/typekit.js'
          ],
          '../dist/js/raray.min.js': [

            // libs
            'bower_components/jquery/dist/jquery.js',
            'bower_components/greensock/src/uncompressed/TweenMax.js',
            
            // site js 
            'js/breakpoints.js',
            'js/splode.js',
            'js/card.js',
            'js/init.js'
          ]
        }
      }
    },

    watch: {
      options: {
          livereload: true
      },
      styles: {
        files: [
          'scss/**/*.scss',
          'gruntfile.js'
        ],
        tasks: [
          'sass',
          'autoprefixer'
        ]
      },
      scripts: {
        files: [
          'js/**/*.js',
          'gruntfile.js'
        ],
        tasks: [
          'uglify'
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['watch']);
};
