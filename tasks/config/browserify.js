module.exports = function(grunt) {
  grunt.config.set('browserify', {
	   dev: {
       src: ['assets/scripts/bundle.js'],
       dest: 'assets/js/bundle.js'
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
};
