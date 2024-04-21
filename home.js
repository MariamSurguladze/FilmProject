const apiKey = "f5350b80";
const baseUrl = "http://www.omdbapi.com/";
const searchInput = document.getElementById("search");
const card = document.querySelector(".movie-card");
const searchButton = document.querySelector(".search");
const overlay = document.querySelector(".overlay"); 

searchInput.addEventListener("change", async (event) => {
  const searchTerm = event.target.value;
  const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${searchTerm}`);
  const data = await response.json();

  if (data.Search && data.Search.length > 0) {
    const firstResult = data.Search[0];
    const movieId = firstResult.imdbID;
    const movieResponse = await fetch(
      `${baseUrl}?apikey=${apiKey}&i=${movieId}`
    );
    const movieData = await movieResponse.json();

    if (movieData.Poster !== "N/A") {card.querySelector(".img").style.backgroundImage = `url(${movieData.Poster})`;
    } else {
      card.querySelector(".img").style.backgroundImage = "url(default_poster_url)"};
      card.querySelector(".rating").textContent = `Rating: ${movieData.imdbRating}`;
      card.querySelector(".title").textContent = movieData.Title;
      card.querySelector(".description").textContent = movieData.Plot;
      card.style.display = "block";
      overlay.style.display = "block";
      card.classList.add("dropdown");
  } else {
    card.querySelector(".img").style.backgroundImage = "";
    card.querySelector(".rating").textContent = "";
    card.querySelector(".title").textContent = "No results found";
    card.querySelector(".description").textContent = "";
    card.style.display = "";
    overlay.style.display = "";
  }
});



function createMovieCard(movieData) {
  const card = document.createElement("div");
  card.classList.add("top-movies-card");

  card.addEventListener("click", () => {
    window.location.href = "./movie.html"; 
  });

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("top-movies-img");
  if (movieData.Poster !== "N/A") {
    imgDiv.style.backgroundImage = `url(${movieData.Poster})`;
  } else {
    imgDiv.style.backgroundImage = "url(default_poster_url)";
  }

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("top-movies-content");

  const rating = document.createElement("h6");
  rating.classList.add("top-movies-rating");
  rating.textContent = movieData.imdbRating;

  const title = document.createElement("h3");
  title.classList.add("top-movies-title");
  title.textContent = movieData.Title;

  const starContainer = document.createElement("div");
  starContainer.classList.add("star-container1");
  for (let i = 0; i < 4; i++) {
    const star = document.createElement("span");
    star.classList.add("fa", "fa-star", "checked");
    starContainer.appendChild(star);}
  const halfStar = document.createElement("span");
  halfStar.classList.add("fa", "fa-star-half", "checked");
  starContainer.appendChild(halfStar);

  const released = document.createElement("h5");
  released.classList.add("top-movies-released");
  released.textContent = movieData.Released;

  const plot = document.createElement("p");
  plot.classList.add("top-movies-plot");
  plot.textContent = movieData.Plot;

  contentDiv.appendChild(rating);
  contentDiv.appendChild(title);
  contentDiv.appendChild(starContainer);
  contentDiv.appendChild(released);
  contentDiv.appendChild(plot);

  card.appendChild(imgDiv);
  card.appendChild(contentDiv);

  return card;
}
async function fetchAndDisplayMovies(movieIds) {
  const movieResponses = await Promise.all(movieIds.map(id =>
    fetch(`${baseUrl}?apikey=${apiKey}&i=${id}`)
  ));
  const movieDataList = await Promise.all(movieResponses.map(response => response.json()));

  const topMoviesContainer = document.querySelector(".top-movies-container");
  topMoviesContainer.innerHTML = "";

  movieDataList.forEach(movieData => {
    const movieCard = createMovieCard(movieData);
    topMoviesContainer.appendChild(movieCard);
  });
}

const movieIds = ["tt0068646", "tt0109830", "tt0816692", "tt3170832"]; 
fetchAndDisplayMovies(movieIds);



