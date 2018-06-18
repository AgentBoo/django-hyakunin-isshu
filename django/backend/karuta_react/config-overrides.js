module.exports = {
  webpack: (config, env) => {
    const BundleTracker = require('webpack-bundle-tracker');
   	
   	config.plugins = config.plugins.concat([ 
   		new BundleTracker({ filename: './webpack-stats-production.json'})
   	])

    return config;
  }
};


/*
// return the original config and pretend this never happened
module.exports = function override(config, env) {
  return config;
}
*/


/*

Additional comments for this module can be found in lab-book-4.md

*/