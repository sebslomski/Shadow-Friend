$(function () {
  $('.menu-wrapper').css({
    width: $('.menu ul').width()
  });

  $('.menu').stickyPanel({
    afterDetachCSSClass: 's-fixed'
  });

  $('.menu a').click(function (e) {
    e.preventDefault();
    $('.menu a').removeClass('s-active');
    $(this).addClass('s-active');
    $(window).scrollTo($($(this).attr('href')), 1000);
  });

  // --- Load the photos from Flickr
  var groupId = '75794156@N02';

  $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
    method: 'flickr.people.getPublicPhotos',
    api_key: '71dd59ae48c2b2e8bfa703d32b6b7f35',
    format: 'json',
    user_id: groupId
  }, function (data) {
    var photos = data.photos.photo;
    photos.length && renderPhotos(photos);
    $('#photo-container img').first().trigger('click');
  });

  var showPhoto = function (e) {
    e.preventDefault();
    $('#photo-preview').attr('src', $(this).attr('href'));
  };


  var renderPhotos = function (photos) {
    for (var i=photos.length - 1; i>=0; i--) {
      var photo = photos[i];

      var image = $('<img>');

      var baseUrl = 'http://farm' + photo.farm +
                     '.staticflickr.com/' + photo.server +
                     '/' + photo.id + '_' + photo.secret;

      var thumbUrl = baseUrl + '_t.jpg';
      var bigUrl   = baseUrl + '.jpg';

      image.attr('src', thumbUrl);

      var link = $('<a></a>');
      link.attr({
        href: bigUrl,
        target: '_blank',
        'class': 'fancybox',
        rel: 'gallery'
      });
      link.append(image);

      $('#photo-container').append(link);
      $(link).click(showPhoto);
    };

    // --- Remove loading indicator
    $('#photos .loading').remove();
  }
});

