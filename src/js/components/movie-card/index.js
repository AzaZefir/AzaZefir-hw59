import config from "../../config";

const listWrapper = document.querySelector('.list-wrapper');
const movieWrapper = document.querySelector('.movie-wrapper');


function renderMovie(data) {
    const mappingData = mapData(data);
    const html = `
    <a class='back'>back</a>
    <a href='${data.id}' class='movie-link'>
    <h2 class='movie-title'>${mappingData.title}</h2>
    <date class='date'>${mappingData.date}</date>
    <div class='country'>${mappingData.country}</div>
    <div class='picture'><img src='${mappingData.img}'></div>
    <div class='language'>${mappingData.language}</div>
    <div class='overview'>${mappingData.overview}</div>
    <div class='popularity>${mappingData.popularity}</div>
    <div class='popularity>${mappingData.episodesCount}</div>
    <div class='popularity>${mappingData.seasonsCount}</div>
    <div class='popularity>${mappingData.homeUrl}</div>
    </a>
    `;

    render (html);
}

function mapData(data) {
    const defaultValue = 'Unknown';

    return {
        title: data.title || data.original_name || defaultValue,
        date: data.release_date || data.first_air_date || defaultValue,
        country: data.origin_country || defaultValue,
        img: getPictureUrl(),
        language: data.original_language || defaultValue,
        overview: data.overview || defaultValue,
        popularity: data.popularity || defaultValue,
        id: data.id || Date.now(),
        episodesCount: data.number_of_episodes,
        seasonsCount: data.number_of_seasons,
        homeUrl: data.homepage
    }

    function getPictureUrl() {
        const url = data.backdrop_path || data.poster_path;

        if (url) {
            return config.imageSrc + url;
        } else {
            return config.noImageSrc;
        }
    }
}

function render(html) {
    const element = document.createElement('article');

    element.classList.add('movie');
    element.innerHTML = html;
    movieWrapper.style.display = 'block';
    listWrapper.style.display = 'none';
    movieWrapper.innerHTML = '';
    movieWrapper.appendChild(element);

    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', back);
}

function back() {
    listWrapper.style.display = 'block';
    movieWrapper.style.display = 'none';
}

export default {
    renderMovie
}