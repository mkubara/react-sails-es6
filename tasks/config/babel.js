module.exports = function(grunt) {
  grunt.config.set('babel', {
	   dev: {
       src: ['assets/scripts/app.js'],
       dest: 'assets/scripts/bundle.js'
		}
	});

	grunt.loadNpmTasks('grunt-babel');
};
