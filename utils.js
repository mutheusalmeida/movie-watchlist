const renderData = (isLoading, hasError, container, data) => {
  if (isLoading) {
      container.innerHTML = `
          <ul class="film-list">
              Loading...
          </ul>
      `
      
      return
  }
  
  if (hasError) {
      container.innerHTML = `
          <div class="empty">
              <h3 class="empty__title empty__title--no-results">Unable to find what you’re looking for. Please try another search.</h3>
          </div>
      `
      
      return
  }
  
  
  if (data.length === 0) {
      container.innerHTML = `
          <div class="empty empty--no-items">
              <h3 class="empty__title empty__title--no-items">Your watchlist is looking a little empty...</h3>
              
              <a href="/" class="empty__add-to-watchlist">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.125 5.625C10.125 5.00368 9.62132 4.5 9 4.5C8.37868 4.5 7.875 5.00368 7.875 5.625V7.875H5.625C5.00368 7.875 4.5 8.37868 4.5 9C4.5 9.62132 5.00368 10.125 5.625 10.125H7.875V12.375C7.875 12.9963 8.37868 13.5 9 13.5C9.62132 13.5 10.125 12.9963 10.125 12.375V10.125H12.375C12.9963 10.125 13.5 9.62132 13.5 9C13.5 8.37868 12.9963 7.875 12.375 7.875H10.125V5.625Z" fill="white"/>
                  </svg>

                  Let’s add some movies!
              </a>
          </div>
      `
      
      return
  }
  
  container.classList.add('justify-start')
  const hasAlternativeBorder = window.location.pathname.includes('/watchlist/')
  
  container.innerHTML = `
      <ul class="film-list">
          ${data.map(item => (
              `
                  <li class="film-list__item">
                      <div class="film ${hasAlternativeBorder ? 'gray-border' : ''}">
                          <img class="film__img" src="${item.Poster}" alt="${item.Title} poster" />
                          
                          <div class="film__content">
                              <div class="film__title-wrapper">
                                  <h4 class="film__title">${item.Title}</h4>
                                  
                                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53914L9.66537 7.06497C9.40251 7.25595 9.29251 7.59448 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                                  </svg>

                                  <span class="film__rating">${item.imdbRating}</span>
                              </div>
                          
                              <div class="film__details-wrapper">
                                  <span>${item.Runtime}</span>
                                  
                                  <span>${item.Genre}</span>
                                  
                                  <button data-id="${item.imdbID}" class="film__add-to-watchlist">
                                      ${item.watchlist ? (
                                          `
                                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="white"/>
                                              </svg>
                                          `
                                      ) : (
                                          `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
                                          </svg>`
                                      )}

                                      <span>${item.watchlist ? `Remove` : `Watchlist`}</span>
                                  </button>
                              </div>
                              
                              <div class="film__desc">
                                  ${item.Plot.length > 133 && !item.isPlotExpanded ? item.Plot.slice(0, 133) + `... <button data-id="${item.imdbID}" class="film__read-more">Read more</button>` : item.Plot}
                              </div>
                          </div>
                      </div>
                  </li>
              `
          )).join('')}
      </ul>
  `
}

const handleReadMoreClick = (e, data, render) => {
  const id = e.target.classList.contains('film__read-more') ? e.target.dataset.id : null
  
  if (!id) return
  
  data = data.map(item => {
      if (item.imdbID === id) {
          return {
              ...item,
              isPlotExpanded: true
          }
      }
      
      return item
  })

  render(data)
}

const handleAddToWatchlist = (e, data, render, setLocalStorage) => {
  const id = e.target.parentNode.classList.contains('film__add-to-watchlist') ? e.target.parentNode.dataset.id : null
  
  if (!id) return
  
  data = data.map(item => {
      if (item.imdbID === id) {
          return {
              ...item,
              watchlist: !item.watchlist
          }
      }
      
      return item
  })
  
  render(data)
  setLocalStorage(id)
}

const handleLocalStorage = (id, data, render) => {
  let movies = []
  
  if (localStorage.getItem('watchlist')) movies = JSON.parse(localStorage.getItem('watchlist'))
  
  const toWatch = data.find(item => item.imdbID === id)
  
  if (toWatch.watchlist && !movies.find(item => item.imdbID === id)) {
      movies = [toWatch, ...movies]
      localStorage.setItem('watchlist', JSON.stringify(movies))
      
      return
  }
  
  if (movies.find(item => item.imdbID === id)) {
      movies = movies.filter(item => item.imdbID !== id)
      
      localStorage.removeItem('watchlist')
      localStorage.setItem('watchlist', JSON.stringify(movies))
  }
  
  data = movies
  render(data)
}

export { renderData, handleReadMoreClick, handleAddToWatchlist, handleLocalStorage }
