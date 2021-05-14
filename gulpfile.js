var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var pug = require("gulp-pug");

gulp.task('default', ['sass', 'browser-sync', 'pug', 'watch', 'copy', 'javascript']);

//sassとpugとjavascriptの監視をして変換処理させる
gulp.task('watch', () => {
    gulp.watch(['./sass/**'], () => {
        gulp.start(['sass']);
    });
    gulp.watch(['./pug/**'], () => {
        gulp.start(['pug']);
    });
    gulp.watch(['./javascript/**'], () => {
        gulp.start(['javascript']);
    });
});

//ブラウザ表示
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./public/view/"   //サーバとなるrootディレクトリ
        }
    });
    //ファイルの監視
    //以下のファイルが変わったらリロードする
    gulp.watch("./public/view/javascript/*.js", ['reload']);
    gulp.watch("./public/view/style/*.css", ['reload']);
    gulp.watch("./public/view/*.html", ['reload']);
    gulp.watch("./public/view/images/*", ['reload']);
});

//imagesディレクトリの中身を複製
gulp.task("copy", () => {
    gulp.src("./images/*")
        .pipe(gulp.dest("./public/view/images"))

    gulp.src("./images/link-images/*")
        .pipe(gulp.dest("./public/view/images/link-images"))

    gulp.src("./images/prof-images/*")
        .pipe(gulp.dest("./public/view/images/prof-images"))

    gulp.src("./images/about-images/*")
        .pipe(gulp.dest("./public/view/images/about-images"))

    gulp.src("./images/map-images/*")
        .pipe(gulp.dest("./public/view/images/map-images"))

    gulp.src("./images/studio-images/*")
        .pipe(gulp.dest("./public/view/images/studio-images"))
});

//sassをcssに変換
gulp.task("sass", () => {
    gulp.src("./sass/style.scss")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            includePaths: require('node-reset-scss').includePath
        }))
        .pipe(gulp.dest("./public/view/style"))
        //reloadせずにinjectする
        .pipe(browserSync.stream())
});

//pugをhtmlに変換
gulp.task("pug", () => {
    var option = {
        pretty: true
    }
    gulp.src("./pug/!(_)*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug(option))
        .pipe(gulp.dest("./public/view"))
});
//jsファイルを複製
gulp.task("javascript", () => {
    gulp.src("./javascript/*.js")
        .pipe(gulp.dest("./public/view/javascript"))
});

//ブラウザリロード処理
gulp.task('reload', () => {
    browserSync.reload();
});
