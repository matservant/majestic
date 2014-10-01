<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <!--[if lt IE 9]>
      <div class="alert alert-warning">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/?locale=en">upgrade your browser</a> to improve your experience.</div>
    <![endif]-->

    <header class="banner">
      <div class="container">
        <?php get_template_part('templates/header'); ?>
      </div>
    </header>

    <section class="masthead">
      <div class="container">
        <h1 class="page-title animated fadeInUp">
          <?php if (is_front_page() ) :
            svg_sprite('logo');
          else :
            the_title();
          endif; ?>
        </h1>
        <?php majestic_masthead($post); ?>
      </div>
    </section>

    <main class="main" role="main">
      <div class="container">
        <?php include roots_template_path(); ?>
      </div>
    </main>

    <footer class="site-info">
      <div class="container">
        <?php get_template_part('templates/footer'); ?>
      </div>
    </footer>

  </body>
</html>
