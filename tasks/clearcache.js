'use strict';


const 	cache		= require('gulp-cache');

module.exports = (options) => {
	return () => { 
		return cache.clearAll();
	};
};