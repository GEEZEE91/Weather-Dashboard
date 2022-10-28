#  Weather Dashboard 
 https://geezee91.github.io/Weather-Dashboard/
## Description 

This is a weather app that allows a user to search for a city and provides up to date current weather info and also a 5 day weather forecast for that city. 


the current weather conditions in that city, the min the max tempreture for that day, humidity, wind speed, UV index, and a icon representing the whether conditions a description of the weather conditions is also shows below in the image.A 5-day forecast for that city is displayed below the current day information.



The weather results includes the temperature, humdidity, wind speed, and uv index. The uv index is also colour coded for how severe the UV is. In addition, 
once the search button is pressed, a button displaying that search information is created underneath the search field. 

I have also included the country 

When the user clicks on that button, a new search is executed for that location. Searches are saved in the browser local storage, if the user closes or refreshes the browser, the search history buttons remain and can be used to view the saved city's weather by pressing on the city button. To clears the local storage and removes the history buttons from the page the app alows the user to select the clear search button.

The weather information is sourced from the OpenWeatherMapAPI, by making fetch requests using the forecast and one call endpoints; this website allows users to search for a city and upon input receive the current weather along with a five day forecast. 

This application uses Javascript, Bootstrap, jQuery, Moment.js, and OpenWeather API 

## Installation 

      Use the below deployed link to check the Current Weather and 5-Day Forcast Weather around the world.
      
           https://geezee91.github.io/Weather-Dashboard/ 

## Usage 

<ul>
<li>Enter valid city name in the search box to search for the weather for said city.</li>
<li>Displayed on screen will be be the current weather and weather forecast for the next 5 days for said city.</li>
<li>On the left side of the weather condition are displayed yellow active buttons which contain the search history.</li>
Click on any of those yellow buttons to retrieve the weather condition for the city name associated to that button.</li>
<li>At page refresh, the current weather conditions will display the last city searched prior to refresh.</li>
<li>If you want the search history to show after a page refresh, please uncomment function searchHistory().</li>
</ul>

## License 
  ![Github license](http://img.shields.io/badge/license-MIT-blue.svg)
 



