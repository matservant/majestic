<?php // Template Name: Calendar ?>

<?php while (have_posts()) : the_post(); ?>
  <div class="block">
    <div class="readable">
      <p class="calendar--footnote"><?php echo get_field('content') ?></p>
    </div>
    <div class="google-calendar animated fadeIn">
      <header class="calendar-header">
        <h2 class="calendar-title"><span class="month"></span> <span class="year"></span></h2>
        <nav class="nav calendar-nav">
          <a class="nav-item prev" href="#">‹</a>
          <a class="nav-item next" href="#">›</a>
        </nav>
      </header>
    </div>
  </div>
<?php endwhile; ?>
