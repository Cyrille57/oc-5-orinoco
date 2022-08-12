///////////////////////////////////////////////////////////
///// Affiche le récapitulatif sur confirmation.html: /////
///////////////////////////////////////////////////////////


// 1) ////////////////////////////////////////////////////////
// Récupére l'objet order dans localStorager: //////////////////
let getOrderInLocalStorage = JSON.parse(localStorage.getItem("getOrder"))
console.log(getOrderInLocalStorage)

// Récupére les produit dans localStorager: //////////////////
let productLocalStorage = JSON.parse(localStorage.getItem("product"))
console.log(productLocalStorage)

///////////////////////////////////////////////////////////
//Selectionne l'id parent:
let main = document.querySelector('main')

///////////////////////////////////////////////////////////
// Création des éléments de base enfants:
// Container:
let divContainer = createTag('div')
addClass(divContainer, 'container')
//addClass(divContainer, 'containerCardProduct')
addClass(divContainer, 'containerRecapOrder')

// Row:
let divRow = createTag('div')
addClass(divRow, 'row')
addClass(divRow, 'divRowOrder')

// Col-12
let divCol = createTag('div')
addClass(divCol, 'col-12')
addClass(divCol, 'col-12-Order')

///////////////////////////////////////////////////////////
// Création de la box qui vas contenir le produit:
// Box:
let divBox = createTag('div')
addClass(divBox, 'box')
addClass(divBox, 'boxOrder')

// Box Recap Order:
let divBoxRecapOrder = createTag('div')
addClass(divBoxRecapOrder, 'box__recapOrder')

///////////////////////////////////////////////////////////
// Création de la carte produit:
// Card:
let divCardOrder = createTag('div')
divCardOrder.setAttribute("id", "divCardOrder")
addClass(divCardOrder, 'card')
addClass(divCardOrder, 'text-center')

// Card-body:
let divCardBodyOrder = createTag('div')
divCardBodyOrder.setAttribute("id", "divCardBodyOrder")
addClass(divCardBodyOrder, 'card-body')
addClass(divCardBodyOrder, 'card-body-product')

// Titre du recap de commande:
let titleOrder = createTag('h3')
titleOrder.innerHTML = ' Merci pour votre commande !'

// Texte Numéro de commande:
let numberOrder = createTag('p')
numberOrder.innerHTML = ' Votre numéro de commande est le: '

// Affiche le numéro de commande:
let displayNumberOrder = createTag('p')
addClass(displayNumberOrder, 'font-weight-bold')
displayNumberOrder.innerHTML = getOrderInLocalStorage.orderId

// Texte somme total:
let priceTotal = createTag('p')
//displayPriceTotal.setAttribute("id", "final-price")
priceTotal.innerHTML = ' Pour un montant total de:'

// Affiche le prix total:
let displayPriceTotal = createTag('p')
displayPriceTotal.setAttribute("id", "final-price")
addClass(displayPriceTotal, 'font-weight-bold')

let totalamount = 0
// Création d'un tableau pour y mettre les tarifs:
let tabPrice = []
for (let i = 0; i < getOrderInLocalStorage.products.length; i++) {
    console.log(getOrderInLocalStorage)

    // Récupére le nombre de produit du LS:
    let quantity = productLocalStorage[i].quantityProduct
    let price = getOrderInLocalStorage.products[i].price
    console.log(quantity)

    // Multiplie le tout:
    let cumulPrice = price * quantity
    console.log(cumulPrice)

    // Pousse les tarifs dans le tableau:
    tabPrice.push(cumulPrice)
    console.log(tabPrice)

    // Totale des valeurs du tableau avec la méthode reduce():
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPriceOrder = tabPrice.reduce(reducer)

    // Affiche le montant total:
    totalamount = cumulPrice + totalamount

    // remove le product
    localStorage.removeItem("product")
}
displayPriceTotal.innerHTML = totalamount / 100 + '€';

///////////////////////////////////////////////////////////
// Séparation :
let divSeparationOrder = createTag('div')
addClass(divSeparationOrder, 'divSeparationOrder')

// Texte rappel adresse de facturation :
let coordinatesReminder = createTag('p')
addClass(coordinatesReminder, 'coordinatesReminder')
coordinatesReminder.innerHTML = ' Adresse de facturation :'

///////////////////////////////////////////////////////////
// box firstName:
let boxFirstName = createTag('div')
addClass(boxFirstName, 'boxFirstName')
// Texte nom:
let nameReminder = createTag('p')
addClass(nameReminder, 'nameReminder')
nameReminder.innerHTML = 'Nom : '
// Affiche nom:
let displayNameReminder = createTag('p')
addClass(displayNameReminder, 'displayNameReminder')
addClass(displayNameReminder, 'font-weight-bold')
displayNameReminder.innerHTML = getOrderInLocalStorage.contact.firstName

///////////////////////////////////////////////////////////
// box lastName:
let boxLastName = createTag('div')
addClass(boxLastName, 'boxLastName')
// texte prénom:
let lastNameReminder = createTag('p')
addClass(lastNameReminder, 'lastNameReminder')
lastNameReminder.innerHTML = 'Prénom : '
//Affiche prénom:
let displayLastNameReminder = createTag('p')
addClass(displayLastNameReminder, 'displayLastNameReminder')
addClass(displayLastNameReminder, 'font-weight-bold')
displayLastNameReminder.innerHTML = getOrderInLocalStorage.contact.lastName

///////////////////////////////////////////////////////////
// box adresse:
let boxAddress = createTag('div')
addClass(boxAddress, 'boxAddress')
// Texte adresse:
let addressReminder = createTag('p')
addClass(addressReminder, 'addressReminder')
addressReminder.innerHTML = 'Adresse : '
// Affiche adresse:
let displayAddressReminder = createTag('p')
addClass(displayAddressReminder, 'displayAddressReminder')
addClass(displayAddressReminder, 'font-weight-bold')
displayAddressReminder.innerHTML = getOrderInLocalStorage.contact.address

///////////////////////////////////////////////////////////
// Box city:
let boxCity = createTag('div')
addClass(boxCity, 'boxCity')
// Texte city:
let cityReminder = createTag('p')
addClass(cityReminder, 'cityReminder')
cityReminder.innerHTML = 'Ville : '
// Affiche city:
let displayCityReminder = createTag('p')
addClass(displayCityReminder, 'displayCityReminder')
addClass(displayCityReminder, 'font-weight-bold')
displayCityReminder.innerHTML = getOrderInLocalStorage.contact.city

///////////////////////////////////////////////////////////
// Séparation :
let div2SeparationOrder = createTag('div')
addClass(div2SeparationOrder, 'divSeparationOrder')

///////////////////////////////////////////////////////////
// Texte rappel adresse de contact :
let addressContactReminder = createTag('p')
addClass(addressContactReminder, 'addressContactReminder')
addressContactReminder.innerHTML = ' Adresse de contact :'

///////////////////////////////////////////////////////////
// Box adresse de contact :
let boxEmail = createTag('div')
addClass(boxEmail, 'boxEmail')
// Texte adresse de contact :
let emailReminder = createTag('p')
addClass(emailReminder, 'emailReminder')
emailReminder.innerHTML = 'Email : '
// Affiche adresse de contact :
let displayMailReminder = createTag('p')
addClass(displayMailReminder, 'displayMailReminder')
addClass(displayMailReminder, 'font-weight-bold')
displayMailReminder.innerHTML = getOrderInLocalStorage.contact.email

///////////////////////////////////////////////////////////
// Ajout des élément de base:
main.appendChild(divContainer)
divContainer.appendChild(divRow)
divRow.appendChild(divCol)

// Ajout de la box qui vas contenir le produit:
divCol.appendChild(divBox)
divBox.appendChild(divBoxRecapOrder)

// Ajout de la carte produit:
divBoxRecapOrder.appendChild(divCardOrder)
divCardOrder.appendChild(divCardBodyOrder)

// Ajout du h3:
divCardBodyOrder.appendChild(titleOrder)
// Ajout du texte numéro de commande:
divCardBodyOrder.appendChild(numberOrder)
// Affiche le numéro de commande:
divCardBodyOrder.appendChild(displayNumberOrder)
// Ajout du texte somme total:
divCardBodyOrder.appendChild(priceTotal)
// Affiche le prix total:
divCardBodyOrder.appendChild(displayPriceTotal)

// Affiche le trait de séparation:
divCardBodyOrder.appendChild(divSeparationOrder)

// Ajout du texte Adresse de facturation
divCardBodyOrder.appendChild(coordinatesReminder)

// Box firstName:
divCardBodyOrder.appendChild(boxFirstName)
// Texte nom:
boxFirstName.appendChild(nameReminder)
// Affiche nom:
boxFirstName.appendChild(displayNameReminder)

// Box lastName:
divCardBodyOrder.appendChild(boxLastName)
// Texte prénom:
boxLastName.appendChild(lastNameReminder)
// Affiche prénom:
boxLastName.appendChild(displayLastNameReminder)

// Box address:
divCardBodyOrder.appendChild(boxAddress)
// Texte address:
boxAddress.appendChild(addressReminder)
// Affiche address:
boxAddress.appendChild(displayAddressReminder)

// Box city:
divCardBodyOrder.appendChild(boxCity)
// Texte city:
boxCity.appendChild(cityReminder)
// Affiche city:
boxCity.appendChild(displayCityReminder)

// Affiche le trait de séparation:
divCardBodyOrder.appendChild(div2SeparationOrder)

// Texte rappel adresse de contact :
divCardBodyOrder.appendChild(addressContactReminder)

// Box adresse de contact:
divCardBodyOrder.appendChild(boxEmail)
// Texte adresse de contact:
boxEmail.appendChild(emailReminder)
// Affiche adresse de contact:
boxEmail.appendChild(displayMailReminder)
