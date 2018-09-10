'use strict';

const 	{config, gulp, gp} = $;

module.exports = () => {
	return () => { 
		let conn = gp.vinylFtp.create({
			host:      config.ftp.host,
			user:      config.ftp.user,
			password:  config.ftp.password,
			parallel:  10,
			log:      gp.util.log
		});

		return gulp
			.src(config.ftp.globs, {buffer: false})
			.pipe(conn.dest(config.ftp.path));
	};
};