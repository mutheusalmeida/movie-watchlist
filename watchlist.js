import { renderData, handleReadMoreClick, handleAddToWatchlist, handleLocalStorage } from './utils.js'
import './style.css'

document.querySelector('[data-js="root"]').innerHTML = `
  <div class="app">
    <header class="app__header">
        <h1 class="app__title" title="My Watchlist">
            <a href="/watchlist.html">My Watchlist</a>
        </h1>
        
        <a href="/" class="app__link">Search for movies</a>
    </header>

    <main class="content">
        <div data-js="content-container" class="content__wrapper"></div>
    </main>
  </div>
`

const contentContainer = document.querySelector('[data-js="content-container"]')
let watchlist = []
let isLoading = false
let hasError = false

const loading = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

const getWatchlist = async () => {
    try {
        isLoading = true
        renderData(isLoading, hasError, contentContainer, watchlist)
        let movies = []
        
        await loading(2)
        
        if (localStorage.getItem('watchlist')) movies = JSON.parse(localStorage.getItem('watchlist'))
        
        watchlist = movies
        hasError = false
    } catch {
        hasError = true
        renderData(isLoading, hasError, contentContainer, watchlist)
    } finally {
        isLoading = false    
        renderData(isLoading, hasError, contentContainer, watchlist)
    }
}

contentContainer.addEventListener('click', (e) => handleReadMoreClick(e, watchlist, (data) => {
    watchlist = data
    renderData(isLoading, hasError, contentContainer, watchlist)
}))

contentContainer.addEventListener('click', (e) => handleAddToWatchlist(e, watchlist, (data) => {
    watchlist = data
    renderData(isLoading, hasError, contentContainer, watchlist)
}, (id) => handleLocalStorage(id, watchlist, (data) => {
    watchlist = data
    renderData(isLoading, hasError, contentContainer, watchlist)
})))

getWatchlist()
