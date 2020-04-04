const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const loader = card.querySelector('.loader');
const details = document.querySelector('.details');
const time = card.querySelector('.time');
const icon = card.querySelector('.icon > img');

const addLoaderToCard = () => {
    loader.classList.remove('d-none');
    time.setAttribute('src', '');
    icon.setAttribute('src', '');
    details.innerHTML = '';
    card.classList.remove('d-none');
}

const removerLoaderFromCard = () => loader.classList.add('d-none');

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
};

const updateUI = async ({cityDets, weather}) => {
    localStorage.setItem('cityDets', JSON.stringify(cityDets));
    localStorage.setItem('weather', JSON.stringify(weather));
    const weatherIcon = weather.WeatherIcon;
    const weatherTime = (weather.IsDayTime)? 'day': 'night';

    removerLoaderFromCard();

    time.setAttribute('src', `img/${weatherTime}.svg`);
    icon.setAttribute('src', `img/icons/${weatherIcon}.svg`);

    details.innerHTML =`
        <h5 class="my-2">${cityDets.EnglishName}</h5>
        <div class="my-2 conditions">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
        </div> 
    `;
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    addLoaderToCard();
    
    updateCity(city).then(data =>{
        updateUI(data);
    }).catch(err => {
        removerLoaderFromCard();
        console.log(err.message);
        details.innerHTML = `<h2 class="my-5 mx-auto text-danger">${err.message}</h2>`
    });

    cityForm.reset();
});
