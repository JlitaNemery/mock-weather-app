# Demo weather app

- this is a demo weather app

# Desitions

- data fetching + global state - I used react query to get the mock data and also for the weather data
- weather api - I used a free api "open-meteo" the provided endpoint required credit card info https://api.openweathermap.org/data/2.5/onecall
- the data.json file has data without ids and had "Rio de Janeiro" twice with the same coordinates but different images, I dont know if that was intentional or not but I made the decision to delete one of them instead of displaying two "Rio de Janeiro" and using the image string for the key of the node, I used coordinates as the key, in a real world situation data must have a unique id.
- routing - I used routing params to ditirmine the state of filters and toggles, this way users can navigate smoothly through the app and also share links.
- lazy loading - the city details component is not necessary on first entering the page so I can split the bundle and lazy load it.
- ui - I used chakra ui just to have a simple and nice feel to the app.

# nice additions

if I had more time i would add:

1. testing with vitest and playwrite
2. pixel perfect design
3. getting the cities from an api with pagination and infinate scroll (with react virtualized to not overload the dom)
4. log in
5. dark / light mode
