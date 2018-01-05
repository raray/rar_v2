
'use strict'

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    minifyHtml: {
      main: {
        files: {
          '../dist/index.html': 'index.html',
          '../dist/google041f4df60d6bec8c.html': 'google-site-verify.html'
        }
      }
    },

    sass: {
      main: {
        options: {
          sourceMap: true,
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
      options: {
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

    uglify: {
      main: {
        options: {
          sourceMap: true
        },
        files: {
          '../dist/js/preload.min.js': [
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

    imagemin: {
      main: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '../dist/img/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: [
          '*.html'
        ],
        tasks: [
          'minifyHtml'
        ]
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
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['minifyHtml', 'sass', 'postcss', 'standard', 'uglify', 'imagemin'])
}
