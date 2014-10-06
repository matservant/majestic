<?php while (have_posts()) : the_post(); ?>
  <h2 class="section-heading"><span><?php the_title(); ?></span></h2>
  <div class="readable">
    <?php the_content(); ?>
    <footer>
      <?php wp_link_pages(array('before' => '<nav class="page-nav"><p>' . __('Pages:', 'roots'), 'after' => '</p></nav>')); ?>
    </footer>
  </div>
<?php endwhile; ?>
