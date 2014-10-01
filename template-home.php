<?php // Template Name: Home ?>

<?php while (have_posts()) : the_post();
  $home = get_field('home');
  $home = $home[0]; ?>

  <?php if (!empty($home)) : ?>
    <section class="block">
      <div class="readable">
        <?php echo $home['content'] ?>
      </div>
      <?php majestic_gallery($home['gallery'], $home['grid_layout']); ?>
    </section>

  <?php endif ?>

<?php endwhile; ?>
