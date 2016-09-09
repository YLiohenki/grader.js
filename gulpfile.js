'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	gulpif = require('gulp-if'),
	pug = require('gulp-pug'),
	copy = require('gulp-copy'),
	sourcemaps = require('gulp-sourcemaps'),
	header = require('gulp-header'),
	isSourcemaps = require('minimist')(process.argv.slice(2)).sourcemaps,
	appVersion = require('./package.json').version;


// LIB
gulp.task('build', function() {
	return browserify({ entries: 'standalone.js', debug: isSourcemaps }).bundle()
		.pipe(source('./grader.js'))
		.pipe(buffer())
		.pipe(gulpif(!isSourcemaps, header('/*! Grader v' + appVersion + ' */\n')))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('buildMin', ['build'], function() {
	return gulp.src('./dist/grader.js')
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify({ preserveComments: 'license' }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('docDist', ['buildMin'], function() {
	return gulp.src('./dist/grader.min.js')
		.pipe(copy('./docs/assets/js/', { prefix: 1 }));
});

// TASKS
	// lib
  gulp.task('default', ['build', 'buildMin', 'docDist']);

  gulp.task('watch', ['default'], function() {
  	gulp.watch('./lib/**/*.js', ['default'])
  });
