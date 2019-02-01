'use strict'

const {
	config,
	browserSync,
	isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'
} = $

module.exports = () => {
	return () => {
		browserSync(config.browserSync[isDevelopment ? 'development' : 'production'])
	}
}
