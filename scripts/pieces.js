import { generateButtons } from './filters.js'
import { ajoutListenersAvis } from "./avis.js";

const reponse = await fetch("http://localhost:8081/pieces")
const pieces = await reponse.json()


const noDescription = "Pas de description pour le moment."
const stockOK = "En stock"
const noStock = "Rupture de stock"

const lowPrice = "€"
const highPrice = "€€€"

// création des différentes fiches pièces
function generateCards(pieces, price) {
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.innerHTML = ''

    const maxPrice = document.getElementById('minMaxPriceRange')

    const divBestSelection = generateBestItemsSelection(pieces, sectionFiches)
    const divAvailableItems = generateAvailableItems(pieces, sectionFiches)

    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        // Création d’une balise dédiée à une pièce automobile
        if (article.prix > maxPrice.value) {
            continue
        }
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        
        // bouton avis
        const btnViewAvis =  document.createElement('button')
        btnViewAvis.innerText = 'Afficher les avis'
        btnViewAvis.dataset.id = article.id

        // on rattache la balise article à la section fiches
        sectionFiches.appendChild(pieceElement)
    
        // on rattache chaque attribut à la balise article
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(stockElement)

        pieceElement.appendChild(btnViewAvis)

        ajoutListenersAvis();
    }
}

// first page rendering : 
generateButtons()
generateCards(pieces)



function generateBestItemsSelection(pieces, maDiv) {
    const divBestItemsSelection = document.createElement('div')
    const divTitle = document.createElement('h3')
    divTitle.innerText = 'Pas cher et dispo!'
    divBestItemsSelection.appendChild(divTitle)

    const affordablePriceElements = pieces.filter(function(piece) {
        return piece.prix <= 35 && piece.disponibilite
    })
    
    const affordableName = affordablePriceElements.map(piece => piece.nom)
    const affordablePrice = affordablePriceElements.map(piece => piece.prix)
    
    const affordablePriceList = document.createElement('ul')
    for (let i = 0; i < affordablePriceElements.length; i++) {
        const nomElement = document.createElement('li')
        nomElement.innerText = affordableName[i] + ' - ' + affordablePrice[i] + '€'
        affordablePriceList.appendChild(nomElement)
    }
    
    divBestItemsSelection.appendChild(affordablePriceList)
    maDiv.appendChild(divBestItemsSelection)
}

function generateAvailableItems(pieces, maDiv) {
    const divAvailableItems = document.createElement('div')
    const divTitle = document.createElement('h3')
    divTitle.innerText = 'Pièces en stock'
    divAvailableItems.appendChild(divTitle)

    const inStockElementList = document.createElement('ul')
    
    const inStockItems = pieces.filter(piece => piece.disponibilite)
    const inStockItemsDetails = inStockItems.map(p => p.nom + ' - ' + p.prix + '€')
    for (let i = 0; i < inStockItems.length; i++) {
        const nomElement = document.createElement('li')
        nomElement.innerText = inStockItemsDetails[i]
        inStockElementList.appendChild(nomElement)
    }
    
    divAvailableItems.appendChild(inStockElementList)
    maDiv.appendChild(divAvailableItems)
}

export { pieces, generateCards }