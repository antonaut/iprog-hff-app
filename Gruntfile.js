module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["js/**/*.js", "css/**/*.css", "index.html"],
      options: {
        livereload: true,
      }
    },
    connect: {
      target: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', function(target) {
    grunt.task.run(['connect', 'watch']);
  });

};