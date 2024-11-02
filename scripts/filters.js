import { pieces, generateCards } from './pieces.js'

function generateButtons() {
    const divFilters = document.querySelector(".filters")
    divFilters.classList.add('filters')
    divFilters.innerHTML = ""
    const divFiltersTitle = document.createElement('h3')
    divFiltersTitle.classList.add('h3')
    divFiltersTitle.innerText = 'Filtres'
    divFilters.appendChild(divFiltersTitle)
    
    const minMaxPriceInputLabel = document.createElement('label')
    minMaxPriceInputLabel.innerText = 'Prix max'
    const minMaxPriceInput = document.createElement('input')
    minMaxPriceInput.id = 'minMaxPriceRange'
    minMaxPriceInput.type = 'range'
    minMaxPriceInput.min = 0
    minMaxPriceInput.max = 60
    minMaxPriceInput.value = 60
    minMaxPriceInput.step = 5
    
    const btnSortPriceAsc = document.createElement('button')
    btnSortPriceAsc.innerText = 'Trier par prix croissant' 
    btnSortPriceAsc.classList.add('btnSortPriceAsc')

    const btnSortPriceDesc = document.createElement('button')
    btnSortPriceDesc.innerText = 'Trier par prix décroissant'
    btnSortPriceDesc.classList.add('btnSortPriceDesc')

    const btnWithDescr = document.createElement('button')
    btnWithDescr.innerText = 'Masquer les pièces sans description'
    btnWithDescr.classList.add('btnWithDescr')

    const btnTooExp = document.createElement('button')
    btnTooExp.innerText = 'Masquer les pièces trop chères'
    btnTooExp.classList.add('btnTooExp')
    
    divFilters.appendChild(minMaxPriceInputLabel)
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(minMaxPriceInput)
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(btnSortPriceAsc)
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(btnSortPriceDesc)
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(btnWithDescr)
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(document.createElement('br'))
    divFilters.appendChild(btnTooExp)
}

const inputMinMaxRange = document.getElementById('minMaxPriceRange')
inputMinMaxRange.addEventListener('input', () => {
    return generateCards(pieces, inputMinMaxRange.value)
})
// ou inputMinMaxRange.addEventListener('input', p => generateCards(pieces, inputMinMaxRange.value))

const btnSortPriceAsc = document.querySelector(".btnSortPriceAsc")
btnSortPriceAsc.addEventListener("click", () => {
    const piecesSortedPriceAsc = Array.from(pieces)
    piecesSortedPriceAsc.sort(function(a, b) {
        return a.prix - b.prix
    })
    generateCards(piecesSortedPriceAsc)
})

const btnSortPriceDesc = document.querySelector(".btnSortPriceDesc")
btnSortPriceDesc.addEventListener("click", () => {
    const piecesSortedPriceDesc = Array.from(pieces)
    piecesSortedPriceDesc.sort(function(a, b) {
        return b.prix - a.prix
    })
    generateCards(piecesSortedPriceDesc)
})

const btnWithDesc = document.querySelector(".btnWithDescr")
btnWithDesc.addEventListener("click", () => {
    const piecesWithtDescription = pieces.filter(function(piece) {
        return piece.description
    })
    generateCards(piecesWithtDescription) 
})

const btnTooExp = document.querySelector(".btnTooExp")
btnTooExp.addEventListener("click", function () {
   const piecesPriceAffordable = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   generateCards(piecesPriceAffordable)
})

export { generateButtons }