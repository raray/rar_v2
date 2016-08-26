
'use strict';

module.exports = function (grunt) {
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

    postcss: {
      main: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            }),
            require('cssnano')()
          ]
        },
        src: '../dist/css/raray.min.css'
      }
    },

    standard: {
      options:{
        format: true
      },
      app: {
        src: [
          'js/breakpoints.js',
          'js/card.js',
          'js/init.js',
          'js/splode.js'
        ]
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
            'js/init.js',
            'js/ga.js'
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
          'postcss'
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

  grunt.registerTask('default', ['sass', 'postcss', 'standard', 'uglify']);
};
