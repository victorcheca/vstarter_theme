const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Tarea para compilar Sass a CSS y agregar autoprefijos
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS()) // Agregar la minificación después de la compilación
    .pipe(gulp.dest('dist/css/min')) // Guardar el CSS minificado en una carpeta diferente
    .pipe(browserSync.stream()); // Recargar el navegador después de la compilación
});

// Iniciar servidor de desarrollo con BrowserSync
gulp.task('browser-sync', function() {
   //watch files
   var files = [
    './js/*.js',
    './*.js',
    './*/*.php',
    './*.php',
    './sass/**/*.scss',
    './sass/*.scss'
    ];
  browserSync.init(files, {
    

    //browsersync with a php server
    proxy: "http://localhost:8888/wp_master_test",
    notify: false,
    browser: "google chrome"
    //server: {
    //  baseDir: "http://localhost:8888/vstarter_theme"
    //}
  });
});

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

// Tarea por defecto que depende de 'sass', 'browser-sync' y 'watch'
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));