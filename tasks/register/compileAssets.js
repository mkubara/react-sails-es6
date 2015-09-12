module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'babel:dev',
		'browserify:dev',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
