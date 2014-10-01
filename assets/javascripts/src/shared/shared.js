(function() {
  $(document).ready(function() {
    var header, masthead, nplItem, nplSVG, subnavLink;
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
    nplItem.html(nplSVG);
    subnavLink = $(".masthead a");
    return subnavLink.click(function() {
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
  });

}).call(this);
