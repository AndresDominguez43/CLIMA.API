const api = {
    key: '965af2672919c9a96bec53314dd4f4fd',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card');
const city = document.getElementById('city');
const tempImg = document.getElementById('temp-img');
const weatherImg = document.getElementById('info-Wth');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateBackgroundImage(description) {
    let backgroundImage = 'https://img.freepik.com/foto-gratis/naturaleza-esponjosa-espacio-fondo-aire_1122-2337.jpg?t=st=1722972678~exp=1722976278~hmac=7f7ac752ccafdcbe481d82b6e875c4e563b0dddb02ee9ee1e8a99bae6e264f8a&w=740'; // Imagen por defecto

    if (description.includes('nublado') || description.includes('nuboso')) {
        backgroundImage = 'https://img.freepik.com/foto-gratis/lluvia-negro-abstracto-oscuro-poder_1127-2380.jpg?t=st=1722970318~exp=1722973918~hmac=1e89f9b1afa7a91a9b554b2daa272057406e2221701ec73941a24314ff89cdf3&w=740';
    } 
    else if (description.includes('lluvia')) {
        backgroundImage = 'https://t1.uc.ltmcdn.com/es/posts/4/6/1/que_significa_sonar_con_lluvia_51164_600.webp';
    } else if (description.includes('cielo claro') || description.includes('soleado')) {
        backgroundImage = 'https://img.freepik.com/foto-gratis/nube-cielo-azul_1232-3108.jpg?t=st=1722971506~exp=1722975106~hmac=cf14f77a20cb4a2d76246189f68b14286bf89615e5fa88dd176ded00c35580a4&w=740';
    }

    card.style.backgroundImage = `url(${backgroundImage})`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';
}
async function search(query) {
    try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    card.style.display = 'block';
    city.innerHTML = `${data.name}, ${data.sys.country}`;   
    temp.innerHTML = `${toCelsius(data.main.temp)}&deg;C`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `Minima: ${toCelsius(data.main.temp_min)} &deg;C/Maxima: ${toCelsius(data.main.temp_max)} &deg;C`;
    let src = 'images/temp-mid.png';
    tempImg.src = src;
    updateBackgroundImage(data.weather[0].description);
    
    } catch (err) {
    console.log(err);
    alert('Hubo un error');
    }
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}
const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);
