const gulp = require("gulp");
const nodemon = require("nodemon");
const webpack = require("webpack-stream");
const webpackConfMain = require("./webpack.config.js");
const sass = require("gulp-sass");

sass.compiler = require("node-sass");

const src = "./src/client";
const dist = "./dist/client";

const main = {
  js: () => {
    return gulp
      .src("./src/client/js/main.jsx")
      .pipe(webpack(webpackConfMain))
      .pipe(gulp.dest("./dist/client/js"));
  },
  watchHtml: () => {
    gulp.watch("./src/client/*.html", main.js);
  },
  watchJs: () => {
    gulp.watch("./src/client/js/**", main.js);
  },
  css: () => {
    return gulp
      .src(`${src}/sass/master.scss`)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(`${dist}/css/`));
  },
  watchCss: () => {
    gulp.watch(`${src}/sass/master.scss`, main.css);
  },
  pipeServerFolders: () => {
    return gulp.src("./src/libs/**").pipe(gulp.dest("./dist/libs"));
  },
  pipeServer: () => {
    return gulp.src("./src/server.js").pipe(gulp.dest("./dist/"));
  },
  runServer: () => {
    nodemon({
      script: "./dist/server.js",
      ext: "js html",
      env: { NODE_ENV: "development" }
    });
  },
  watchServerFile: () => {
    gulp.watch("./src/server.js", main.pipeServer);
  },
  watchServerFolders: () => {
    gulp.watch(
      "./src/libs/**",
      gulp.parallel(main.pipeServerFolders, main.pipeServer)
    );
  },
  imgs: () => {
    return gulp.src(`${src}/imgs/**`).pipe(gulp.dest(`${dist}/imgs/`));
  },
  watchImgs: () => {
    gulp.watch(`${src}/imgs/**`, main.imgs);
  },
  pipeFonts: () => {
    return gulp.src(`${src}/fonts/**`).pipe(gulp.dest(`${dist}/fonts`));
  }
};

module.exports.default = gulp.parallel(
  main.js,
  main.watchHtml,
  main.watchJs,
  main.css,
  main.watchCss,
  main.pipeServer,
  main.pipeServerFolders,
  main.runServer,
  main.watchServerFile,
  main.watchServerFolders,
  main.imgs,
  main.watchImgs,
  main.pipeFonts
);
