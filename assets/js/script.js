
$(window).on('load', function () {
  currentLocation();
  checkLocalStorage();
});
var APIKey = "1401623932563c24702a8d3ac1d62c4b";
var cityname = "";
var now = moment();
var currentDate = now.format('ddd, Do MMMM YYYY');
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
    
    $("#cityHeader").empty()
    $("#cityImg").empty()
    $("#days").empty()
    
    $("#cityHeader").append($("<h3'>" + response.name + ",  "  + response.sys.country + "</h3> <h4>" + currentDate + "</h4> <hr class='style2'>"));
   
    // $("#cityList").append
    $("#cityList").append($('<h2>').text(response.main.temp + ' °C'));
    $("#cityList").append($('<p>').text('max  ' + response.main.temp_max + ' °C    ' + '    min  ' + response.main.temp_min + ' °C '));
    $("#cityList").append($('<br> <h5>').text('Humidity : ' + response.main.humidity + ' %'));
    $("#cityList").append($('<h5>').text('Wind Speed : ' + response.wind.speed + ' MPH'));

        // add image in weather dewscription turn lower cse to uppercase api description
    const descriptionword = response.weather[0].description;
    const capitalized =descriptionword.toUpperCase();
    $('#cityImg').append($('<div class="description">').append('<img class="img-size" src="http://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png"> <h4>' + capitalized + '</h4>'));
   
    var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
    var cityId = response.id;
    displayUVindex(uvIndexcoord);
    displayForecast(cityId);

  });
}
function displayUVindex(uv) {
  let then = $.ajax({ //
    url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
    method: "GET"
  }).then(function (response) {
    var UVIndex = $("<h4>");

    UVIndex.text(response.value);
    let uv = response.value;
    $("#cityList").append($('<h4> UV-Index               </h4> ').append( UVIndex));
    if (uv >= 11) {
      UVIndex.attr("class", "badge badge-dark p-3 font-size-medium");
    } else if (uv >= 8) {
      UVIndex.attr("class", "badge badge-danger p-3 font-size-medium");
    } else if (uv >= 6) {
      UVIndex.attr("class", "badge badge-warning p-3 font-size-medium");
    } else if (uv >= 3) {
      UVIndex.attr("class", "badge badge-success p-3 font-size-medium");
    }  else if (uv >= 0)  {
      UVIndex.attr("class", "badge badge-light p-3 font-size-medium");
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
        
        // var cityMain = $('<div>');
        // cityMain.addClass('col forecast bg-primary text-white text-center ml-3 mb-3 p-3 pt-6 rounded>' );
        var newCard = $('<div>').appendTo($(days));
       var col = $("<div>").addClass("col-lg-2 col-md-12").appendTo(newCard);
        var newCard = $("<div>").addClass("card").appendTo(newCard);
        var newCardHeader = $("<div>").addClass("card-header").appendTo(newCard);
      var newCardBody = $("<div>").addClass("card-body").appendTo(newCard);

      
      
      var date = response.list[i].dt_txt.split(" ")[0];
         var day = $("<h5>" + moment(date).format("dddd") + "</h5>");
         var futureDate = $( "<h5>" + moment(date).format("DD-MM-YY") + "</h5>");
       
        
        var futureImg = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + arrayList[i].weather[0].icon + '@2x.png');
        
        var degreeMain = $('<div>'+ '🌡' + arrayList[i].main.temp + '°C' + '</div>');

        var humidityMain = $('<div>' + '💧 ' + arrayList[i].main.humidity + '%' + '</div>');
        var windMain = $('<div>' +'<i class="fa-solid fa-wind">  </i> ' + arrayList[i].wind.speed + 'MPH' + '</div>');
        
      $(day).addClass("card-title").appendTo(newCardHeader);
      $(futureDate).addClass("card-title").appendTo(newCardHeader);
      $(futureImg).appendTo(newCardBody);
      $(degreeMain).addClass("card-text").appendTo(newCardBody);
      $(humidityMain).addClass("card-text").appendTo(newCardBody);
      $(windMain).addClass("card-text").appendTo(newCardBody);
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
