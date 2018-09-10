'use strict';

const 	{config, gulp, browserSync, gp} = $;

module.exports = () => {
	return () => { 
		return gulp
			.src(config.path.src.style + "/images/**.*") //Выберем наши картинки
			.pipe(gp.cache(gp.imagemin({ //Сожмем их
				progressive: true,
				svgoPlugins: [
					{removeViewBox: false}
				],
				use: [gp.pngquant()],
				interlaced: true
			})))
			.pipe(gulp.dest(config.path.dist.style + "/images/"))
			.pipe(browserSync.reload({
                stream: true
            }));
	};
};