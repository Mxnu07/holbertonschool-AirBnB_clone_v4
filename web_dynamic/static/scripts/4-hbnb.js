$(document).ready(function () {
    const checklist = {};
    $('INPUT:checkbox').change(function () {
      if ($(this).is(':checked')) {
        checklist[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete checklist[$(this).attr('data-id')];
      }
    });
  
    $('button').click(function () {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ amenities: Object.keys(checklist) }),
        success: function (data) {
          $('.places').empty();
          for (const place of data) {
            const article = `
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
              </article>`;
            $('.places').append(article);
          }
        }
      });
    });
  });