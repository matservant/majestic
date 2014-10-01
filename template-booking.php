<?php // Template Name: Booking ?>

<?php while (have_posts()) : the_post(); ?>
<?php
  $amenities = get_field('amenities');
  $amenities = $amenities[0];
  $rates = get_field('rates');
  $rates = $rates[0]['rates'];
  $forms = get_field('forms');
  $forms = $forms[0];
  $faqs = get_field('faqs');
  $faqs = $faqs[0]['faqs'];
?>

<section id="amenities" class="amenities-section block">
  <div class="readable">
    <h2 class="section-heading"><span>Amenities</span></h2>
    <?php echo $amenities['content'] ?>
  </div>
</section>

<section id="rates" class="rates-section block">
  <div class="readable">
    <h2 class="section-heading"><span>Rates</span></h2>
    <dl class="rates">
      <?php foreach ($rates as $rate) :
        $slug = sanitize_title($rate['heading']); ?>

        <dt class="rates--heading" id="<?php echo $slug ?>">
          <a class="link-plain" href="#<?php echo $slug ?>"><?php echo $rate['heading'] ?></a>
          <?php if (!empty($rate['subheading'])) : ?>
            <small class="rates--subheading"><?php echo $rate['subheading'] ?></small>
          <?php endif ?>
        </dt>
        <dd class="rates--content">
          <ul class="rates-list list-plain">
            <?php if (!empty($rate['line_items'])) :
               foreach ($rate['line_items'] as $line_item) : ?>
                <li class="rates-list--item">
                  <span class="term"><?php echo $line_item['item'] ?></span>
                  <span class="price"><?php echo $line_item['price'] ?></span>
                </li>
              <?php endforeach;
            endif; ?>
          </ul>
        </dd>
      <?php endforeach ?>
    </dl>
  </div>
</section>

<section id="forms" class="forms-section block">
  <div class="readable">
    <h2 class="section-heading"><span>Forms</span></h2>
    <ul class="list-plain file-list">
      <?php foreach ($forms['forms'] as $form) : ?>
        <li>
          <a class="file" href="<?php echo $form['pdf']['url'] ?>" target="_blank">
            <div class="file-image"><?php echo $form['pdf']['title'] ?></div>
            <span class="file-download">Download PDF (1.4MB)</span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
    <small><?php echo $forms['content'] ?></small>
  </div>
</section>

<section id="faqs" class="faqs-section block">
  <div class="readable">
    <h2 class="section-heading"><span>FAQs</span></h2>
    <dl class="dl-faq">
      <?php foreach ($faqs as $faq) :
        $slug = sanitize_title($faq['question']); ?>
        <dt id="<?php echo $slug ?>">
          <a class="link-plain" href="#<?php echo $slug ?>"><?php echo $faq['question'] ?></a>
        </dt>
        <dd><?php echo $faq['answer'] ?></dd>
      <?php endforeach; ?>
    </dl>
  </div>
</section>

<?php endwhile; ?>
