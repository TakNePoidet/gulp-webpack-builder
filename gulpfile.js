'use strict';

global.$ = {
    task: [
		{name : 'html', 		path : './tasks/assets'},
		{name : 'files', 		path : './tasks/files'},
		{name : 'style:scss', 	path : './tasks/style_scss'},
		{name : 'style:css', 	path : './tasks/style_css'},
		{name : 'style:icon', 	path : './tasks/style_icon'},
		{name : 'images', 		path : './tasks/images'},
		{name : 'fonts', 		path : './tasks/fonts'},
		{name : 'watch', 		path : './tasks/watch'},
		{name : 'browser', 		path : './tasks/browser'},
		{name : 'clean', 		path : './tasks/clean'},
		{name : 'clearcache', 	path : './tasks/clearcache'},
		{name : 'deploy', 		path : './tasks/deploy'},
	],
	config: require('./config'),
    gulp: require('gulp'),
    del: require('del'),
    browserSync: require('browser-sync'),
    gp: require('gulp-load-plugins')({
		pattern: ['gulp-*',  'postcss-*', 'imagemin-*', 'vinyl-ftp'], // the glob(s) to search for
		scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
		replaceString: /^(gulp|postcss|imagemin)-/, // what to remove from the name of the module when adding it to the context
		camelize: true, // if true, transforms hyphenated plugins names to camel case
		lazy: true, // whether the plugins should be lazy loaded on demand
		maintainScope: true // toggles loading all npm scopes like non-scoped packages
	})
};


$.task.forEach(task => {
	$.gulp.task(task.name, callback => {
		let task_ = require(task.path).call(this);
		return task_(callback);
	});
});

$.gulp.task('style', $.gulp.parallel(
	'style:scss',
	'style:icon',
	'style:css'
));

$.gulp.task('dist', $.gulp.parallel(
	'html',
	'files',
	'style',
	'images',
	'fonts',
));
$.gulp.task('build', $.gulp.series(
	'clearcache', 'clean',
	$.gulp.parallel('dist')
));
$.gulp.task('browser', $.gulp.series(
	'browser'
));




$.gulp.task('default', $.gulp.series('dist', $.gulp.parallel('browser', 'watch')));