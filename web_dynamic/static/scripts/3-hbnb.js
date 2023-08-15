function create_places_article (place) {
  const d = document;
  const article = d.createElement('article');
  const title_box = d.createElement('div');
  const placeHeader = d.createElement('h2');
  const price_by_night = d.createElement('div');
  const information = d.createElement('div');
  const max_guest = d.createElement('div');
  const number_rooms = d.createElement('div');
  const number_bathrooms = d.createElement('div');
  const user = d.createElement('div');
  const description = d.createElement('div');

  // title box
  title_box.classList.add('title_box');
  placeHeader.textContent = place.name;
  price_by_night.classList.add('price_by_night');
  price_by_night.textContent = '$' + place.price_by_night;
  title_box.append(placeHeader, price_by_night);
  article.append(title_box);

  // information
  information.classList.add('information');
  max_guest.classList.add('max_guest');
  number_rooms.classList.add('number_rooms');
  number_bathrooms.classList.add('number_bathrooms');
  max_guest.textContent = `${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}`;
  number_rooms.textContent = `${place.number_rooms} Room${place.number_rooms != 1 ? 's' : ''}`;
  number_bathrooms.textContent = `${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}`;
  information.append(max_guest, number_rooms, number_bathrooms);
  article.append(information);

  // description
  description.classList.add('description');
  description.innerHTML = place.description;
  article.append(description);

  return article;
}

$(document).ready(function () {
  const dict = {};
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');
  const $statusIndicator = $('div#api_status');
  const statusUri = 'http://localhost:5001/api/v1/status/';

  $amenitiesCheck.click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).data('id')] = $(this).data('name');
      $selectedAmenities.text(Object.values(dict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete dict[$(this).data('id')];
      $selectedAmenities.text(Object.values(dict).join(', '));
    }
  });

  $.ajax({
    url: statusUri,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $statusIndicator.addClass('available');
      } else {
        $statusIndicator.removeClass('available');
      }
    }
  });
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    dataType: 'json'
  })
    .done((places) => {
      console.log(places);
      const placesSect = $('section.places');
      for (let i = 0; i < places.length; i++) {
        console.log(create_places_article(places[i]));
        placesSect.append(create_places_article(places[i]));
      }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.error('Request failed', textStatus, errorThrown);
    });
});
