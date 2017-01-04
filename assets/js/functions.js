function getCoordinates() {
  $.ajax({
    url: "http://ipinfo.io/json?",
    dataType: "jsonp",
    data: "callback=JSON_CALLBACK",
    success: function( data ) {
      var locationArray = data.loc.split(',');
      var lat = locationArray[0];
      var lon = locationArray[1];
      $('h2').html(data.city);


      // $('.wrapper').html("Latitude: " + lat + " Longitude: " + lon);

        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?",
          dataType: "json",
          data: "lat="+lat+"&lon="+lon+"&units=metric&APPID=9ec98b4ca89c6baa446ea30c23790416",
          success: function(weatherData) {
            $('.temperature').html(Math.round(weatherData.main.temp));
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
              default: ('.wrapper').addClass('clear-weather');

            }

          }
        });



    }
  });
}

//print out city from ipInfo api - more accurate
// print out temp
//find out what values come under description




// Celcius to farenheit conversion
// Math.round( (celcius * 9)/5 + 32 )

// My OpenWeather API Key
// 9ec98b4ca89c6baa446ea30c23790416


// Exact Url to make the API call (second one converts temp to celsius (default is kelvins) , 3rd to farenheit):
// http://api.openweathermap.org/data/2.5/weather?lat=-31.9674&lon=115.8621&APPID=9ec98b4ca89c6baa446ea30c23790416
// http://api.openweathermap.org/data/2.5/weather?lat=-31.9674&lon=115.8621&units=metric&APPID=9ec98b4ca89c6baa446ea30c23790416
// http://api.openweathermap.org/data/2.5/weather?lat=-31.9674&lon=115.8621&units=imperial&APPID=9ec98b4ca89c6baa446ea30c23790416


// Examples of API call(with coords, and by cityId):
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=9ec98b4ca89c6baa446ea30c23790416
// api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=9ec98b4ca89c6baa446ea30c23790416

// http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=061f24cf3cde2f60644a8240302983f2


$( document ).ready(function() {

getCoordinates();

$('.temperature').on('click', function(e) {
  e.preventDefault();
  var celcius =  parseInt( $('.temperature').text() );
  console.log(celcius);
  var farenheit = celcius * 9 / 5 + 32;

  $('.temperature').text( farenheit );
  console.log(celcius);
})

// c to f:   celcius×9/5+32
// f to c:   (farenheit-32)×5/9



});
