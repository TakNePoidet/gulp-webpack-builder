'use strict'

const path = ''

const config = {
	path: {
		src: {
			html: 'src/html/**',
			files: ['src/files/**/.*', 'src/files/**'],
			template: 'src/template/**',
			css: 'src/assets/css/lib/**/*.css',
			scss: 'src/assets/css/*.scss',
			style: 'src/assets/css/',
			js: 'src/assets/js/',
			fonts: 'src/assets/fonts/**',
			img: 'src/images/**'
		},
		dist: {
			html: 'dist' + path + '/',
			files: 'dist' + path + '/',
			style: 'dist' + path + '/assets/css/',
			js: 'dist' + path + '/assets/js/',
			fonts: 'dist' + path + '/assets/fonts/',
			img: 'dist' + path + '/images/',
			main: 'dist' + path + '/'
		},
		watch: {
			html: 'src/html/**',
			files: ['src/files/**/.*', 'src/files/**'],
			img: 'src/images/**/**',
			style: 'src/assets/css/**',
			fonts: 'src/assets/fonts/**'
		}
	},

	browserSync: {},
	ftp: {
		host: 'host',
		user: 'user',
		password: 'password',
		path: 'path',
		globs: ['dist/**/.*', 'dist/**']
	}
}

config.browserSync.development = {
	// server: {
	// 	baseDir: './' + config.path.dist.main,
	// },
	proxy: 'localhost:8081',
	open: false,
	tunnel: false,
	// port: 9000,
	notify: true
}

config.browserSync.production = {
	server: {
		baseDir: './' + config.path.dist.main
	},
	open: true,
	tunnel: false,
	notify: true
}

module.exports = config
