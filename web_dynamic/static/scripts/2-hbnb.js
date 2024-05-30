$(document).ready(() => {
  const checklist = {};
  let amen = [];
  $('INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      checklist[key] = value;
    }
    if (!$(this).is(':checked')) {
      delete checklist[$(this).attr('data-id')];
    }
    amen = Object.values(checklist);
    $('.amenities h4').text(amen.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status', data => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
