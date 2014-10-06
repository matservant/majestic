(function() {
  $(document).ready(function() {
    var header, masthead, nav, nplItem, nplSVG, subnavLink;
    nav = responsiveNav(".nav-collapse", {
      animate: true,
      transition: 350,
      label: "Menu",
      insert: "before",
      closeOnNavClick: true,
      openPos: "relative",
      navClass: "nav-collapse",
      navActiveClass: "js-nav-active",
      jsClass: "js",
      init: function() {},
      open: function() {},
      close: function() {}
    });
    header = $(".banner");
    masthead = $(".masthead");
    header.headroom({
      classes: {
        pinned: "slideDown",
        unpinned: "slideUp",
        top: "is-at-top",
        notTop: "not-at-top",
        initial: "animated"
      },
      offset: masthead.height() - header.height(),
      tolerance: 3
    });
    $('.gallery--link').fluidbox({
      resize: true,
      preload: true,
      touch: true,
      animated: true,
      padding: 100,
      templates: {
        inner: '<div id="fluidbox-inner" class="gallery--inner"></div>',
        outer: '<div id="fluidbox-outer" class="gallery--outer"></div>',
        overlay: '<div id="fluidbox-overlay" class="gallery--overlay"></div>',
        loading: '<div id="fluidbox-loading" class="gallery--loader"></div>',
        title: '<div id="fluidbox-title" class="gallery--title"></div>',
        buttons: {
          close: '<div id="fluidbox-btn-close" class="gallery--close">&times;</div>',
          next: '<div id="fluidbox-btn-next" class="gallery--nav gallery--next"></div>',
          prev: '<div id="fluidbox-btn-prev" class="gallery--nav gallery--prev"></div>'
        }
      }
    });
    nplItem = $('.nav-primary .nav--item:last-child a');
    nplSVG = '<svg class="svg-image svg-address"><use xlink:href="/wp-content/themes/majestic/assets/images/sprite.min.svg#npl"></use></svg>';
    nplItem.append(nplSVG);
    subnavLink = $(".masthead a");
    subnavLink.click(function() {
      var target;
      target = void 0;
      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
        target = $(this.hash);
        target = (target.length ? target : $("[name=" + this.hash.slice(1) + "]"));
        if (target.length) {
          $("html,body").animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
    $.fn.visible = function(partial) {
      var $t, $w, compareBottom, compareTop, viewBottom, viewTop, _bottom, _top;
      $t = $(this);
      $w = $(window);
      viewTop = $w.scrollTop();
      viewBottom = viewTop + $w.height();
      _top = $t.offset().top;
      _bottom = _top + $t.height();
      compareTop = (partial === true ? _bottom : _top);
      compareBottom = (partial === true ? _top : _bottom);
      return (compareBottom <= viewBottom) && (compareTop >= viewTop);
    };
    return $(window).scroll(function(event) {
      return $("img.animated").each(function(i, el) {
        el = $(el);
        if (el.visible(true)) {
          return el.addClass("fadeInUp");
        }
      });
    });
  });

}).call(this);
