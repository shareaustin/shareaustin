var gulp       = require("gulp");
var gutil      = require("gulp-util");
var sass       = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("default", function() {
  return gutil.log("Gulp is running!");
});

gulp.task("build-css", function() {
  return gulp.src("./scss/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("./client/css/"));
});

gulp.task("build-css-notify", function() {
  return gutil.log("Compiling SASS");
})

gulp.task("watch", function() {
  return gulp.watch("./scss/*.scss", ["build-css", "build-css-notify"]);
})
