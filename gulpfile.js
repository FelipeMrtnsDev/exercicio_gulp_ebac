const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemap = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const obfuscate = require("gulp-obfuscate");
const uglify = require("gulp-uglify")


function compilaSass() {
    return gulp.src("./source/styles/main.scss")
    .pipe(sourcemap.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemap.write("./maps"))
        .pipe(gulp.dest("./build/styles"));
}

function comprimeImagens() {
    return gulp.src("./source/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"));
}

function comprimeJavascript() {
    return gulp.src("./source/scripts/*.js")
        .pipe(obfuscate())
        .pipe(uglify())
        .pipe(gulp.dest("./build/scripts"));

}

exports.default = function() {
    gulp.watch("./source/styles/*.scss", { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch("./source/images/*", { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch("./source/scripts/*.js", { ignoreInitial: false }, gulp.series(comprimeJavascript));
    gulp.watch("gulpfile.js", { ignoreInitial: false })
}
