window.onload = function () {
	updateTime();
	updateWeather();
	getNews();
};

function updateTime() {
  var updatedWeatherFlag = 0;
  var fullscreenWipeFlag = 0;
  var update = function(){
		date = moment(new Date());
    $('.date-info-daymonth').html(date.format('ddd') + '<br>' + date.format('MMM'));
    $('.date-info-number').html(date.format('DD'));
    $('.date-info-time').html(date.format('hh:mm'));
    $('.date-info-ampm').html(date.format('A'));

	  if (date.format('mm') === '00' && updatedWeatherFlag === 0) {
	  	updateWeather();
	  	updatedWeatherFlag = 1;
	  	getNews();
	  }
	  else if (date.format('mm') === '00' && updatedWeatherFlag === 1) {
	  	// do nothing
	  }
	  else {
	  	updatedWeatherFlag = 0; // reset it
	  }

  };
  update();
  setInterval(update, 1000);
}

function updateWeather() {
  $.ajax({
	  url : "https://api.wunderground.com/api/b122413cd786c2b3/conditions/forecast/q/KY/Louisville.json",
	  dataType : "jsonp",
	  success : function(parsed_json) {
		  var temp = parsed_json['current_observation']['temp_f'];
		  var hi   = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
		  var lo   = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];
		  var icon = parsed_json['current_observation']['icon'];

		  // round the temp
		  temp = Math.round(temp);
		  $('.weather-info-hilo .hi').html(hi);
		  $('.weather-info-hilo .lo').html(lo);
		  $('.weather-info-temp').html(temp);
		  $('.weather-info-icon img').prop('src', 'img/weather/' + icon + '.png');
	  }
  });
}

function getNews() {
	$.get('http://hosted2.ap.org/atom/APDEFAULT/386c25518f464186bf7a2ac026580ce7', function (data) {
    $(data).find("entry").each(function () { // or "item" or whatever suits your feed
      var el = $(this);
      $('marquee').append(' <span>&middot;</span> ' + el.find("title").text());
    });
	});
}
