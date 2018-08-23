'use strict';
var gulp		= require('gulp'),
	watch		= require('gulp-watch'),
	gutil 		= require("gulp-util"),
	webpack		= require("webpack"),
	plumber		= require('gulp-plumber'),
	browserSync = require("browser-sync"),
	reload		= browserSync.reload;

const config 	= require('./config');




const RequireTask = (taskName, path, options = {}) => {
	options.config 		= config;
	options.taskName 	= taskName;

	gulp.task(taskName, callback => {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

RequireTask('html:build', 	'./tasks/assets');
RequireTask('files:build', 	'./tasks/files');
RequireTask('style:scss', 	'./tasks/style_scss');
RequireTask('style:css', 	'./tasks/style_css');
RequireTask('style:icon', 	'./tasks/style_icon');
RequireTask('image:build', 	'./tasks/images');
RequireTask('fonts:build', 	'./tasks/fonts');
RequireTask('clean', 		'./tasks/clean');
RequireTask('clearcache', 	'./tasks/clearcache');
RequireTask('browser', 		'./tasks/browser');
RequireTask('deploy', 		'./tasks/deploy');





gulp.task('style:build', gulp.parallel(
	'style:scss',
	'style:icon',
	'style:css'
));
gulp.task('dist', gulp.parallel(
	'html:build',
	'files:build',
	'style:build',
	'image:build',
	'fonts:build',
));



gulp.task('build', gulp.series(
	'clearcache', 'clean',
	gulp.parallel('dist')
));
gulp.task('watch', () => {
	watch([config.path.watch.html], 		gulp.series(['html:build']));
	watch(config.path.watch.files, 			gulp.series(['files:build']));	
	watch([config.path.watch.style], 		gulp.series(['style:build']));
	watch([config.path.watch.img], 			gulp.series(['image:build']));
	watch([config.path.watch.fonts], 		gulp.series(['fonts:build']));
});

gulp.task('default', gulp.series('dist', gulp.parallel('browser', 'watch')));
