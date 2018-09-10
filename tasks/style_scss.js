'use strict';

const 	{config, gulp, browserSync, gp} = $,
		isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = () => {
	return () => { 
		return gulp
			.src(config.path.src.scss)
			.pipe(gp.plumber())
			.pipe(gp.if(isDevelopment, gp.sourcemaps.init()))
			.pipe(
				gp.sass({outputStyle: 'expanded'}).on( 'error', gp.notify.onError({
					message: "<%= error.message %>",
					title  : "Sass Error!"
				}))
			)
			.pipe(gp.autoprefixer({
				browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
			}))
			.pipe(gp.if(!isDevelopment, gp.cleanCss()))
			// .pipe(gp.rename({suffix: '.min'}))
			.pipe(gp.if(isDevelopment, gp.sourcemaps.write('./')))
			.pipe(gulp.dest(config.path.dist.style))
			.pipe(browserSync.reload({
                stream: true
            }));
	};
};