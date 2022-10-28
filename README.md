#  Weather Dashboard 


## Description 

This is a weather app that allows a user to search for a city and provides up to date current weather info and also a 5 day weather forecast for that city. 


It displays the current weather conditions in that city, the min the max tempreture for that day, humidity, wind speed, UV index, and a icon representing the whether conditions with a text description of the weather conditions showing below the image. A 5-day forecast for that city is displayed below the current day information.
The uv index is also colour coded for how severe the UV is. In addition, once the search button is pressed, a button displaying that search information is created underneath the search field. 

![Web capture_28-10-2022_1318_geezee91 github io](https://user-images.githubusercontent.com/3950562/198511402-0adde4c6-4d46-4ecb-9181-550222d60b3f.jpg)

Also the country of the city you are searching for will be displayed in the results. So that you can be sure the results shown are for the city located in the desired country. 

For example if you simple searched for Rome the app will show you the results for Rome in USA but you may have wanted Rome in Italy. To ensure the intended city is rendered a user can place the country initals after the city name in the search bar.

![rome1](https://user-images.githubusercontent.com/3950562/198512006-b102ee23-e21b-4499-94de-8e3bbe804c82.png)

![rome2](https://user-images.githubusercontent.com/3950562/198511956-40665906-0cc8-423a-9832-c66a11bcb61a.png)

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
<li>On the left side of the weather condition below search active buttons can be clicked on to view results for that city</il>
<il>Click on any of those buttons to retrieve the weather condition for the city name associated to that button.</li>
<li>At page refresh, the current weather conditions will display the last city searched prior to refresh.</li>
<li>Clicking the clear search button will clear the saved search history buttons.</li>
</ul>

## License 
  ![Github license](http://img.shields.io/badge/license-MIT-blue.svg)
 



