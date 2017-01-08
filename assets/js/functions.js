// Set the temp as a global variable so it can be assigned within the ajax success function
var temp;

function getCoordinates() {
  $.ajax({
    url: "https://ipinfo.io/json?",
    dataType: "jsonp",
    data: "callback=JSON_CALLBACK",
    success: function( data ) {
      var locationArray = data.loc.split(',');
      var lat = locationArray[0];
      var lon = locationArray[1];
      $('h2').html(data.city);

        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?",
          dataType: "json",
          data: "lat="+lat+"&lon="+lon+"&units=metric&APPID=9ec98b4ca89c6baa446ea30c23790416",
          success: function(weatherData) {
            temp = Math.round(weatherData.main.temp);
            $('.temperature').html(temp);
            $('.weather-description').html(weatherData.weather[0].main);
            $('.icon').html("<img src='https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>");

            var weatherDesc = weatherData.weather[0].description;

            switch (weatherDesc) {
              case 'clear sky':
                $('.wrapper').addClass('clear-weather');
                break;
              case 'few clouds':
              case 'scattered clouds':
              case 'broken clouds':
                $('.wrapper').addClass('cloudy');
                break;
              case 'shower rain':
              case 'rain':
                $('.wrapper').addClass('rainy');
                break;
              case 'thunderstorm':
                $('.wrapper').addClass('stormy');
                break;
              case 'snow':
                $('.wrapper').addClass('snowy');
                break;
              case 'mist':
                $('.wrapper').addClass('misty');
                break;
              default: $('.wrapper').addClass('clear-weather');

            }

          }
        });
    }
  });
}

$( document ).ready(function() {

  getCoordinates();

  function setFarenheit() {
    return temp * 9 / 5 + 32;
  }

  $('#toggleUnit').on('click', function() {
  	$('#unit').toggleClass('fahrenheit');

    if( $('#unit').hasClass('fahrenheit') ) {
      $('.temperature').text(setFarenheit);
      $('#unit').text('°F');
    } else {
      $('.temperature').text(temp);
      $('#unit').text('°C');
    }

  })

});
