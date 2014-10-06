<?php
  $contact = majestic_get_contact_info('contact');
  $address = majestic_get_contact_info('address');
  $address_string = '<span class="address--street">' . $address['street'] . '</span> '
                  . '<span class="address--city-state">' . $address['city'] . ', '
                  . $address['state'] . ' '
                  . $address['zip'] . '</span>';
?>

<ul class="list-plain list-inline">
  <li><?php echo $address_string ?></li>
  <li><a class="link-mobile" href="tel:<?php echo preg_replace("/[^0-9]/", "", $contact['phone']) ?>"><?php echo $contact['phone'] ?></a></li>
  <li><a href="mailto:<?php echo $contact['email'] ?>"><?php echo $contact['email'] ?></a></li>
  <li><a href="<?php echo $contact['facebook'] ?>" target="_blank">The Majestic on Facebook</a></li>
</ul>
<small>&copy;<?php echo date("Y") ?> The Majestic</small>

<?php wp_footer(); ?>
