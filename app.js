import { renderData, handleReadMoreClick, handleAddToWatchlist, handleLocalStorage } from './utils.js'

export const app = () => {
  const searchForm = document.querySelector('[data-js="search-form"]')
  const contentContainer = document.querySelector('[data-js="content-container"]')
  let result = []
  let isLoading = false
  let hasError = false

  const getMovies = async (e) => {
      e.preventDefault()
      const search = searchForm.elements['search'].value
      
      if (!search) return
      
      try {
          isLoading = true
          renderData(isLoading, hasError, contentContainer, result)
          const res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=6f8cdf3e`)
          const data = await res.json()
          const moviesPromise = data.Search.map(item => fetch(`https://www.omdbapi.com/?t=${item.Title}&apikey=6f8cdf3e`).then(res => res.json()))
          const allData = Promise.all(moviesPromise)
          const movies = await allData
          result = movies.map(item => ({ ...item, isPlotExpanded: false, watchlist: false }))
          hasError = false
      } catch {
          hasError = true
          renderData(isLoading, hasError, contentContainer, result)
      } finally {
          isLoading = false
          let localData = []
          
          if (localStorage.getItem('watchlist')) localData = JSON.parse(localStorage.getItem('watchlist'))
          
          result = result.map(item => {
              const toWatch = localData.find(data => data.imdbID === item.imdbID)
              
              if (toWatch) {
                  return toWatch
              }
              
              return item
          })
          
          renderData(isLoading, hasError, contentContainer, result)
      }
  }

  contentContainer.addEventListener('click', (e) => handleReadMoreClick(e, result, (data) => {
      result = data
      renderData(isLoading, hasError, contentContainer, result)
  }))
  contentContainer.addEventListener('click', (e) => handleAddToWatchlist(e, result, (data) => {
      result = data
      renderData(isLoading, hasError, contentContainer, result)
  }, (id) => handleLocalStorage(id, result)))

  searchForm.addEventListener('submit', getMovies)
}
