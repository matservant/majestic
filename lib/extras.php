<?php

// Insert SVG symbol
// ----------------------------------------------------------------------------

function svg_sprite($symbol_id) { ?>
  <svg class="svg-image svg-<?php echo $symbol_id ?>">
    <use xlink:href="<?php echo get_template_directory_uri() ?>/assets/images/sprite.min.svg#<?php echo $symbol_id ?>" /></use>
  </svg>
<?php }

// Create the masthead
// ----------------------------------------------------------------------------

function majestic_masthead($post) {
  // Home
  if (is_page('home')) : ?>
    <div class="page-subtitle animated fadeInUp">
      <h2 class="page-subtitle--item">Event &amp; meeting center<br>Downtown Abilene</h2>
    </div>
  <?php endif;

  // About
  if (is_page('about')) : ?>
    <ul class="page-subtitle nav animated fadeInUp">
      <li class="nav--item"><a class="page-subtitle--item" href="#history">History</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#the-space">The Space</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#events">Events</a></li>
    </ul>
  <?php endif;

  // Booking
  if (is_page('booking')) : ?>
    <ul class="page-subtitle nav animated fadeInUp">
      <li class="nav--item"><a class="page-subtitle--item" href="#amenities">Amenities</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#rates">Rates</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#forms">Forms</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#faqs">FAQs</a></li>
    </ul>
  <?php endif;

  // Booking
  if (is_page('neon-parrot-lounge')) : ?>
    <ul class="page-subtitle nav animated fadeInUp">
      <li class="nav--item"><a class="page-subtitle--item" href="#about">About</a></li>
      <li class="nav--item"><a class="page-subtitle--item" href="#events">Events</a></li>
    </ul>
  <?php endif;
}

// Gallery
// ----------------------------------------------------------------------------

function majestic_gallery($gallery, $grid_layout, $gallery_rel = 'gallery-a') {
  if (!empty($gallery)) : ?>

    <ul class="gallery">
      <?php $i = 0;
      foreach ($gallery as $image) :
        $image_grid = majestic_gallery_grid($grid_layout); ?>
        <li class="gallery--item <?php echo $image_grid[$i]['class'] ?>">
          <a
            class="gallery--link"
            rel="<?php echo $gallery_rel ?>"
            href="<?php echo $image['url'] ?>"
            title="<?php echo $image['title'] ?>">
            <img
              src="<?php echo $image['sizes'][$image_grid[$i]['size']] ?>"
              alt="<?php echo $image['title'] ?>"
              title="<?php echo $image['title'] ?>">
          </a>
        </li>
      <?php $i++; endforeach; ?>
    </ul>

<?php endif;
}

// Gallery grid
// ----------------------------------------------------------------------------

// The grid layout will be a number with each slot being a row and each number
// being the number of images in that row. So "2331" == 1st row has 2 images,
// 2nd row has 3 images, 3rd row has 3 images, and 4th row has 1 image. Total
// of 9 images. "13" == 1st row has 1 image and 2nd row has 3 images.

function majestic_gallery_grid($grid_layout) {
  $rows = strlen($grid_layout);   // 3 rows
  $image_grid = array();
  $i = 0;

  while ($i < $rows) :
    $images_per_row = $grid_layout[$i];

    switch ($images_per_row) {
      case '1':
        $value = 'whole';
        break;
      case '2':
        $value = 'half';
        break;
      case '3':
        $value = 'third';
        break;
      default:
        $value = 'fourth';
        break;
    }

    $sub_array = array(
      'class' => 'column-' . $value,
      'size' => $value
    );

    // Make the correct number of these class/size pairs
    while ($images_per_row > 0) :
      array_push($image_grid, $sub_array);
      $images_per_row--;
    endwhile;

    $i++;
  endwhile;

  return $image_grid;
}

// Get contact info
// ----------------------------------------------------------------------------

// Accepts either 'address' or 'contact'
//
// $address = majestic_get_contact_info('address');
// $address = array(
//   'street' => 'street',
//   'city'   => 'city',
//   'state'  => 'state',
//   'zip'    => 'zip',
// )

function majestic_get_contact_info($field_name = 'address') {
  $contact_page = get_page_by_title('Contact Us');

  $field = get_field($field_name, $contact_page->ID);

  if (!empty($field)) :
    return $field[0];
  endif;
}

// Clean up body classes
// ----------------------------------------------------------------------------

function majestic_body_classes($classes) {
  global $post;

  return array($post->post_name);
}
add_filter('body_class','majestic_body_classes');

// Clean up the_excerpt()
// ----------------------------------------------------------------------------

function roots_excerpt_more($more) {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'roots') . '</a>';
}
add_filter('excerpt_more', 'roots_excerpt_more');

// Manage output of wp_title()
// ----------------------------------------------------------------------------

function roots_wp_title($title) {
  if (is_feed()) {
    return $title;
  }

  $title .= get_bloginfo('name');

  return $title;
}
add_filter('wp_title', 'roots_wp_title', 10);
