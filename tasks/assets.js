'use strict';

const {config, gulp, browserSync, gp} = $;

module.exports = () => {
	return () => { 
		return gulp
			.src([config.path.src.html]) 
			.pipe(gp.plumber())
			.pipe(gp.fileInclude({
				prefix: '@@',
				basepath: config.path.src.template
			}))
			.pipe(gp.nunjucksRender ({
				envOptions: {
					tags: {
						blockStart: '<%',
						blockEnd: '%>',
						variableStart: '<$',
						variableEnd: '$>',
						commentStart: '<#',
						commentEnd: '#>'
					}
				}
			}))
			.pipe(gp.htmlBeautify({
				"indent_size": 1,
				"indent_char": "	",
			}))
			.pipe(gulp.dest(config.path.dist.html))
			.on('end', browserSync.reload);
	};
};