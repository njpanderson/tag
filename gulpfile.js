var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	webpack = require('gulp-webpack'),
	watch = false;

const env = {
	path_dist: 'public_html/dist'
};

gulp.task('scripts', ['clean'], () => {
	process.env.NODE_ENV = 'production';

	return gulp.src('src/js/App.jsx')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(env.path_dist + '/js'));
});

gulp.task('styles', ['clean'], () => {
	return gulp.src('src/styles/main.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest(env.path_dist + '/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest(env.path_dist + '/css'));
});

gulp.task('clean', () => {
	if (!watch) {
		return del([
			env.path_dist
		]);
	} else {
		return true;
	}
});

gulp.task('watch', () => {
	watch = true;
	gulp.watch('src/js/**/*.js*', ['scripts']);
	gulp.watch('src/styles/*.scss', ['styles']);
});

gulp.task('build', ['scripts', 'styles']);