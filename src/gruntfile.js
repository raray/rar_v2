module.exports = function(grunt) {

  // All configuration goes here
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

  // Where we tell Grunt we plan to use this plug-in.
  require('load-grunt-tasks')(grunt);

  // Where we tell Grunt what to do when we type 'grunt' into the terminal.
  grunt.registerTask('default', ['watch']);
};
