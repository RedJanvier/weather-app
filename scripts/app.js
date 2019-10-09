const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
};

const updateUI = async ({cityDets, weather}) => {
    localStorage.setItem('cityDets', JSON.stringify(cityDets));
    localStorage.setItem('weather', JSON.stringify(weather));
    const time = card.querySelector('.time');
    const icon = card.querySelector('.icon > img');
    const weatherIcon = weather.WeatherIcon;
    const weatherTime = (weather.IsDayTime)? 'day': 'night';

    time.setAttribute('src', `img/${weatherTime}.svg`);
    icon.setAttribute('src', `img/icons/${weatherIcon}.svg`);

    details.innerHTML =`
        <h5 class="my-4">${cityDets.EnglishName}</h5>
        <div class="my-4 conditions">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
        </div> 
    `;
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
};

// if(localStorage.length){
//     localStorage.setItem('cityDets', JSON.stringify(cityDets));
//     localStorage.setItem('weather', JSON.stringify(weather));
//     const time = card.querySelector('.time');
//     const icon = card.querySelector('.icon > img');
//     const weatherIcon = weather.WeatherIcon;
//     const weatherTime = (weather.IsDayTime)? 'day': 'night';
//     const w = localStorage.getItem('weather');
//     const c = localStorage.getItem('cityDets');

//     time.setAttribute('src', `img/${weatherTime}.svg`);
//     icon.setAttribute('src', `img/icons/${weatherIcon}.svg`);

//     details.innerHTML =`
//         <h5 class="my-4">${JSON.parse(c).EnglishName}</h5>
//         <div class="my-4 conditions">${JSON.parse(w).WeatherText}</div>
//         <div class="display-4 my-4">
//             <span>${JSON.parse(w).Temperature.Metric.Value}</span>
//             <span>&deg;c</span>
//         </div> 
//     `;
//     if(card.classList.contains('d-none'))
//         card.classList.remove('d-none');
// };

// }

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city =  cityForm.city.value.trim();
    
    updateCity(city).then(data =>{
            updateUI(data);
        }).catch(err => {
            console.log(err.message);
        });

    cityForm.reset();
});
