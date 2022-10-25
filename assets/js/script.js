
$(window).on('load', function () {
  currentLocation();
  checkLocalStorage();
});
var APIKey = "1401623932563c24702a8d3ac1d62c4b";
var cityname = "";
var now = moment();
var currentDate = now.format('Do MMMM YYYY');
var currentTime= now.format ( 'h:mm A')
$("#currentDay").text(currentDate);
$("#currentTime").text(currentTime);

$("#search-button").on("click", function (event) {
  event.preventDefault();
  cityname = $("#city-input").val();
  getWeather(cityname);
  saveToLocalStorage(cityname);
});

function searchHistory(cityname) {
  var newBtn = $('<button>');
  newBtn.attr('id', 'extraBtn');
  newBtn.addClass('btn btn-amber col-12', "type='button'");
  newBtn.text(cityname);
  $("#historyList").append(newBtn)
  $("#historyList").prepend(newBtn);
  $("#extraBtn").on("click", function () {
    let newcity = $(this).text();
    getWeather(newcity);
  });
}

function getWeather(cityname) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
    error: (err => {
      alert("Your city was not found. Check your spelling or enter a city code")

    })
  }).then(function (response) {
    console.log(response)
    $("#cityList").empty()
    $("#days").empty()
    var cityMain1 = $("<div col-12>").append($("<h3>" + response.name + ' - ' + currentDate + "</h3>"));
    var image = $('<img class="img-size">').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png');
    var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + '°C');
    var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
    var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');
    var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
    var cityId = response.id;

    displayUVindex(uvIndexcoord);
    displayForecast(cityId);

    cityMain1.append(image).append(degreeMain).append(humidityMain).append(windMain);
    $('#cityList').empty();
    $('#cityList').append(cityMain1);
  });
}
function displayUVindex(uv) {
  let then = $.ajax({ //
    url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
    method: "GET"
  }).then(function (response) {
    var UVIndex = $("<p><span>");

    UVIndex.text(response.value);
    let uv = response.value;
    $("#cityList").append('UV-Index : <br> ').append(UVIndex)
    if (uv >= 11) {
      UVIndex.attr("class", "badge badge-dark");
    } else if (uv >= 8) {
      UVIndex.attr("class", "badge badge-danger");
    } else if (uv >= 6) {
      UVIndex.attr("class", "badge badge-warning");
    } else if (uv >= 3) {
      UVIndex.attr("class", "badge badge-success");
    }  else if (uv >= 0)  {
      UVIndex.attr("class", "badge badge-light");
    }
  });
}

//function to Display 5 Day forecast
function displayForecast(c) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=metric&APPID=" + APIKey,
    method: "GET",
  }).then(function (response) {

    var arrayList = response.list;
    for (var i = 0; i < arrayList.length; i++) {
      if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
        console.log(arrayList[i]);
        var cityMain = $('<div>');
        cityMain.addClass('col forecast bg-primary text-white text-center ml-3 mb-3 p-3 pt-6 rounded>' );
        var date5 = $("<h6>").text(response.list[i].dt_txt.split(" ")[0]);
        var image = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + arrayList[i].weather[0].icon + '@2x.png');
        var degreeMain = $('<p>').text('Temp : ' + arrayList[i].main.temp + '°C');
        var humidityMain = $('<p>').text('Humidity : ' + arrayList[i].main.humidity + '%');
        var windMain = $('<p>').text('Wind Speed : ' + arrayList[i].wind.speed + 'MPH');
        cityMain.append(date5).append(image).append(degreeMain).append(humidityMain).append(windMain);
        $('#days').append(cityMain);
      }
    }
  });
}

function checkLocalStorage() {
  var storedData = localStorage.getItem('queries');
  var dataArray = [];
  if (!storedData) {
    console.log("no data stored");
  } else {
    storedData.trim();
    dataArray = storedData.split(',');
    for (var i = 0; i < dataArray.length; i++) {
      searchHistory(dataArray[i]);
    }
  }
}


function saveToLocalStorage(cityname) {
  var data = localStorage.getItem('queries');
  if (data) {
    console.log(data, cityname)
  } else {
    data = cityname;
    localStorage.setItem('queries', data);
  }
  if (data.indexOf(cityname)-1) {
    data = data + ',' + cityname;
    localStorage.setItem('queries', data);
    searchHistory(cityname);
  }
}
$("#clearButton").on("click", function () {
  $("#historyList").empty();
  $("#city-input").empty();
  localStorage.clear();
})