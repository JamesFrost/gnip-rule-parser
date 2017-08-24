const gulp = require( 'gulp' );
const pegjs = require( 'gulp-pegjs' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );

gulp.task('build-web', function() 
{
    return gulp.src( 'grammar.pegjs' )
        .pipe( pegjs( { format: "globals", exportVar: "GnipRuleParser" } ) )
        .pipe( uglify() )
        .pipe( rename( { suffix : '.min', basename : 'GnipRuleParser' } ) )
        .pipe( gulp.dest( 'dist' ) );
});

gulp.task( 'build', [ 'build-web' ] );

gulp.task( 'default', [ 'build' ] );
