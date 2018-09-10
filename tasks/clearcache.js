'use strict';

const 	{gp} = $;

module.exports = () => {
	return () => { 
		return gp.cache.clearAll();
	};
};