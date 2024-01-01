// API Credentials
// apiKey and apiHost needed to call the movie API 

const apiKey = '0803485a36msh3ba90d2d2756c7ep188014jsn6cf16a906b51'; 
const apiHost = 'online-movie-database.p.rapidapi.com';

async function getMovies() {

  // API request
  // Search for comedy movies 

  const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=comedy%20movie';
  
  // Make API request
  // key and host

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };
  
    // Make request and parse response

  const response = await fetch(url, options);
  const data = await response.json();

  // Extract movie data
  const movies = [];
  
  // Get movie name, title and poster if avaialable (took me a good 2 hours to realize)
  data.d.forEach(movie => {
    const name = movie.l;
    const poster = movie.i?.imageUrl;

    // Add to list
    movies.push({
      name, 
      poster
    });
  });

  return movies;

}

// Display movies
function displayMovies(movies) {
  const movieContainer = document.querySelector('.movies');  // Get container

  // Loop through movies
  movies.forEach(movie => {
    const movieElement = document.createElement('div');  // Create HTML

    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.name}">
      <h3>${movie.name}</h3>
    `;
    movieContainer.appendChild(movieElement); 
  });
}

// Initial call to fetch and show movies

getMovies().then(movies => {
  displayMovies(movies);
});