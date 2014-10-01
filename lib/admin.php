<?php

// Remove stuff from admin sidebar
// ----------------------------------------------------------------------------

function remove_admin_items() {
  // Remove for everyone
  remove_menu_page('edit.php');                   // Remove posts
  remove_menu_page('edit-comments.php');          // Remove comments

  // Remove for Andrea
  if (!current_user_can('update_core')) {
    remove_menu_page('tools.php');                // Remove tools
  }
}
add_action('admin_menu', 'remove_admin_items');

// Remove stuff from wpadminbar
// ----------------------------------------------------------------------------

function remove_admin_bar_items() {
  global $wp_admin_bar;

  // Hide for everyone
  $wp_admin_bar->remove_menu('wp-logo');          // Remove the WordPress logo
  $wp_admin_bar->remove_menu('about');            // Remove the about WordPress link
  $wp_admin_bar->remove_menu('wporg');            // Remove the WordPress.org link
  $wp_admin_bar->remove_menu('documentation');    // Remove the WordPress documentation link
  $wp_admin_bar->remove_menu('support-forums');   // Remove the support forums link
  $wp_admin_bar->remove_menu('feedback');         // Remove the feedback link
  $wp_admin_bar->remove_menu('comments');         // Remove the comments link

  // Hide the tools for Andrea
  if (!current_user_can('update_core')) {
    $wp_admin_bar->remove_menu('view-site');        // Remove the view site link
    $wp_admin_bar->remove_menu('updates');          // Remove the updates link
    $wp_admin_bar->remove_menu('new-content');      // Remove the content link
  }
}
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_items' );
