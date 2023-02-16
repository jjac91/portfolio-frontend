Weather Advisor

Deployed at : https://dennisweather.surge.sh/ with the backend hosted on heroku at https://dennis-weather-app.herokuapp.com/

Weather Advisor gives the weather and advice for that weather for a location chosen by the user.

The features are as follows:

The ability to create and log in and out with a user account. I implemented this to allow users to have saved locations to make future visits simpler and easier. The user account is also saved in localstorage to further simplify visiting the site.

The ability to look up a location from a basic search term and then get the weather for that location as well as relevant. This is the main feature of the site and its main purpose.

The ability to save a location to a user account. This was implemented to allow users to easily check the weather for a location without having to look up the location again.

Tests for the frontend are contained in the same folders as their source components and can be run with npm test. Likewise the tests for the backend are located in the folder with the relevant function. They should be run with jest --i

The standard user flow is as follows:
Upon first entering the site a new user should create an account.
Afterwards they can go to the new location page and search a location.
If the correct location is found they can label the location and save it to their account.
Then they can go to their saved locations and click on the desired location to see its weather and relevant advice for that weather.

This website relies on 2 apis:
https://geocode.xyz/api This is a free geolocation api, it will occasionally return a 403 if under heavy use because it can only handle 1 free user request per second globally 

https://openweathermap.org/api/one-call-3

This website was made with a React frontend and a Node Express backend