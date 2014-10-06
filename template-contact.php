<?php // Template Name: Contact ?>

<?php while (have_posts()) : the_post(); ?>

<?php
  // Get contact info
  $address = majestic_get_contact_info('address');
  $contact = majestic_get_contact_info('contact');

  // Get contact and use the real facebook link
  $content = get_field('content');
  $content = str_replace('[facebook-link]', $contact['facebook'], $content);

  $address_string = '<span class="address--street">' . $address['street'] . '</span> '
                  . '<span class="address--city-state">' . $address['city'] . ', '
                  . $address['state'] . ' '
                  . $address['zip'] . '</span>';
?>

  <div class="block">
    <div class="readable">
      <?php echo $content ?>
      <?php if ($contact) : ?>
        <dl class="contact-info list-plain">
          <?php if (!empty($contact['address'])) : ?>
            <dt class="label">Address</dt>
            <dd class="value"><?php echo $address_string ?></dd>
          <?php endif ?>
          <?php if (!empty($contact['phone'])) : ?>
            <dt class="label">Phone</dt>
            <dd class="value"><a class="link-mobile" href="tel:<?php echo preg_replace("/[^0-9]/", "", $contact['phone']) ?>"><?php echo $contact['phone'] ?></a></dd>
          <?php endif ?>
          <?php if (!empty($contact['fax'])) : ?>
            <dt class="label">Fax</dt>
            <dd class="value"><?php echo $contact['fax'] ?></dd>
          <?php endif ?>
          <?php if (!empty($contact['email'])) : ?>
            <dt class="label">Email</dt>
            <dd class="value"><a href="mailto:<?php echo $contact['email'] ?>"><?php echo $contact['email'] ?></a></dd>
          <?php endif ?>
          <?php if (!empty($contact['facebook'])) : ?>
            <dt class="label">Facebook</dt>
            <dd class="value"><a href="<?php echo $contact['facebook'] ?>" target="_blank">Visit us on Facebook</a></dd>
          <?php endif ?>
          <?php if (!empty($contact['office_hours'])) : ?>
            <dt class="label">Office Hours</dt>
            <dd class="value"><?php echo $contact['office_hours'] ?></dd>
          <?php endif ?>
        </dl>
      <?php endif ?>
    </div>
    <section class="map">
      <div class="map__container"></div>
      <div class="map__zoom-control map__zoom-in"><?php svg_sprite('zoom-in') ?></div>
      <div class="map__zoom-control map__zoom-out"><?php svg_sprite('zoom-out') ?></div>
    </section>
  </div>

<?php endwhile; ?>
