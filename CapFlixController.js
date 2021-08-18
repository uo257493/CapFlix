

const API_KEY = "1e1e7271";
const URL_ALL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;
const URL_DETAIL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=`;
var lastQuery =""
var maxPages = 101;
var currentPage = 1;

const result = document.getElementById('result');

function searchMovies() {
    currentPage = 1;
    maxPages = 101
    lastQuery = document.getElementById("titulo").value;
    while (currentPage <= 5){
    getMovies(lastQuery, currentPage)
    currentPage++;
    console.log(currentPage);
    }
}

function searchLast(){
    currentPage = 1
    console.log(currentPage);
    console.log(lastQuery);
    while (currentPage <= maxPages){
        getMovies(lastQuery, currentPage)
        currentPage++;
        console.log(currentPage);
        }
}

async function fetchMovies(query, page) {
    const respuesta = await fetch(URL_ALL+query+"&page="+page, {
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

async function getMovies(query, page) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    let movies= [];

    let row = document.createElement("div");
    row.className = "flex-row d-flex justify-content-center";

   await fetchMovies(query, page).then(response => {
    if(maxPages==NaN||maxPages==101)
        maxPages = Math.floor(response.totalResults/10);

        console.log(maxPages);
        if(response.Search!=undefined){
            movies = response.Search.forEach(movie => {
                let container = document.createElement("div");
                container.className = "container movieContainer";
                let div = document.createElement("div");
                div.className = "col movie"
                let img = document.createElement("img");
                img.src = movie.Poster;
                img.className = "img-fluid"
                img.onclick = function () {
                    getDetail(movie);
                };
                div.appendChild(img);
                container.appendChild(div)
                row.appendChild(container);
            })
        } })
    document.getElementById("result").appendChild(row);


    
}

function getMovie(query) {
    console.log("desde getmovie");
    fetchmovie(query).then(response => {

        document.getElementById("result").innerHTML = "";
        let row = document.createElement("div")
        row.className = "flex-row d-flex justify-content-center";
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
            searchLast();
        }
        cardBody.appendChild(back)
        div.appendChild(cardBody)

        row.appendChild(img)
        row.appendChild(div);
        document.getElementById("result").appendChild(row);
        console.log(response)});
}


function getDetail(movie) {
    getMovie(movie.Title);

}
