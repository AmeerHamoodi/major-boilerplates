const gulp = require("gulp");
const webpack = require("webpack-stream");
const nodemon = require("nodemon");
const webpackConf = require("./webpack.config.js");

const mainGulpClass = {
  js: () => {
    return gulp
      .src("./src/client/js/main.js")
      .pipe(webpack(webpackConf))
      .pipe(gulp.dest("./devBuild/client/js"));
  },
  watchJs: () => {
    gulp.watch("./src/client/js/**", mainGulpClass.js);
  },
  watchHtml: () => {
    gulp.watch("./src/client/*.html", mainGulpClass.js);
  },
  css: () => {
    return gulp
      .src("./src/client/css/**")
      .pipe(gulp.dest("./devBuild/client/css/"));
  },
  watchCss: () => {
    gulp.watch("./src/client/css/**", mainGulpClass.css);
  },
  pipeServer: () => {
    return gulp.src("./src/*.js").pipe(gulp.dest("./devBuild/"));
    mainGulpClass.nodemon();
  },
  pipeFolders: () => {
    return gulp.src("./src/libs/**").pipe(gulp.dest("./devBuild/libs"));
  },
  pipeImages: () => {
    return gulp
      .src("./src/client/assets/**")
      .pipe(gulp.dest("./devBuild/client/assets"));
  },
  nodemon: () => {
    nodemon({
      script: "./devBuild/server.js",
      ext: "js html",
      env: { NODE_ENV: "development" }
    });
  },
  watchServer: () => {
    gulp.watch("./src/*.js", mainGulpClass.pipeServer);
  },
  html: () => {
    return gulp
      .src("./src/client/index.html")
      .pipe(gulp.dest("./devBuild/client"));
  }
};

module.exports.default = gulp.parallel(
  mainGulpClass.js,
  mainGulpClass.watchJs,
  mainGulpClass.pipeImages,
  mainGulpClass.css,
  mainGulpClass.watchCss,
  mainGulpClass.pipeServer,
  mainGulpClass.pipeFolders,
  mainGulpClass.nodemon,
  mainGulpClass.watchServer,
  mainGulpClass.html,
  mainGulpClass.watchHtml
);
