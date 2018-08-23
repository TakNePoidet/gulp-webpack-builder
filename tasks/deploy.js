'use strict';


const 	gulp		= require('gulp'),
		ftp			= require('vinyl-ftp'),
		gutil		= require('gulp-util');

module.exports = (options) => {
	let config = options.config;
	return () => { 
		var conn = ftp.create({
			host:      config.ftp.host,
			user:      config.ftp.user,
			password:  config.ftp.password,
			parallel:  10,
			log: gutil.log
		});

		return gulp
			.src(config.ftp.globs, {buffer: false})
			.pipe(conn.dest(config.ftp.path));
	};
};