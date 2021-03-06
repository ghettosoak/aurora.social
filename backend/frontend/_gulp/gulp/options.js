var assets = '../../assets'; // Relative to gulpfile.js
var webassets = 'assets'; // Relative to webroot

module.exports = {

	// Project name
	name: 'SBB Clever Pendeln',

	// Less settings
	less: {
		src: '../less/**/*.less',
		main: '../less/main.less',
		dest: assets + '/css',
		suffix: '.min',
		autoprefix: [
			'Android >= 2.3',
			'Chrome >= 20',
			'Firefox >= 24', // Firefox 24 is the latest ESR
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		],
		sourceMapRoot: '/' + webassets + '/css/' // Relative to web root
	},

	// Browserify settings
	js: {
		bundles: [
			{
				name: 'Main',
				src: '../js/main.js' // Relative to gulpfile.js
			}
		],
		suffix: '.min',
		dest: assets + '/js'
	},

	// Jade settings
	jade: {
		src: 'jade/**/*.jade', // Relative to gulpfile.js
		views: 'jade/views/**/*.jade', // Relative to gulpfile.js
		dest: '../Styleguide', // Relative to gulpfile.js
		minify: false
	},

	iconfont: {
		src: '../svg/*.svg', // Relative to gulpfile.js
		dest: assets + '/fonts',
		name: 'fonticons',
		class: 'gfx',
		template: 'gulp/utils/iconfont-template.less', // Relative to gulpfile.js
		lessDest: '../less/skeleton/', // Relative to gulpfile.js
		rootPath: '../../' + webassets + '/fonts/' // Relative to web root
	}
}