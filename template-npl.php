<?php // Template Name: NPL ?>

<?php while (have_posts()) : the_post();
  $about = get_field('about');
  $about = $about[0]; ?>

  <?php // About ?>
  <?php if (!empty($about)) : ?>
    <section id="about" class="about-section block">
      <div class="readable">
        <h2 class="section-heading"><span>About</span></h2>
        <?php if ($about['content']) : ?>
          <?php echo $about['content'] ?>
        <?php endif ?>
      </div>
      <?php majestic_gallery($about['gallery'], $about['grid_layout'], 'gallery-about'); ?>
    </section>
  <?php endif ?>

  <section id="events" class="events-section block">
    <div class="readable">
      <h2 class="section-heading"><span>Events</span></h2>
      <ul class="events-list"></ul>
    </div>
  </section>

<?php endwhile; ?>
