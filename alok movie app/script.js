//https://omdbapi.com/?s=thor&page=1&apikey=97c1c428
//http://www.omdbapi.com/?i=tt3896198&apikey=97c1c428

const searchInput = document.getElementsByClassName('search-input');
const searchForm = document.querySelector('.search-form');
const searchlist = document.getElementById('search-list');
const searchResult = document.querySelector('.search-result');

//Fetching data
async function loadMovies(searchText){
    const URL = `https://omdbapi.com/?s=${searchText}&page=1&apikey=97c1c428`;
    const result = await fetch(`${URL}`);
    const data = await result.json();
    createSearchList(data.Search);
}
// geting input text from input
const getInputValue = (e)=>{
    e.preventDefault();
    searchResult.classList.remove('hide');
    let searchText = searchForm.search.value;
    loadMovies(searchText.trim());
}

// search submission

searchForm.addEventListener('submit',getInputValue);
// create card
function createSearchList(data)
{
    console.log(data.length)
    if(data.length<=0)
    {

    }
    else{
        for (let i = 0; i < data.length && i < 10; i++) {
        
            // creating result-item container
            let resultItem =document.createElement('div');
            resultItem.classList.add('result-item');
            let movieImg = document.createElement('img');
            let contentDiv = document.createElement('div');
            contentDiv.classList.add('div');
            const movieName = document.createElement('h3');
            movieName.classList.add('result-item-name');
            const movieYear = document.createElement('p');
            movieYear.classList.add('result-item-year');
            movieYear.classList.add('orange');

            // add movie name
            movieName.innerText = data[i].Title;
            contentDiv.appendChild(movieName);
            
            // add movie year
            movieYear.innerText = data[i].Year;
            contentDiv.appendChild(movieYear);
            
            // add movie img
            if(data[i].Poster != 'N/A')
                movieImg.src = data[i].Poster;
            else{
                movieImg.src = './image/imageNotFound.png'
            }
            resultItem.appendChild(movieImg);
            resultItem.appendChild(contentDiv);
            searchResult.appendChild(resultItem);
            searchResult.style.border='2px solid orange';
            let movieId=data[i].imdbID;
            resultItem.addEventListener('click',()=>{
                movieDetailContent(data[i]);  
                console.log(data[i]);             
            })
        }        
    }
}


// movie details content
function movieDetailContent(data)
{
    searchResult.classList.add('hide');

    if(data.Poster != 'N/A')
        document.querySelector('.movie-img').src = data.Poster;
    else{
        document.querySelector('.movie-img').src = './image/imageNotFound.png'
    }
    // movie name
    document.querySelector('.movie-name').innerText=data.Title;
    // movie year
    document.querySelector('.year-content').innerText=data.Year;
    // rating
    document.querySelector('.rating-content').innerText=data.Rated;
    // movie relaeased
    document.querySelector('.releases-content').innerText=data.Released;
    // movie genre
    document.querySelector('.genre-content').innerText=data.Genre;
    // movie writer
    document.querySelector('.writer-content').innerText=data.Director;
    // movie plot
    document.querySelector('.plot-content').innerText=data.Plot;
    // movie language
    document.querySelector('.language-content').innerText=data.Language;
    // movie award
    document.querySelector('.award-content').innerText=data.Awards;
}
document.addEventListener('click',()=>{
    document.querySelectorAll('.result-item').forEach(result=>{
        result.classList.add('hide');
    })
})