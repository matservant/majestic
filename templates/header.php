<a class="brand" href="<?php echo home_url() ?>"><?php svg_sprite('logo'); ?></a>

<?php
  if (has_nav_menu('primary_navigation')) :
    wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav nav-primary nav-collapse'));
  endif;
?>
