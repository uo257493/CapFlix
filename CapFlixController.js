

const API_KEY = "7bdea3a6";
const URL_ALL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;
const URL_DETAIL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=`;
var lastQuery =""

const result = document.getElementById('result');

function searchMovies() {
    lastQuery = document.getElementById("titulo").value;
    console.log(lastQuery);
    getMovies(lastQuery)
}

async function fetchMovies(query) {
    const respuesta = await fetch(URL_ALL+query, {
        method: 'GET', 
    mode: 'cors', 
    credentials: 'same-origin', 
    referrerPolicy: 'no-referrer'
    })
    
   
    return respuesta.json();
}

async function fetchmovie(query){

    const respuesta = await fetch(URL_DETAIL+query, {
        method: 'GET', 
    mode: 'cors', 
    credentials: 'same-origin', 
    referrerPolicy: 'no-referrer'
    })
    
   
    return respuesta.json();
}

function getMovies(query) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    let movies= [];
    fetchMovies(query).then(response => movies = response.Search.forEach(movie => {
        let div = document.createElement("div");
        div.className = "col-1 movie"
        let img = document.createElement("img");
        img.src = movie.Poster;
        img.className = "img-fluid"
        img.onclick = function () {
            getDetail(movie);
        };
        div.appendChild(img);
        document.getElementById("result").appendChild(div);
    }))



    
}

function getMovie(query) {
    console.log("desde getmovie");
    fetchmovie(query).then(response => {
        document.getElementById("result").innerHTML = "";
        let img = document.createElement("img");
        img.className = "img-fluid";
        img.src = response.Poster;
        let div = document.createElement("div");
        div.className="card"
        let title = document.createElement("div");
        title.className = "card-title";
        let h1 = document.createElement("h1")
        h1.innerHTML = response.Title;
        title.appendChild(h1);
        div.appendChild(title);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        let year = document.createElement("p");
        year.innerHTML = response.Year
        cardBody.appendChild(year);
        let genre = document.createElement("p")
        genre.innerHTML = response.Genre
        cardBody.appendChild(genre)
        let director = document.createElement("p");
        director.innerHTML = "Directed by "+response.Director;
        cardBody.appendChild(director);
        let actors = document.createElement("p");
        actors.innerHTML = "Starring: "+response.Actors;
        cardBody.appendChild(actors);
        let plot = document.createElement("p");
        plot.innerHTML = "'"+response.Plot+"'";
        cardBody.appendChild(plot)
        let back = document.createElement("button");
        back.className ="btn btn-outline-secondary";
        back.innerHTML ="Back";
        back.onclick = function () {
            getMovies(lastQuery);
        }
        cardBody.appendChild(back)
        div.appendChild(cardBody)

        document.getElementById("result").appendChild(img);
        document.getElementById("result").appendChild(div);
        console.log(response)});
}


function getDetail(movie) {
    getMovie(movie.Title);

}
