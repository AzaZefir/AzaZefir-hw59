import './index.html';
import './styles/styles.css';

import MovieList from './js/components/movie-list';
import moviesService from './js/movies-service';


const input = document.querySelector('.search-input');
const movieList = document.querySelector('.movies')
const list = new MovieList();

input.addEventListener('input', e => {
    const searchText = e.target.value;

    if (!searchText) {
        list.clearList(movieList);
        return;
    }

        moviesService.getVideoByText(searchText)
            .then(result => {
                list.renderMovies(result);


                list.drawToDom(movieList)
            })
});