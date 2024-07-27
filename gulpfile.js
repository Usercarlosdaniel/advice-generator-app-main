const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass task
function scssTask() {
  return src("src/app/sass/main.scss", { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }))
    .pipe(browsersync.stream());
}

// JavaScript task
function jsTask() {
  return src("src/app/js/script.js", { sourcemaps: true })
    .pipe(terser().on('error', (e) => {
      console.error(e.toString());
      this.emit('end');
    }))
    .pipe(dest("dist", { sourcemaps: "." }))
    .pipe(browsersync.stream());
}

// BrowserSync serve task
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

// BrowserSync reload task
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(
    ["src/app/sass/**/*.scss", "src/app/js/**/*.js"],
    series(scssTask, jsTask, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);
