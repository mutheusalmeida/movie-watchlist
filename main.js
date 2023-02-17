import { app } from './app'
import './style.css'

document.querySelector('[data-js="root"]').innerHTML = `
  <div class="app">
    <header class="app__header">
        <h1 class="app__title" title="Find your film">
            <a href="/">Find your film</a>
        </h1>
        
        <a href="/watchlist.html" class="app__link">My watchlist</a>
    </header>

    <main class="content content-empty">
        <form class="search" data-js="search-form">
            <div class="search__input-wrapper">
                <svg class="search__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#9CA3AF"/>
                </svg>

                <input required name="search" class="search__input" type="search" placeholder="Search for a movie" />
            </div>
            
            <button class="search__btn" type="submit">Search</button>
        </form>
        
        <div data-js="content-container" class="content__wrapper">
            <div class="empty">
                <svg class="empty__icon" width="70" height="62" viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0C3.91751 0 0 3.9175 0 8.75V52.5C0 57.3325 3.91751 61.25 8.75 61.25H61.25C66.0825 61.25 70 57.3325 70 52.5V8.75C70 3.9175 66.0825 0 61.25 0H8.75ZM21.875 8.75H48.125V26.25H21.875V8.75ZM56.875 43.75V52.5H61.25V43.75H56.875ZM48.125 35H21.875V52.5H48.125V35ZM56.875 35H61.25V26.25H56.875V35ZM61.25 17.5V8.75H56.875V17.5H61.25ZM13.125 8.75V17.5H8.75V8.75H13.125ZM13.125 26.25H8.75V35H13.125V26.25ZM8.75 43.75H13.125V52.5H8.75V43.75Z" fill="#2E2E2F"/>
                </svg>
                
                <h3 class="empty__title">Start exploring</h3>
            </div>
        </div>
    </main>
  </div>
`

app()
