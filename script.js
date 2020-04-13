const APIKEY = 'apikey=540602d0';
const URL = 'http://www.omdbapi.com/?';

let ref_btn_movie = document.getElementById('btn-movie');
let ref_input_movie = document.getElementsByTagName('input')[0];
let ref_slider = document.getElementById('slider');
let ref_spinner = $('.spinner')[0];
let ref_ol = $('ol')[0]
let ref_arrows = $('a')

let movies = [];
let movies_details = [];
let id;
let index = 0;

let title = $('#title')[0];
let plot = $('#plot')[0];
let actors = $('#actors')[0];
let year = $('#year')[0];
let runtime = $('#runtime')[0];
let type = $('#type')[0];
let genre = $('#genre')[0];
let released = $('#released')[0];

ref_btn_movie.addEventListener('click', e => {
    e.preventDefault();
    show_spinner(true);
    clear_data(); // limpio la busqueda anterior.
    fetch_movie();
})

function fetch_movie() {
    fetch(`index.php?pelicula=${ref_input_movie.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response == 'False') {
                title.innerHTML = 'Sin resultados';
                $('#carousel').carousel('dispose');
                return;
            }
            movies = data.Search;
            fetch_detalles();
        })
}

function fetch_detalles() {
    if (index == movies.length) {
        index--
        append_data();
        return
    }
    id = movies[index].imdbID;
    push_detalles(id)
}

function push_detalles(id) {
    fetch(`${URL}${APIKEY}&i=${id}`)
        .then(res => res.json())
        .then(data => {
            movies_details.push(data);
            index++;
            fetch_detalles();
        })
}

function append_data() {
    for (let i = 0; i < movies.length; i++) {
        let child = create_slider_item(movies_details[i].Poster, i);
        ref_slider.appendChild(child);
    }
    append_movie_details(0, movies_details);
    $('#carousel').carousel();
    $('#carousel').on('slide.bs.carousel', function (event) {
        append_movie_details(event.to, movies_details);
    })
    show_spinner(false);
}

function create_slider_item(imagen, i) {

    create_slider_item.first_item == undefined ? create_slider_item.first_item = true : null;

    let div = document.createElement('div');
    div.className = ('carousel-item');

    let li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', i);

    ref_ol.appendChild(li);

    let img = document.createElement('img');
    imagen != 'N/A' ? img.src = imagen : img.src = 'no-disponible.jpeg';
    img.className = 'd-block w-100';

    if (create_slider_item.first_item) {
        div.classList.add('active');
        li.classList.add('active');
        create_slider_item.first_item = false;
    }
    div.appendChild(img);
    ref_arrows[0].style.display = 'flex';
    ref_arrows[1].style.display = 'flex';
    return div;
}

function append_movie_details(index, data) {
    title_ = data[index].Title;
    plot_ = data[index].Plot;
    actors_ = data[index].Actors;
    year_ = data[index].Year;
    runtime_ = data[index].Runtime;
    type_ = data[index].Type;
    genre_ = data[index].Genre;
    released_ = data[index].Released;

    title.innerHTML = title_;
    plot.innerHTML = plot_;
    actors.innerHTML = actors_;
    year.innerHTML = year_;
    runtime.innerHTML = runtime_;
    type.innerHTML = type_;
    genre.innerHTML = genre_;
    released.innerHTML = released_;
}

function clear_data() {
    $('#carousel').carousel('pause');
    movies = [];
    movies_details = [];
    index = 0;
    title.innerHTML = '';
    plot.innerHTML = '';
    actors.innerHTML = '';
    year.innerHTML = '';
    runtime.innerHTML = '';
    type.innerHTML = '';
    genre.innerHTML = '';
    released.innerHTML = '';
    ref_slider.innerHTML = '';
    create_slider_item.first_item = undefined; // reset de la propiedad.
}

function show_spinner(status) {
    status ? ref_spinner.style.display = 'block' : ref_spinner.style.display = 'none';
}
