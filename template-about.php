<?php // Template Name: About ?>

<?php while (have_posts()) : the_post(); ?>
<?php
  $history = get_field('history');
  $history = $history[0];
  $the_space = get_field('the_space');
  $the_space = $the_space[0];
  $events = get_field('events');
  $events = $events[0];
?>
<div class="loader"></div>
<?php // History ?>
<?php if (!empty($history)) : ?>
  <section id="history" class="history-section block">
    <div class="readable">
      <h2 class="section-heading"><span>History</span></h2>
      <?php if ($history['content']) : ?>
        <?php echo $history['content'] ?>
      <?php endif ?>
    </div>
    <?php majestic_gallery($history['gallery'], $history['grid_layout'], 'gallery-history'); ?>
  </section>
<?php endif ?>

<?php // The Space ?>
<?php if (!empty($the_space)) : ?>
  <section id="the-space" class="the-space-section block">
    <div class="readable">
      <h2 class="section-heading"><span>The Space</span></h2>
      <?php echo $the_space['content'] ?>
    </div>
    <?php majestic_gallery($the_space['gallery'], $the_space['grid_layout'], 'gallery-the-sapce'); ?>
  </section>
<?php endif; ?>

<?php // Events ?>
<?php if (!empty($events)) : ?>
  <section id="events" class="events-section block">
    <div class="readable">
      <h2 class="section-heading"><span>Events</span></h2>
      <?php echo $events['content'] ?>
    </div>
    <?php majestic_gallery($events['gallery'], $events['grid_layout'], 'gallery-events'); ?>
  </section>
<?php endif; ?>

<?php endwhile; ?>
