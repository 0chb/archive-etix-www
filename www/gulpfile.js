const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

function isDevelopment() {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv) {
    return nodeEnv === 'development';
  }
  return true;
}

gulp.task('clean', () => del(['.tmp', 'dist']));

gulp.task('styles', () => {
  const isDev = isDevelopment();
  return gulp
    .src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe(
      $.sass
      .sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.'],
      })
      .on('error', $.sass.logError)
    )
    .pipe(
      $.autoprefixer()
    )
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(
      reload({
        stream: true,
      })
    );
});

gulp.task('scripts', () => {
  const isDev = isDevelopment();
  return gulp
    .src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(isDev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(
      reload({
        stream: true,
      })
    );
});

function lint(files) {
  return gulp
    .src(files)
    .pipe(
      $.eslint({
        fix: true,
      })
    )
    .pipe(
      reload({
        stream: true,
        once: true,
      })
    )
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('images', () => {
  return gulp
    .src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('videos', () => {
  return gulp.src([
    'app/videos/**/*',
    '!app/videos/original_hd_videos',
    '!app/videos/original_hd_videos/**/*',
  ]).pipe(gulp.dest('dist/videos'));
});

gulp.task('extras', () => {
  return gulp
    .src(['app/*', '!app/*.html'], {
      dot: true,
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js').pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js').pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp
    .src('app/*.html')
    .pipe(
      $.useref({
        searchPath: ['.tmp', 'app', '.'],
      })
    )
    .pipe(
      $.if(
        /\.js$/,
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe(
      $.if(
        /\.css$/,
        $.cssnano({
          safe: true,
          autoprefixer: false,
        })
      )
    )
    .pipe(
      $.if(
        /\.html$/,
        $.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: {
            compress: {
              drop_console: true,
            },
          },
          processConditionalComments: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        })
      )
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
  runSequence(['clean'], ['styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/node_modules': 'node_modules',
        },
      },
    });

    gulp
      .watch(['app/*.html', 'app/images/**/*', '.tmp/fonts/**/*'])
      .on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
    },
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/node_modules': 'node_modules',
      },
    },
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task(
  'build', ['html', 'images', 'fonts', 'videos', 'extras'],
  () => gulp.src('dist/**/*').pipe(
    $.size({
      title: 'build',
      gzip: true,
    })
  )
);

gulp.task('default', () => {
  return new Promise((resolve) => {
    runSequence(['clean'], 'build', resolve);
  });
});