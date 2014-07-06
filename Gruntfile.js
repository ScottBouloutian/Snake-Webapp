module.exports = function(grunt) {

  grunt.initConfig({
    simplemocha: {
      options: {
        reporter: 'nyan'
      },
      all: {
        src: 'test/*.spec.js'
      }
    },
    watch: {
      files: ['src/*', 'test/*'],
      tasks: ['simplemocha']
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Add a default task. This is optional, of course :)
  grunt.registerTask('default', 'simplemocha');

}
