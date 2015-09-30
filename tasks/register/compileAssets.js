module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'browserify:dev',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
