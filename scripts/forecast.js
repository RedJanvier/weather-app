const key = 'dB6qhiR7YIYeht9QZuDCreUu2H7RFgFG';

const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

const getWeather = async (localKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${localKey}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};
