// API Credentials 
// apiKey and apiHost are needed to authenticate requests to the movie DB 
const apiKey = '0803485a36msh3ba90d2d2756c7ep188014jsn6cf16a906b51'; 
const apiHost = 'online-movie-database.p.rapidapi.com';

async function getMovies() {

  // Make API request
  // Pass apiKey and apiHost in headers for authentication 
  const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=adventure%20movie';
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };
  
  const response = await fetch(url, options);
  const data = await response.json();

  // Extract movie data
  const movies = [];
  
// Extract just the movie name and poster URL
// And store in an array to return

  data.d.forEach(movie => {
    const name = movie.l;
    const poster = movie.i.imageUrl;
    movies.push({
      name, 
      poster
    });
  });

  return movies;

}

// Display the movies on the page 
function displayMovies(movies) {
  const movieContainer = document.querySelector('.movies'); // Get container element
  
  movies.forEach(movie => { // Loop through movies

    // Create HTML for each one
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.name}">
      <h3>${movie.name}</h3>
    `;
    movieContainer.appendChild(movieElement);  // Add to container
  });
}

// Initial call to fetch movies from API and display
getMovies().then(movies => {
  displayMovies(movies);
});

