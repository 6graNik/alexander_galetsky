/* cтарый juery слайдер */

$(document).ready(function() {
  var galleryItem = $('.gallery__item');
  var overlay = $('.overlay'),
      overlayCloseButton = $('.overlay-close'),
      gallery = $('.gallery'),
      container = $('.gallery-inner'),
      body = $('body'),
      run = true;


  overlayCloseButton.on('click', closeGallery);

  galleryItem.on('click', function(){
    var current = $(this).index() + 1;

    gallery.addClass('gallery--overlay');
    overlay.css('display', 'block');
    overlayCloseButton.css('display', 'block');
    body.css('overflow', 'hidden');

    var listitem = container.find('.gallery__item'),
        liWidth = listitem.first().width(),
        lengthListItem = listitem.length,
        curNavText = $('.gallery__currentItem'),
        overAllNavText = $('.gallery__currentOverAll');

    container.css('marginLeft', -((current - 1) * liWidth) + 'px');
    curNavText.text(current);
    overAllNavText.text(lengthListItem);

    (function(){

      var totaliWidth = liWidth * lengthListItem,
      autoslide = 1;

      setInterval(function() {
        if (!run) return;

        if (autoslide != 0){

          var currentmargin = container.css('marginLeft');
          futurmargin = - (current * liWidth);

          current++;
          if (current == lengthListItem) {
            current = 0;
          }
          container.animate({'margin-left': futurmargin});
        }

        curNavText.text(current);

      }, 8000);

      $('.gallery__navbutton').on('click',function(){
        autoslide = 0;
        var direction = $(this).data('dir'),
        loc = liWidth;

        (direction === 'next') ? ++current : --current;
        if (current === 0) {
          current = lengthListItem;
          loc = totaliWidth - liWidth ;
          direction = 'next';
        } else if (current - 1 === lengthListItem) {
          current = 1;
          loc = 0;
        }

        transition(container, loc, direction);

        curNavText.text(current);

      });


      function transition( funcontainer, loc, direction){
        var unit;
        if (direction && loc !== 0 ) {
          unit =  (direction === 'next') ? '-=' : '+=';
        }
        funcontainer.animate({
          'margin-left' : unit ? (unit + loc) : loc
        });
      }
    })();

  })

  function closeGallery() {
    gallery.removeClass('gallery--overlay');
    overlay.css('display', 'none');
    container.css('marginLeft', 0);
    overlayCloseButton.css('display', 'none');
    body.css('overflow', 'auto');
    run = false;

    $('.gallery__navbutton').off();
  }

});
