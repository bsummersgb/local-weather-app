// Set the temp as a global variable so it can be assigned within the ajax success function
var celcius;

// Set the wrapper div to a main background variable to be used in the case statement
var mainBackground = $('.wrapper');


function getCoordinates() {
  $.ajax({
    url: "http://ipinfo.io/json?",
    dataType: "jsonp",
    data: "callback=JSON_CALLBACK",
    success: function( data ) {
      // split up the lat and lon coordinates, which are delivered as a single string, into an array.
      var locationArray = data.loc.split(',');
      var lat = locationArray[0];
      var lon = locationArray[1];
      $('h2').html(data.city); // ipinfo API has more accurate city data than the OpenWeather API

        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?",
          dataType: "json",
          data: "lat="+lat+"&lon="+lon+"&units=metric&APPID=9ec98b4ca89c6baa446ea30c23790416",
          success: function( weatherData ) {
            celcius = Math.round(weatherData.main.temp);
            $('.temperature').html(celcius);
            $('.weather-description').html(weatherData.weather[0].main);
            $('.icon').html("<img src='https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>");

            var weatherDesc = weatherData.weather[0].description;

            switch (weatherDesc) {
              case 'clear sky':
                mainBackground.addClass('clear-weather');
                break;
              case 'few clouds':
              case 'scattered clouds':
              case 'broken clouds':
                mainBackground.addClass('cloudy');
                break;
              case 'shower rain':
              case 'rain':
                mainBackground.addClass('rainy');
                break;
              case 'thunderstorm':
                mainBackground.addClass('stormy');
                break;
              case 'snow':
                mainBackground.addClass('snowy');
                break;
              case 'mist':
                mainBackground.addClass('misty');
                break;
              default: mainBackground.addClass('clear-weather');
            }
          }
        });
    }
  });
}

// Converts celcius temperatue to farenheit so it can be invoked in the click function
function setFarenheit() {
  return celcius * 9 / 5 + 32;
}

// Toggles between farenheit and celcius on the click of the button
$('#toggleUnit').on('click', function() {
  $('#unit').toggleClass('fahrenheit');

  // Assign the text of the temperature div to an anonymous function
  var tempReading = function(unit) {
    $('.temperature').text(unit);
  }

  if( $('#unit').hasClass('fahrenheit') ) {
    tempReading(setFarenheit);
    $('#unit').text('°F');
  } else {
    tempReading(celcius); // celcius is just the original reading from the API datae
    $('#unit').text('°C');
  }
})

$( document ).ready(function() {

  getCoordinates();

});
