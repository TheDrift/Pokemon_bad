const $wrapper = document.querySelector('.wrapper');
const $container = document.querySelector('.container');

const BASE_URL = 'https://pokeapi.co/api/v2/'
const limit = 20
let offsetCurrent = 0

const all_pocemons = 1126
const all_page = Math.floor(all_pocemons / limit)
let currentPage = 1

window.addEventListener('load' , () => {
  getData(`${BASE_URL}pokemon` , `limit=${limit}&offset=${offsetCurrent}` , cb => {
    cardTemplate(cb.results)
  })
})

function getData(url , query , cb){
  fetch(`${url}?${query}`)
  .then(res => res.json())
  .then(res => cb(res))
}

function cardTemplate(dataBase){
  // console.log(dataBase);
  const template = dataBase.map(({name , url}) => {
    return `
      <div class='card' onclick='getSingleData("${url}")'>
        ${name}
      </div>
    `
  }).join('')

  $wrapper.innerHTML = template
}

function getSingleData(url){
  getData(url , '' , cb => {
    $container.innerHTML = `
      <div class='single'>
        <div class='singleWrapper'>
          <img src='${cb.sprites.other.dream_world.front_default}' alt='pokemons' />
          <ul>
            <li>
              Name: <span>${cb.name}</span>
            </li>
            <li>
              Weight: <span>${cb.weight}</span>
            </li>
            <li>
              Height: <span>${cb.height}</span>
            </li>
          </ul>
        </div>
        <button onclick='back()' class='back'>Go home</button>
      </div>
    `
  })
}

function back(){
  window.location.reload()
}

const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');
const $currentPage = document.querySelector('.currentPage');
const $allPage = document.querySelector('.allPage');

window.addEventListener('load' , () => {
  $allPage.innerHTML = all_page
  $currentPage.innerHTML = currentPage

  $prev.setAttribute('disabled' , true)
})

$next.addEventListener('click' , e => {
  e.preventDefault()

  if(currentPage === all_page){
    $next.setAttribute('disabled' , true)
  }else {
    currentPage++
  }

  offsetCurrent += limit

  change()

  $prev.removeAttribute('disabled')
  getData(`${BASE_URL}pokemon` , `limit=${limit}&offset=${offsetCurrent}` , cb => {
    cardTemplate(cb.results)
  })
})

$prev.addEventListener('click' , e => {
  e.preventDefault()

  if(currentPage === 1){
    $prev.setAttribute('disabled' , true)
  }else {
    currentPage--
  }

  offsetCurrent -= limit

  change()

  getData(`${BASE_URL}pokemon` , `limit=${limit}&offset=${offsetCurrent}` , cb => {
    cardTemplate(cb.results)
  })
})

function change(){
  $currentPage.innerHTML = currentPage
}