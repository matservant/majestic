<?php

// Default scripts
// ----------------------------------------------------------------------------

function majestic_scripts() {
  // Put the version here for cache busting
  $css_version = '2';
  $js_version = '2';

  $assets = array(
    'css'          => get_template_directory_uri() . '/assets/stylesheets/majestic.min.css',
    'modernizr'    => '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js',
    'jquery'       => '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    'jquery_local' => get_template_directory_uri() . '/assets/javascripts/jquery.min.js',
    'google_api'   => 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDAO7L6DesWgiXwUgai3hHdeNjdbeQnvAk&sensor=false',
    'js'           => get_template_directory_uri() . '/assets/javascripts/majestic.min.js'
  );

  // Add styles
  wp_enqueue_style('majestic_css', $assets['css'], false, $css_version);

  // jQuery is loaded using the same method from HTML5 Boilerplate:
  // Grab Google CDN's latest jQuery with a protocol relative URL; fallback to local if offline
  // It's kept in the header instead of footer to avoid conflicts with plugins.
  if (!is_admin() && current_theme_supports('jquery-cdn')) {
    wp_deregister_script('jquery');
    wp_register_script('jquery', $assets['jquery'], array(), null, true);
    add_filter('script_loader_src', 'roots_jquery_local_fallback', 10, 2);
  }

  // Add scripts
  wp_enqueue_script('modernizr', $assets['modernizr'], array(), null, false);
  wp_enqueue_script('jquery');
  wp_enqueue_script('google_api', $assets['google_api'], array(), null, true);
  wp_enqueue_script('majestic_js', $assets['js'], array(), $js_version, true);
}
add_action('wp_enqueue_scripts', 'majestic_scripts', 100);

// Admin scripts
// ----------------------------------------------------------------------------

function majestic_admin_scripts() {
  $admin_css = get_template_directory_uri() . '/assets/stylesheets/admin.min.css';

  wp_enqueue_style('majestic_admin_style', $admin_css, false, '1.0.0');
  wp_enqueue_style('majestic_admin_fonts', 'http://fonts.googleapis.com/css?family=Source+Code+Pro', false, '1.0.0');
}
add_action('admin_enqueue_scripts', 'majestic_admin_scripts');

// jQuery local fallback
// ----------------------------------------------------------------------------

function roots_jquery_local_fallback($src, $handle = null) {
  static $add_jquery_fallback = false;
  $jquery_local = get_template_directory_uri() . '/assets/javascripts/jquery.min.js';

  if ($add_jquery_fallback) {
    echo '<script>window.jQuery || document.write(\'<script src="' . $jquery_local . '"><\/script>\')</script>' . "\n";
    $add_jquery_fallback = false;
  }

  if ($handle === 'jquery') {
    $add_jquery_fallback = true;
  }

  return $src;
}
add_action('wp_head', 'roots_jquery_local_fallback');

// Google Analytics snippet from HTML5 Boilerplate
function roots_google_analytics() { ?>
<script>
  <?php if(WP_ENV==='production') :?>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
  <?php else: ?>
    function ga() {
      console.log("GoogleAnalytics: " + [].slice.call(arguments));
    }
  <?php endif; ?>
  ga('create','<?php echo GOOGLE_ANALYTICS_ID; ?>','auto');ga('send','pageview');
</script>

<?php }

if (GOOGLE_ANALYTICS_ID && !current_user_can('manage_options')) {
  add_action('wp_footer', 'roots_google_analytics', 20);
}
