//Inicial reference
let movieNameRef = document.getElementById("movie-name"); 
let searchBtn = document.getElementById("search-btn"); 
let result = document.getElementById("result"); 

//Funcions to feach data from api
let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`; 
    //if input
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class "msg">Place Enter A Movie Name</h3>`; 
    }
    else{
        fetch(url)
         .then((resp) => resp.json())
         .then((data) => {
            //if movie existis 
            if(data.Response == "True"){
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                `; 
            }
            //if movie does not existis
            else{
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
            }
         })
         //if error
         .catch(() => {
            result.innerHTML = `<h3 class='msg'>Error Ocurred</h3>`;
         }); 
    }
}; 
searchBtn.addEventListener("click", getMovie); 
window.addEventListener("load", getMovie);