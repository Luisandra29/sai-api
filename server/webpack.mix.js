//const mix = require('laravel-mix');


const mix = require('laravel-mix');
const { MIX_PROXY_URL } = process.env;
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/*mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);*/



    mix.react('resources/js/bootstrap.js', 'public/js/app.js')
  .sass('resources/sass/app.scss', 'public/css')
  .browserSync({
    files: [
      'public/js/**/*',
      'public/css/**/*',
    ],
    proxy: `${MIX_PROXY_URL}`
  });

if (mix.inProduction()) {
  mix.version();
}
