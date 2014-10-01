module.exports = (grunt) ->

  # Project configuration
  grunt.initConfig

    coffee:
      compile:
        options:
          join: true
        files: [
          'assets/javascripts/src/shared/shared.js': 'assets/javascripts/src/shared/*.coffee'
          'assets/javascripts/src/pages/pages.js': 'assets/javascripts/src/pages/*.coffee'
        ]

    concat:
      dist:
        src: [
          # Manual dependency ordering (put specific files first)
          'assets/javascripts/src/vendor/headroom.js'
          'assets/javascripts/src/vendor/google-map.js'
          'assets/javascripts/src/vendor/*.js'
          'assets/javascripts/src/shared/*.js'
          'assets/javascripts/src/pages/*.js'
        ]
        dest: 'assets/javascripts/majestic.min.js'

    uglify:
      dist:
        src: '<%= concat.dist.dest %>'
        dest: '<%= concat.dist.dest %>' # Stomp over the file

    jshint:
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        unused: true
        boss: true
        eqnull: true
        browser: true
        globals: {}

    autoprefixer:
      dist:
        options:
          browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        src: [
          'assets/stylesheets/majestic.min.css',
          'assets/stylesheets/admin.min.css'
        ]

    notify:
      sass:
        options:
          title: "Task Complete"
          message: "SASS finished compiling!"

    sass:
      dist:
        files: [
          'assets/stylesheets/majestic.min.css': 'assets/stylesheets/src/majestic.scss',
          'assets/stylesheets/admin.min.css': 'assets/stylesheets/src/admin.scss'
        ]
        options:
          style: 'compressed'
          quiet: true
          sourceMap: false
          includePaths: require('node-neat').includePaths

    watch:
      options:
        livereload: true
      stylesheets:
        files: ['assets/stylesheets/**/*.scss']
        tasks: ['sass', 'autoprefixer']
      coffeescripts:
        files: ['assets/javascripts/src/**/*.coffee']
        tasks: ['coffee', 'jshint', 'concat', 'uglify']
      javascripts:
        files: ['assets/javascripts/src/**/*.js']
        tasks: ['jshint', 'concat', 'uglify']

    svgmin:
      options:
        plugins: [
          { removeViewBox: false }
          { removeUselessStrokeAndFill: true }
          { cleanupIDs: false }
        ]
      dist:
        files:
          'assets/images/sprite.min.svg' : 'assets/images/sprite.svg'

    svgstore:
      options:
        formatting:
          indent_size: 2
      default:
        files:
          'assets/images/sprite.svg': 'assets/images/src/*.svg'


  # Load all Grunt tasks automatically
  require('load-grunt-tasks') grunt

  # Register tasks
  grunt.registerTask 'default', ['coffee', 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer']
  grunt.registerTask 'scripts', ['coffee', 'jshint', 'concat', 'uglify']
  grunt.registerTask 'styles', ['sass', 'autoprefixer']
  grunt.registerTask 'svg', ['svgstore', 'svgmin']

  return
