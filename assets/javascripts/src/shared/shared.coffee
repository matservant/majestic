$(document).ready ->

  # Hide header when scrolling down
  # ----------------------------------------------------------------------------

  header = $(".banner")
  masthead = $(".masthead")

  header.headroom
    classes:
      pinned: "slideDown"
      unpinned: "slideUp"
      top: "is-at-top"
      notTop: "not-at-top"
      initial: "animated"

    offset: masthead.height() - header.height()
    tolerance: 3

  # Create lightbox galleries
  # ----------------------------------------------------------------------------

  $('.gallery--link').fluidbox(
    resize: true
    preload: true
    touch: true
    animated: true
    padding: 100
    templates:
      inner: '<div id="fluidbox-inner" class="gallery--inner"></div>'
      outer: '<div id="fluidbox-outer" class="gallery--outer"></div>'
      overlay: '<div id="fluidbox-overlay" class="gallery--overlay"></div>'
      loading: '<div id="fluidbox-loading" class="gallery--loader"></div>'
      title: '<div id="fluidbox-title" class="gallery--title"></div>'
      buttons:
        close: '<div id="fluidbox-btn-close" class="gallery--close">&times;</div>',
        next: '<div id="fluidbox-btn-next" class="gallery--nav gallery--next"></div>'
        prev: '<div id="fluidbox-btn-prev" class="gallery--nav gallery--prev"></div>'
  )

  # Insert an SVG icon of the NPL logo in place of the text
  # ----------------------------------------------------------------------------

  nplItem = $('.nav-primary .nav--item:last-child a')
  nplSVG = '<svg class="svg-image svg-address"><use xlink:href="/wp-content/themes/majestic/assets/images/sprite.min.svg#npl"></use></svg>'
  nplItem.html(nplSVG)

  # Scroll to anchor smoothly
  # ----------------------------------------------------------------------------

  subnavLink = $(".masthead a")

  subnavLink.click ->
    target = undefined
    if location.pathname.replace(/^\//, "") is @pathname.replace(/^\//, "") and location.hostname is @hostname
      target = $(@hash)
      target = ((if target.length then target else $("[name=" + @hash.slice(1) + "]")))
      if target.length
        $("html,body").animate
          scrollTop: target.offset().top
        , 500
        false

  # Animate stuff if visible
  # ----------------------------------------------------------------------------

  $.fn.visible = (partial) ->
    $t = $(this)
    $w = $(window)
    viewTop = $w.scrollTop()
    viewBottom = viewTop + $w.height()
    _top = $t.offset().top
    _bottom = _top + $t.height()
    compareTop = (if partial is true then _bottom else _top)
    compareBottom = (if partial is true then _top else _bottom)
    (compareBottom <= viewBottom) and (compareTop >= viewTop)

  # Show and hide animations on window scroll
  $(window).scroll (event) ->
    $("img.animated").each (i, el) ->
      el = $(el)
      el.addClass "fadeInUp"  if el.visible(true)
