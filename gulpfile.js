const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const commonShake = require('common-shakeify')
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const sequence = require('gulp-sequence');
const fs = require('fs');
const path = require('path');
const livereload = require('gulp-livereload');

const scssDirectories = [
	`www${path.sep}scss`,
	`www${path.sep}css`,
	`www${path.sep}js${path.sep}components`,
];

const scssExtensions = [
	'scss', 'css',
];

let scssSourceStrings = [];

let getScssSourceStrings = () => {
	if(scssSourceStrings.length === 0) {
		for(const dir in scssDirectories) {
			for(const extension in scssExtensions) {
				scssSourceStrings.push(`${dir + path.sep}**/*.${extension}`);
			}
		}
	}

	return scssSourceStrings;
};

let getSymverFromPackage = () => {
	let pkg = require('./package.json');

	return pkg.version;
};

let writeSymverToPackage = (symverStr) => {
	let pkg = require('./package.json');
	pkg.version = symverStr;

	fs.writeFileSync('./package.json', JSON.stringify(pkg, 0, 4));
};

let createGitTag = (symver) => {
	exec(`git commit -am "Updated version to ${symver}"`, {cwd: __dirname}, (err, stdout, stderr) => {
		if(err)
			throw new Error(err);
		else {
			exec(`git tag v${symver}`, {cwd: __dirname}, (err, stdout, stderr) => {
				if(err)
					throw new Error(err);
			});
		}
	});
};

let bumpVersion = (index) => {
	let originalSymver = getSymverFromPackage();
	let versions = originalSymver.split('.');

	versions[index]++;

	versions.forEach((version, i) => {
		if(i > index)
			versions[i] = 0;
	});

	let newSymver = `${versions[0]}.${versions[1]}.${versions[2]}`;
	writeSymverToPackage(newSymver);
	
	setTimeout(() => {
		createGitTag(newSymver);
	}, 7000);
};

gulp.task('bump-major', () => {
	bumpVersion(0);
});

gulp.task('bump-minor', () => {
	bumpVersion(1);
});

gulp.task('bump-patch', () => {
	bumpVersion(2);
});

gulp.task('lint-scripts', () => {
	return gulp.src(['www/js/**/*.js'])
	.pipe(eslint('./.eslintrc'))
	.pipe(eslint.format());
});

gulp.task('compile-scripts', ['lint-scripts'], () => {
	return browserify('www/js/app.js')
	.plugin(commonShake)
	.transform('babelify', {
		presets: ['react', 'env'],
	})
	.transform('rollupify', {
		config: {
			format: 'iife',
			plugins: [
				resolve({
					module: true,
					jsnext: true,
					main: true,
					browser: true,
					extensions: [ '.js', '.json' ],
					preferBuiltins: true,
					jail: '/my/jail/path',
					modulesOnly: false,
					customResolveOptions: {
						moduleDirectory: `${__dirname}/node_modules`
					}
				}),
				commonjs(),
			],
		},
	})
	.bundle()
	.on('error', function(err) {
		console.error(err);
		this.emit('end');
	})
	.pipe(source('app.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('min-scripts', ['compile-scripts'], () => {
	return gulp.src(['dist/js/app.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'))
	.pipe(livereload());
});

gulp.task('min-html', () => {
	return gulp.src('www/**/*.html')
	.pipe(plumber())
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyURLs: true,
		minifyCSS: true,
		minifyJS: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true,
	}))
	.pipe(gulp.dest('dist'))
	.pipe(livereload());
});

gulp.task('sass', () => {
	return gulp.src(getScssSourceStrings())
	.pipe(plumber())
	.pipe(sass.sync())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
	}))
	.pipe(concat('app.css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'))
	.pipe(livereload());
});

gulp.task('fonts', () => {
	const fontDir = 'www/fonts/';
	return gulp.src([fontDir + '*.ttf',
		fontDir + '*.oft',
		fontDir + '*.woff',
		fontDir + '*.woff2',
		fontDir + '*.svg',
		fontDir + '*.eot'])
	.pipe(plumber())
	.pipe(gulp.dest('dist/fonts'))
	.pipe(livereload());
});

gulp.task('min-image', () => {
	return gulp.src('www/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('prod', () => {
	process.env.NODE_ENV = 'production';
});

gulp.task('all', (callback) => {
	sequence('prod', ['min-scripts', 'min-html', 'sass', 'fonts'])(callback);
});

gulp.task('watch-scripts', () => {
	gulp.watch('www/js/**/*.js', ['min-scripts']);
});

gulp.task('watch-html', () => {
	gulp.watch('www/**/*.html', ['min-html']);
});

gulp.task('watch-sass', () => {
	gulp.watch(getScssSourceStrings(), ['sass']);
});

gulp.task('watch-fonts', () => {
	gulp.watch(['www/fonts/**'], ['fonts']);
});

gulp.task('watch-img', () => {
	gulp.watch(['www/img/**'], ['min-image']);
});

gulp.task('livereload', () => {
	livereload.listen({
		start: true,
		reloadPage: `${__dirname}/dist/index.html`,
	});
});

gulp.task('default', sequence('all', [
	'watch-scripts', 'watch-html',
	'watch-sass', 'watch-fonts',
	'watch-img', 'livereload',
]));
