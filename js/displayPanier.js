///////////////////////////////////////////////////////////
/////// Affiche les produits contenue dans le panier //////
///////////////////////////////////////////////////////////


// 1) ////////////////////////////////////////////////////////
// Récupére les produit dans localStorager: //////////////////
let productLocalStorage = JSON.parse(localStorage.getItem("product"))
console.log("productLocalStorage:",productLocalStorage)
//réponse : tableau des objets
//console.log(productLocalStorage.length)
//réponse : 3

// Si tableau est vide:
if (productLocalStorage === null || productLocalStorage.length === 0){
    // Va à la page:
    window.location = "panierEmpty.html"
}

// 2) ////////////////////////////////////////////////////////
// Récupére l'id un à un et les affecte a l'url: /////////////
function getId(productLocalStorage) {
    for (var i = 0; i < productLocalStorage.length; i++) {

        let idProductPanier = productLocalStorage[i].idProduct
        console.log("idProductPanier",idProductPanier)
        // Réponse: 1 seul id par produit

        // Concaténe l'url de l'API avec l'id récupéré: ///////////////
        //const url = "../../front/data/data.json";
        //const urlProduct = url + "/" + idProductPanier;
        //console.log(urlProduct)
        // Réponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

        const url = "../../front/data/data.json";
        console.log(url);

        takeProductInPanier(url, idProductPanier, productLocalStorage[i])
    }
}
getId(productLocalStorage)


// 3) /////////////////////////////////////////////////////////
// XMLHttpRequest se connecte avec l'url et récupére les données:/
// async function takeProductInPanier(urlProduct, productLocalStorage) {
//     console.log(urlProduct)
//     // Réponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

//     // Creer un nouvel objet Ajax de type XMLHttpRequest:
//     let xhr = new XMLHttpRequest();

//     // Détecte de la requête:
//     xhr.onreadystatechange = function () {
//         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//             // Envoie terminé et contenu bien recue et convertit en Json:
//             var productData = JSON.parse(this.responseText);
//             console.log(productData);

//             // envoie le productData a la fonction displayPanier:
//             displayPanier(productData, productLocalStorage)
//             countArticle(productLocalStorage.quantityProduct)
//             totalPrice(productLocalStorage.quantityProduct * productData.price)
//             sendOrder(productData)

//         } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
//             console.log("Erreur 500");
//         }
//     };

//     // Ouvre la connexion en précisant la méthode:
//     xhr.open("GET", urlProduct, true);

//     // Envoie la requête:
//     xhr.send();
// }

// Fonction pour récupérer les données du produit spécifique
async function takeProductInPanier(url, idProductPanier, productLocalStorage) {
    console.log(url);
    // Réponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

    try {
        let response = await fetch(url);
        if (response.ok) {
            let result2 = await response.json();
            console.log('Données:', result2);

            // Trouver le produit spécifique par ID
            let productData = result2.find(item => item._id === idProductPanier);
            if (productData) {
                console.log('Produit:', productData);
                // Envoie le productData à la fonction displayPanier
                displayPanier(productData, productLocalStorage);
                countArticle(productLocalStorage.quantityProduct);
                totalPrice(productLocalStorage.quantityProduct * productData.price);
                sendOrder(productData);
            } else {
                console.log("Produit non trouvé");
            }
        } else {
            console.log("Erreur " + response.status);
        }
    } catch (error) {
        console.log("Erreur de connexion : ", error);
    }
}

// 4) ////////////////////////////////////////////////////////
// Affichage html ////////////////////////////////////////////

///////////////////////////////////////////////////////////
// I) Sélectionne le Parent: ******************************
//Selectionne l'id parent:
let main = document.querySelector('main')
//console.log(main)

///////////////////////////////////////////////////////////
// I) A) Création des éléments de base enfants: ***********
// Panier:
let divSectionPanier = createTag('section')
addClass(divSectionPanier, 'sectionPanier')

// Card:
let divCard = createTag('div')
addClass(divCard, 'card')
addClass(divCard, 'divCardPanier')

// Row:
let divRow = createTag('div')
addClass(divRow, 'divRow')
addClass(divRow, 'row')

// col-md-8
let divCol = createTag('div')
addClass(divCol, 'col-md-8')
addClass(divCol, 'cart')
divCol.setAttribute("id", "parentCardProduct")

///////////////////////////////////////////////////////////
// I) B) Création intérieur box: **************************
// Entete
//  Title:
let divHeadCardTitle = createTag('div')
addClass(divHeadCardTitle, 'title')

// Row:
let divRowTitle = createTag('div')
addClass(divRowTitle, 'row')

// Col:
let divColTitle = createTag('div')
addClass(divColTitle, 'col')
addClass(divColTitle, 'divColTitle')
addClass(divColTitle, 'text-center')

// H2:
let divSubTitle = createTag('h2')

// Strong:
let strongTitle = createTag('strong')
strongTitle.innerHTML = 'Panier:'

// Item principale:
let divCountitem = createTag('div')
addClass(divCountitem, 'col')
addClass(divCountitem, 'align-self-center')
addClass(divCountitem, 'text-right')
addClass(divCountitem, 'text-muted')

// Border top:
let divBorderTop = createTag('div')
addClass(divBorderTop, 'border-top')

///////////////////////////////////////////////////////////
// I) D) Pied de la carte: ********************************
// Div Back to shop:
let divBackShop = createTag('div')
addClass(divBackShop, 'back-to-shop')

// Box lien et texte backShop:
let boxBackShop = createTag('div')
addClass(boxBackShop, 'boxBackShop')

// Lien fléché Back to shop:
let linkBackShop = createTag('a')
addClass(linkBackShop, 'linkBackShop')
linkBackShop.setAttribute("href", "index.html")
linkBackShop.innerHTML = "&leftarrow;"

// Texte Back to shop:
let textBackShop = createTag('span')
addClass(textBackShop, 'textBackShop')
addClass(textBackShop, 'text-muted')
textBackShop.innerHTML = "Retour à la boutique"

// Box lien et texte delete all:
let boxDeleteAll = createTag('div')
addClass(boxDeleteAll, 'boxDeleteAll')

// lien delete all:
let linkDeleteAll = createTag('a')
linkDeleteAll.setAttribute("id", "linkDeleteAll")
linkDeleteAll.setAttribute("href", "panierEmpty.html")
linkDeleteAll.innerHTML = "&#8634;"

// Texte supprimer tout le panier:
let textDeleteAll = createTag('span')
addClass(textDeleteAll, 'textDelete')
addClass(textDeleteAll, 'text-muted')
textDeleteAll.innerHTML = "Vider le panier"

///////////////////////////////////////////////////////////
// I) E) Récapitulatif: ***********************************
// Box Récapitulatif:
let divBoxRecap = createTag('div')
addClass(divBoxRecap, 'col-md-4')
addClass(divBoxRecap, 'summary')
addClass(divBoxRecap, 'bg-gradient')

// Div title récapitulatif:
let divTitleRecap = createTag('div')

// Title recapitulatif:
let titleRecap = createTag('h2')

// Strong title:
let titleStrongRecap = createTag('b')
titleStrongRecap.innerHTML = "Récapitulatif:"

// Trait recapitulatif:
let separationRecap = createTag('hr')

// Div boxItemRecap:
let divBoxItemRecap = createTag('div')
addClass(divBoxItemRecap, 'row')
addClass(divBoxItemRecap, 'divBoxItemRecap')
divBoxItemRecap.innerHTML = "Nombre d'article(s):  "

// Div Item recapitulatif:
let divItemRecap = createTag('div')
//addClass(divItemRecap, 'col')
divItemRecap.setAttribute("id", "numberArticle")
//divItemRecap.innerHTML = "items 3"
divItemRecap.innerHTML = 0

// Price recapitulatif:
let divPriceRecap = createTag('div')
addClass(divPriceRecap, 'col')
addClass(divPriceRecap, 'text-right')
divPriceRecap.setAttribute("style", "margin-top: 5%;")

// Div box total recap:
let divBoxTotal = createTag('div')
addClass(divBoxTotal, 'row')
addClass(divBoxTotal, 'divBoxTotal')

// Div text price total:
let divTextPriceTotal = createTag('div')
addClass(divTextPriceTotal, 'col')
addClass(divTextPriceTotal, 'divTextPriceTotal')
divTextPriceTotal.innerHTML = "Prix Total: "

// Div price total:
let divPriceTotal = createTag('div')
addClass(divPriceTotal, 'col')
divPriceTotal.setAttribute("id", "total")
divPriceTotal.innerHTML = 0

// button valider la commande:
let buttonConfirm = createTag('button')
addClass(buttonConfirm, 'btn')
addClass(buttonConfirm, 'btnConfirmation')
addClass(buttonConfirm, 'rounded-pill')
addClass(buttonConfirm, 'btn-dark')
buttonConfirm.innerHTML = "Confirmer la commande"

///////////////////////////////////////////////////////////
// I) F) Ajout Panier: ************************************
main.appendChild(divSectionPanier)
// Card:
divSectionPanier.appendChild(divCard)
// Row:
divCard.appendChild(divRow)
// col-md-8
divRow.appendChild(divCol)

// Entete: ////////////////////////////////////////////////
//  Title:
divCol.appendChild(divHeadCardTitle)
// Row:
divHeadCardTitle.appendChild(divRowTitle)
// Col:
divRowTitle.appendChild(divColTitle)
// H2:
divColTitle.appendChild(divSubTitle)
// Strong:
divSubTitle.appendChild(strongTitle)
// Item principale:
divRowTitle.appendChild(divCountitem)
// Border top:
divCol.appendChild(divBorderTop)

// Récapitulatif: /////////////////////////////////////////
// Box Récapitulatif:
divRow.appendChild(divBoxRecap)
// Div title récapitulatif:
divBoxRecap.appendChild(titleRecap)
// Strong title:
titleRecap.appendChild(titleStrongRecap)
// Trait recapitulatif:
divBoxRecap.appendChild(separationRecap)
// divBoxItemRecap:
divBoxRecap.appendChild(divBoxItemRecap)
// Div Item recapitulatif:
divBoxItemRecap.appendChild(divItemRecap)
// Price recapitulatif:
divBoxItemRecap.appendChild(divPriceRecap)
// Div box total recap:
divBoxRecap.appendChild(divBoxTotal)
// Div text price total:
divBoxTotal.appendChild(divTextPriceTotal)
// Div price total:
divBoxTotal.appendChild(divPriceTotal)
// button valider la commande:
divBoxRecap.appendChild(buttonConfirm)


//////////////////////////////////////////////////////////
// Fonction qui affiche les élément du panier: ///////////
function displayPanier(productData, productLocalStorage) {


    ///////////////////////////////////////////////////////////
    // I) C) Corps: *******************************************
    // Row Article:
    let divRowArticle = createTag('div')
    addClass(divRowArticle, "divRowArticle")
    addClass(divRowArticle, "row")
    divRowArticle.setAttribute("id", "row_" + productData._id)

    // Row principale:
    let divRowMain = createTag('div')
    addClass(divRowMain, "row")
    addClass(divRowMain, "main")
    addClass(divRowMain, "border-bottom")

    // Col Image:
    let divCol2 = createTag('div')
    addClass(divCol2, "col-2")

    // Image:
    let img = createTag('img')
    addClass(img, "img-fluid")
    addClass(img, "hidden-mobile")
    img.alt = 'Image du produit'

    // Box pour col title et col div amount:
    let boxTitleAmount = createTag('div')
    addClass(boxTitleAmount, 'boxTitleAmount')

    // Col Titre du produit:
    let divColTitleProduct = createTag('div')
    addClass(divColTitleProduct, 'col')
    addClass(divColTitleProduct, 'modifyWidth')

    // Titre du produit:
    let divTitleProduct = createTag('h3')
    addClass(divTitleProduct, 'row')
    addClass(divTitleProduct, 'childrenCardProduct')
    divTitleProduct.setAttribute("id", "title")
    divTitleProduct.setAttribute("data-idtitre", productData._id)

    // Prix unitaire:
    let divUnitPrice = createTag('div')
    addClass(divUnitPrice, 'divUnitPrice')
    divUnitPrice.setAttribute("id", "unitPrice_" + productData._id)
    divUnitPrice.setAttribute("price", productData.price)

    // Box pour Div Price et Delete:
    let boxDynamicPrice = createTag('div')
    addClass(boxDynamicPrice, 'boxDynamicPrice')

    // Div amount:
    let divColAmount = createTag('div')
    addClass(divColAmount, 'col')
    addClass(divColAmount, 'modifyWidth')
    divColAmount.setAttribute("style", " display:flex; ")

    // Less:
    let less = createTag('a')
    less.setAttribute("id", "less")
    less.setAttribute("href", "#")
    less.innerHTML = "-"
    less.setAttribute("data-idproduct", productData._id)

    // Input Amount:
    let inputAmount = createTag('input')
    //let inputAmount = createTag('p')
    addClass(inputAmount, 'inputAmount')
    addClass(inputAmount, 'text-center')
    inputAmount.setAttribute("id", "amount_" + productData._id)
    inputAmount.setAttribute("value", productLocalStorage.quantityProduct)
    inputAmount.setAttribute("data-inputamount", productData._id)

    // More:
    let more = createTag('a')
    more.setAttribute("id", "more")
    more.setAttribute("href", "#")
    more.innerHTML = "+"
    more.setAttribute("data-idproduct", productData._id)

    //Div Price:
    let divPrice = createTag('div')
    addClass(divPrice, 'col')
    addClass(divPrice, 'price')
    divPrice.setAttribute("id", "price_" + productData._id)
    //console.log(divPrice)

    // Col delete:
    let divBoxDelete = createTag('div')
    addClass(divBoxDelete, "divBoxDelete")

    // Delete:
    let deleteProduct = createTag('a')
    deleteProduct.setAttribute("id", "delete")
    deleteProduct.setAttribute("href", "#")
    deleteProduct.innerHTML = "&#10005"
    deleteProduct.setAttribute("data-iddelete", productData._id)

    // Corps: ////////////////////////////////////////////////
    // Row Article:
    divCol.appendChild(divRowArticle)

    // Row principale:
    divRowArticle.appendChild(divRowMain)

    // Col Image:
    divRowMain.appendChild(divCol2)
    // Image:
    divCol2.appendChild(img)

    // Box pour col title et divUnitPrice::
    divRowMain.appendChild(boxTitleAmount)
    // Col Titre du produit:
    boxTitleAmount.appendChild(divColTitleProduct)
    // Titre du produit:
    divColTitleProduct.appendChild(divTitleProduct)
    // Prix unitaire:
    boxTitleAmount.appendChild(divUnitPrice)

    // Box pour DivColAmount et divPrice:
    divRowMain.appendChild(boxDynamicPrice)
    // Div amount:
    boxDynamicPrice.appendChild(divColAmount)

    // Less:
    divColAmount.appendChild(less)
    // Input Amount:
    divColAmount.appendChild(inputAmount)
    // More:
    divColAmount.appendChild(more)

    //Div Price:
    boxDynamicPrice.appendChild(divPrice)

    // Col delete:
    divRowMain.appendChild(divBoxDelete)
    // Delete:
    divBoxDelete.appendChild(deleteProduct)

    // Pied de la carte: //////////////////////////////////////
    // Div Back to shop:
    divCol.appendChild(divBackShop)
    // Box lien et texte backShop:
    divBackShop.appendChild(boxBackShop)
    // Lien fléché Back to shop:
    boxBackShop.appendChild(linkBackShop)
    // Texte Back to shop:
    boxBackShop.appendChild(textBackShop)
    // Box lien et texte delete all:
    divBackShop.appendChild(boxDeleteAll)
    // lien fleché delete all:
    boxDeleteAll.appendChild(linkDeleteAll)
    // texte delete all:
    boxDeleteAll.appendChild(textDeleteAll)

    //////////////////////////////////////////////////////////
    // I) E) Récupére et affiche les données: ****************
    // Récupére l'imageUrl
    img.src = productData.imageUrl
    //console.log(productData.imageUrl)

    // Récupére le titre du produit:
    divTitleProduct.innerHTML = productData.name
    //console.log(productData.name)

    //Récupére le prix du produit:
    divPrice.innerHTML = productData.price * productLocalStorage.quantityProduct  + " €"
    //console.log(divPrice.innerHTML)

    divUnitPrice.innerHTML = productData.price  + " €"

    ///////////////////////////////////////////////////////////
    // Ecoute les +,- et * : //////////////////////////////////

    // Ecoute le boutton -:
    less.addEventListener('click', (event) => {
        event.preventDefault();
        //console.log(event)
        // Cible l'id du less utilisé:
        let idProduct = event.target.getAttribute('data-idproduct')
        //console.log(idProduct)

        // Sélectionne la div du prix unitaire, récupére le price du productData et le multiplie par -1
        let getPriceUnit = document.getElementById('unitPrice_' + idProduct).getAttribute("price") * -1
        console.log(getPriceUnit)

        // Envoie de parametre a la fonction ModifyQuantity:
        getValue = modifyQuantity(idProduct, -1)
        //console.log(getValue)

        if (getValue == 0){
            deleteProductLocalStorage(idProduct)
            location.reload()
        } else {
            // Envoie des paramétre aux fonctions suivantes:
            modifyQuantityProductInLocalStorage(idProduct, getValue)
        }

        // Envoie des paramétre aux fonctions suivantes:
        modifyPrice(idProduct, getValue)
        countArticle(-1)
        totalPrice(getPriceUnit, idProduct) 
        modifyQuantityProductInLocalStorage(idProduct, getValue)


    })

    // Ecoute le boutton +:
    more.addEventListener('click', (event) => {
        event.preventDefault();
        //console.log(event)
        // Cible l'id du more utilisé:
        let idProduct = event.target.getAttribute('data-idproduct')
        //console.log(idProduct)

        // Sélectionne la div du prix unitaire, récupére le price du productData et le multiplie par 1
        let getPriceUnit = document.getElementById('unitPrice_' + idProduct).getAttribute("price") * 1
        //console.log(getPriceUnit)

        // Envoie de parametre a la fonction ModifyQuantity:
        getValue = modifyQuantity(idProduct, 1)
        //console.log(getValue)

        // Envoie des paramétre aux fonctions suivantes:
        modifyPrice(idProduct, getValue)
        countArticle(1)
        totalPrice(getPriceUnit , idProduct) 
        modifyQuantityProductInLocalStorage(idProduct, getValue)

    })

    // Ecoute le boutton delete:
    deleteProduct.addEventListener('click', (event) => {
        event.preventDefault();
        //console.log(event)
        // Cible l'id du delete utilisé:
        let idDelete = event.target.getAttribute('data-iddelete')
        //console.log(idDelete)

        // Envoie des paramétre aux fonctions suivantes:
        deleteRowProduct(idDelete)
        deleteProductLocalStorage(idDelete)

        // Recharge la page:
        location.reload()
    })

    // Ecoute le boutton vider le panier:
    let clearAllProduct = document.getElementById('linkDeleteAll')
    clearAllProduct.addEventListener('click', (event) => {
        //console.log(event)
        event.preventDefault
        // Vide le localStorage avec .removeItem:
        localStorage.removeItem('product')
    })
}

///////////////////////////////////////////////////////////
// Modifie les quantité: //////////////////////////////////
function modifyQuantity(idProduct, nQuantity) {
    //console.log(nQuantity)
    //console.log(idProduct)
    // Réponse : 5beaaa8f1c9d440000a57d95

    // Récupére la valeur de l'element et l'initialise:
    let getValue = parseInt(document.getElementById('amount_' + idProduct).value)
    //let getValue = parseInt(document.getElementById('amount_' + idProduct).innerHTML)
    console.log(getValue)
    // Réponse : 1

    getValue = getValue + nQuantity
    //console.log(getValue)
    // Réponse: 2

    if (getValue >= 0) {
        // Modifie la valeur de l'element:
        document.getElementById('amount_' + idProduct).value = getValue
        //console.log(getValue)
        return getValue
    }

    //console.log(getValue)
    return 0

}

///////////////////////////////////////////////////////////
// Modifie le prix en fonction de la quantité: ////////////
function modifyPrice(idProduct, getValue) {
    console.log(idProduct);
    console.log(getValue);

    // Récupère la valeur de l'élément et l'initialise avec parseFloat pour conserver les décimales
    let getPrice = parseFloat(document.getElementById('unitPrice_' + idProduct).innerHTML);
    console.log(getPrice);

    // Calcule le nouveau prix
    let newPrice = getValue * getPrice;
    console.log(newPrice);

    // Récupère la valeur de l'élément et l'initialise
    let getNewPrice = document.getElementById('price_' + idProduct);
    console.log(getNewPrice);

    // Met à jour le sous-total avec le nouveau prix, en conservant les décimales
    getNewPrice.innerHTML = newPrice.toFixed(2) + " €";

    console.log(newPrice);
}

///////////////////////////////////////////////////////////
// Suprime la ligne de l' article: ////////////////////////
function deleteRowProduct(idDelete) {

    ///////////////////////////////////////////////////////////
    // Supprime la ligne coté client: /////////////////////////
    //console.log(idDelete)
    // Réponse : l'id du delete sélectionner

    let getDelete = document.getElementById('row_' + idDelete)
    //console.log(getDelete)
    // Réponse: selectionne le row en fonction de l'id

    // supprime la ligne:
    getDelete.remove(idDelete)
}

///////////////////////////////////////////////////////////
// Ajoute ou enleve un produit coté localStorage: /////////
function modifyQuantityProductInLocalStorage(idProduct, getValue) {

    // Récupére le local storage:
    let arrayNbProductLocalStorage = JSON.parse(localStorage.getItem("product"))
    //console.log(arrayNbProductLocalStorage)

    // Récupère l'index de l'objet avec l'id (idProduct)
    var getIndex = arrayNbProductLocalStorage.map(function (item) {
        return item.idProduct;
    }).indexOf(idProduct);
    //console.log(getIndex)
    // Réponse: retourne l'index de l'objet du tableau

    // Récupére la valeur de quantityProduct
    let getQuantityProduct = arrayNbProductLocalStorage[getIndex].quantityProduct
    //console.log(getQuantityProduct) // 1

    // Modifie la valeur de quantityProduct:
    let newQuantityProduct = arrayNbProductLocalStorage[getIndex].quantityProduct = (getValue)
    //console.log(arrayNbProductLocalStorage)
    //console.log(newQuantityProduct)

    // Créer un tableau
    let tabValue = []
    for (let i = 0; i < arrayNbProductLocalStorage.length; i++){
        // Récupére toutes les quantité et les pousse ds le tableau:
        tabValue.push(arrayNbProductLocalStorage[i].quantityProduct)
        //console.log(tabValue)
    }

    // Totale des valeurs du tableau avec la méthode reduce():
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalQuantity = tabValue.reduce(reducer)

    // selectionne l'élément ou inscrire le résultat:
    let numberRecap = document.getElementById("numberArticle")
    numberRecap.innerHTML = totalQuantity

    //Renvoie le tableau dans LocalStorage:
    localStorage.setItem("product", JSON.stringify(arrayNbProductLocalStorage))

}

///////////////////////////////////////////////////////////
// Supprime la ligne coté localStorage: ///////////////////
function deleteProductLocalStorage(idDelete) {

    // Récupére le local storage:
    let arrayproductLocalStorage = JSON.parse(localStorage.getItem("product"))
    //console.log(arrayproductLocalStorage)

    // Récupère l'index de l'objet avec l'id (idDelete)
    var removeIndex = arrayproductLocalStorage.map(function (item) {
        return item.idProduct;
    }).indexOf(idDelete);
    //console.log(removeIndex)
    // Réponse: retourne l'index de l'objet du tableau

    // Supprime l'objet grace à son index:
    arrayproductLocalStorage.splice(removeIndex, 1)
    //console.log(arrayproductLocalStorage)
    // Réponse: retourne le tableau avec les objet restant

    // Si tableau est vide:
    if (arrayproductLocalStorage.length == 0){
        // Va à la page:
        window.location = "panierEmpty.html"
    }

    //Renvoie le tableau dans LocalStorage:
    localStorage.setItem("product", JSON.stringify(arrayproductLocalStorage))

}

///////////////////////////////////////////////////////////
// Affiche le nombre d'article: ///////////////////////////
function countArticle(quantityProduct) {

    // selectionne l'élément ou inscrire le résultat:
    let numberRecap = document.getElementById("numberArticle")
    console.log(numberRecap)

    let displayCount = numberRecap.innerHTML = parseInt(numberRecap.innerHTML) + quantityProduct
    console.log(displayCount)

    sendOrder(displayCount)
    //totalPrice(displayCount)
}

///////////////////////////////////////////////////////////
// Affiche le Prix total: /////////////////////////////////

function totalPrice(price, idProduct) {
    console.log("price:", price);
    // Sélectionne où l'on va afficher le prix total:
    let someTotale = document.getElementById('total');
    //console.log("someTotale:", someTotale);

    // Convertir le contenu actuel en nombre et ajouter le nouveau prix
    let currentTotal = parseFloat(someTotale.innerHTML.replace(' €', '')) || 0;
    let newTotal = currentTotal + price;

    // Afficher le total avec deux chiffres après la virgule
    let displayTotalPrice = someTotale.innerHTML = newTotal.toFixed(2) + " €";
    console.log("displayTotalPrice:", displayTotalPrice);
}



// 5) ////////////////////////////////////////////////////////
// Affichage Formulaire //////////////////////////////////////

///////////////////////////////////////////////////////////
// I) A) Création des éléments de base enfants: ///////////
// Container:

let divContainer = createTag('div')
addClass(divContainer, 'container')

divContainer.setAttribute("id", "animation")

let form = document.getElementById('animation')
buttonConfirm.addEventListener('click', () => {
    addClass(divContainer, 'runAnimation')
})

// Row:
let divRowPrincipale = createTag('div')
addClass(divRowPrincipale, 'row')

// Col-12
let divColPrincipale = createTag('div')
addClass(divColPrincipale, 'col-12')

///////////////////////////////////////////////////////////
// I) B) Création intérieur box: //////////////////////////
// Formulaire:
divForm = createTag('section')
addClass(divForm, 'section--modify')
divForm.setAttribute("style", "padding-top: 5%;")

// Box panier:
let boxForm = createTag('div')
addClass(boxForm, 'box-form')

// Card:
divCard = createTag('div')
addClass(divCard, 'card')
addClass(divCard, 'divCard')
divCard.setAttribute("style", "box-shadow: -1px 2px 10px 3px #e9ecef inset;")

// Row:
divRow = createTag('div')
addClass(divRow, 'row')
addClass(divRow, 'row--modify')

// col-md-8
divCol2 = createTag('div')
addClass(divCol2, 'col-md-10')
addClass(divCol2, 'cart')
addClass(divCol2, 'cart--modify')

// Box Récapitulatif:
let divBoxRecapLeft = createTag('div')
addClass(divBoxRecapLeft, 'col-md-4')
addClass(divBoxRecapLeft, 'summary')
addClass(divBoxRecapLeft, 'bg-gradient')

///////////////////////////////////////////////////////////
// Ajout des élément de base: /////////////////////////////
main.appendChild(divContainer)
main.appendChild(divForm)
divForm.appendChild(divContainer)
divContainer.appendChild(divRowPrincipale)
divRowPrincipale.appendChild(divColPrincipale)
divColPrincipale.appendChild(boxForm)

boxForm.appendChild(divCard)
divCard.appendChild(divRow)
divRow.appendChild(divCol2)

// Div Form:
let formCheckOut = createTag('form')
formCheckOut.setAttribute("id", "formValidation")
formCheckOut.setAttribute("action", "")
formCheckOut.setAttribute("method", "POST")

// Form Row:
let formRow = createTag('div')
addClass(formRow, 'form-row')

///////////////////////////////////////////////////////////
// Form group name: ///////////////////////////////////////
let formGroupName = createTag('div')
addClass(formGroupName, 'form-group')
addClass(formGroupName, 'col-md-6')

// Label name customer:
let labelName = createTag('label')
labelName.setAttribute("for", "firstName")
labelName.innerHTML = "Nom:"

// Input name:
let inputName = createTag('input')
addClass(inputName, 'form-control')
inputName.setAttribute("id", "inputName")
inputName.setAttribute("type", "text")
inputName.setAttribute("name", "inputName")
inputName.setAttribute("style", "margin:0%;")
inputName.setAttribute("minlength", "1")
inputName.setAttribute("maxlength", "30")
inputName.required = true;

// Span erreur:
let spanErrorFirstName = createTag('span')
addClass(spanErrorFirstName, 'spanError')
spanErrorFirstName.setAttribute("id", "spanErrorFirstName")

///////////////////////////////////////////////////////////
// Form group last name: //////////////////////////////////
let formGroupLastName = createTag('div')
addClass(formGroupLastName, 'form-group')
addClass(formGroupLastName, 'col-md-6')

// Label last name customer:
let labelLastName = createTag('label')
labelLastName.setAttribute("for", "lastName")
labelLastName.innerHTML = "Prénom:"

// Input last name:
let inputLastName = createTag('input')
addClass(inputLastName, 'form-control')
inputLastName.setAttribute("id", "inputLastName")
inputLastName.setAttribute("type", "text")
inputLastName.setAttribute("name", "inputLastName")
inputLastName.setAttribute("minlength", "1")
inputLastName.setAttribute("maxlength", "30")
inputLastName.required = true;

// Span erreur:
let spanErrorLastName = createTag('span')
addClass(spanErrorLastName, 'spanError')
spanErrorLastName.setAttribute("id", "spanErrorLastName")

///////////////////////////////////////////////////////////
// Form group Email: //////////////////////////////////////
let formGroupEmail = createTag('div')
addClass(formGroupEmail, 'form-group')

// Label Email customer:
let labelEmail = createTag('label')
labelEmail.setAttribute("for", "email")
labelEmail.innerHTML = "E-mail:"

// Input Email:
let inputEmail = createTag('input')
addClass(inputEmail, 'form-control')
inputEmail.setAttribute("id", "inputEmail")
inputEmail.setAttribute("type", "email")
inputEmail.setAttribute("name", "inputEmail")
inputEmail.required = true;

// Span erreur:
let spanErrorEmail = createTag('span')
addClass(spanErrorEmail, 'spanError')
spanErrorEmail.setAttribute("id", "spanErrorEmail")

///////////////////////////////////////////////////////////
// Form group adresse: ////////////////////////////////////
let formGroupAddress = createTag('div')
addClass(formGroupAddress, 'form-group')

// Label address customer:
let labelAddress = createTag('label')
labelAddress.setAttribute("for", "address")
labelAddress.innerHTML = "Adresse:"

// Input address:
let inputAddress = createTag('input')
addClass(inputAddress, 'form-control')
inputAddress.setAttribute("id", "inputAddress")
inputAddress.setAttribute("type", "text")
inputAddress.setAttribute("name", "inputAddress")
inputAddress.required = true;

// Span erreur:
let spanErrorAddress = createTag('span')
addClass(spanErrorAddress, 'spanError')
spanErrorAddress.setAttribute("id", "spanErrorAddress")

///////////////////////////////////////////////////////////
// Div form row location //////////////////////////////////
let divFormRowLocation = createTag('div')
addClass(divFormRowLocation, 'form-row')

///////////////////////////////////////////////////////////
// Div form group city: ///////////////////////////////////
let divFormGroupLocation = createTag('div')
addClass(divFormGroupLocation, 'form-group')
addClass(divFormGroupLocation, 'divFormGroupLocation')
addClass(divFormGroupLocation, 'col-md-6')

// Label Location City:
let labelCity = createTag('label')
labelCity.setAttribute("for", "city")
labelCity.innerHTML = "Ville:"

// Input city:
let inputLocationCity = createTag('input')
addClass(inputLocationCity, 'form-control')
inputLocationCity.setAttribute("id", "inputCity")
inputLocationCity.setAttribute("type", "text")
inputLocationCity.setAttribute("name", "inputLocationCity")
inputLocationCity.required = true;

// Span erreur:
let spanErrorCity = createTag('span')
addClass(spanErrorCity, 'spanError')
spanErrorCity.setAttribute("id", "spanErrorCity")

///////////////////////////////////////////////////////////
// Div form group zip: ////////////////////////////////////
let divFormGroupzip = createTag('div')
addClass(divFormGroupzip, 'form-group')
addClass(divFormGroupzip, 'divFormGroupzip')
addClass(divFormGroupzip, 'col-md-6')

// Label zip:
let labelZip = createTag('label')
labelZip.setAttribute("for", "codeZip")
labelZip.innerHTML = "Code Postal:"

// Input Zip:
let inputZip = createTag('input')
addClass(inputZip, 'form-control')
inputZip.setAttribute("type", "texte")
inputZip.setAttribute("id", "inputZip")
inputZip.setAttribute("name", "inputZip")
inputZip.required = true;

// Span erreur:
let spanErrorZip = createTag('span')
addClass(spanErrorZip, 'spanError')
spanErrorZip.setAttribute("id", "spanErrorZip")

///////////////////////////////////////////////////////////
// Div form group bouton: /////////////////////////////////
let divFormGroupButton = createTag('div')
addClass(divFormGroupButton, 'form-group')
addClass(divFormGroupButton, 'boxSubmit')

// bouton:
let buttonConfirmationPanier = createTag('button')
addClass(buttonConfirmationPanier, 'btn')
addClass(buttonConfirmationPanier, 'submit')
addClass(buttonConfirmationPanier, 'rounded-pill')
addClass(buttonConfirmationPanier, 'bg-gradient')
addClass(buttonConfirmationPanier, 'justify-content-center')

buttonConfirmationPanier.setAttribute("id", "buttonConfirmationPanier")
buttonConfirmationPanier.setAttribute("type", "submit")
buttonConfirmationPanier.setAttribute("href", "confirmation.html")
buttonConfirmationPanier.setAttribute("border", "transparent")
buttonConfirmationPanier.innerHTML = "Valider la commande"

///////////////////////////////////////////////////////////
// Div Form: //////////////////////////////////////////////
divCol2.appendChild(formCheckOut)

// Form Row:
formCheckOut.appendChild(formRow)

///////////////////////////////////////////////////////////
// Form group name: ///////////////////////////////////////
formRow.appendChild(formGroupName)

// Label name customer:
formGroupName.appendChild(labelName)

// Input name:
formGroupName.appendChild(inputName)

// Span Error FirstName:
formGroupName.appendChild(spanErrorFirstName)

///////////////////////////////////////////////////////////
// Form group last name: //////////////////////////////////
formRow.appendChild(formGroupLastName)

// Label last name customer:
formGroupLastName.appendChild(labelLastName)

// Input last name:
formGroupLastName.appendChild(inputLastName)

// Span Error LastName:
formGroupLastName.appendChild(spanErrorLastName)

///////////////////////////////////////////////////////////
// Form group email: //////////////////////////////////////
formCheckOut.appendChild(formGroupEmail)

// Label Email customer:
formGroupEmail.appendChild(labelEmail)

// Input Email:
formGroupEmail.appendChild(inputEmail)

// Span Error Email:
formGroupEmail.appendChild(spanErrorEmail)

///////////////////////////////////////////////////////////
// Form group adresse: ////////////////////////////////////
formCheckOut.appendChild(formGroupAddress)

// Label address customer:
formGroupAddress.appendChild(labelAddress)

// Input address:
formGroupAddress.appendChild(inputAddress)

// Span Error Address:
formGroupAddress.appendChild(spanErrorAddress)

///////////////////////////////////////////////////////////
// Div form row location: /////////////////////////////////
formCheckOut.appendChild(divFormRowLocation)

///////////////////////////////////////////////////////////
// Div form group location: ///////////////////////////////
divFormRowLocation.appendChild(divFormGroupLocation)

// Label Location City:
divFormGroupLocation.appendChild(labelCity)

// Input city:
divFormGroupLocation.appendChild(inputLocationCity)

// Span Error City
divFormGroupLocation.appendChild(spanErrorCity)

///////////////////////////////////////////////////////////
// Div form group zip: ////////////////////////////////////
divFormRowLocation.appendChild(divFormGroupzip)

// Label zip:
divFormGroupzip.appendChild(labelZip)

// Input Zip:
divFormGroupzip.appendChild(inputZip)

// Span Error Zip:
divFormGroupzip.appendChild(spanErrorZip)

///////////////////////////////////////////////////////////
// Button: ////////////////////////////////////////////////
divFormRowLocation.appendChild(divFormGroupButton)

// bouton:
divFormGroupButton.appendChild(buttonConfirmationPanier)

//////////////////////////////////////////////////////////
// Fonction qui envoie la commande dans localStorage et serveur:
function sendOrder(displayCount) {

    // Sélection du bouton "valider la commande":
    let btnValidateOrder = document.getElementById('buttonConfirmationPanier')

    btnValidateOrder.addEventListener("click", (event) => {

        event.preventDefault()
        // Récupére dans un tableau les id des produits séléctionner:
        const id = productLocalStorage.map(productLocalStorages => productLocalStorages.idProduct)
        //console.log(id)

        // Création de l'objet;
        let orderTeddies = {

            "contact": {
                firstName: document.getElementById('inputName').value,
                lastName: document.getElementById('inputLastName').value,
                address: document.getElementById('inputAddress').value,
                city: document.getElementById('inputCity').value,
                email: document.getElementById('inputEmail').value,
                //codeZip: document.getElementById('inputZip').value
            },

            "products": id
        }
        console.log("orderTeddies:",orderTeddies)

        // Vérification saisie utilisateur

        // Modéle regex pour firstname, lastname et city:
        const regExNameCity = (value) => {
            // Contient que des lettres majuscules ou minuscule entre 3 et 30 caratéres:
            return /^[A-Za-z]{1,30}$/.test(value)
        }

        // Modéle regex pour email:
        const regExEmail = (value) => {
            // Contient des lettres, majuscules ou minuscule, des chiifres, ., _, - avec @
            // puis une séquence de lettre, majuscule ou minuscule, de chiifres, ., -, avec un minimum de 2
            // enfin apres le point, des lettres, majuscules ou minuscule entre 2 et 4 caractéres
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/.test(value)
        }

        // Modéle regex pour adresse:
        const regExAddress = (value) => {
            // Contient que des lettres, majuscules ou minuscule, des chiifres et espacement entre 3 et 50 caratéres:
            return /^[A-Za-z0-9\s]{3,}$/.test(value)
        }

        /*
        // Modéle regex pour code zip:
        const regExCodeZip = (value) => {
            // Contient uniquement 5 chiffres:
            return /^\d{5}$/.test(value)
        }
        */

        // Fonction qui vérifie la validité du firstname::
        function verifyFirstName() {

            // Sélectionne la vaeur de l'input first name:
            const firstName = document.getElementById('inputName').value

            if (regExNameCity(firstName)) {
                document.getElementById('spanErrorFirstName').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorFirstName').textContent = "Champ incorrect"
                return false
            }
        }

        // Fonction qui vérifie la validité du last name::
        function verifyLastName() {

            // Sélectionne la vaeur de l'input first name:
            const lastName = document.getElementById('inputLastName').value

            if (regExNameCity(lastName)) {
                document.getElementById('spanErrorLastName').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorLastName').textContent = "Champ incorrect"
                return false
            }
        }

        // Fonction qui vérifie la validité du email:
        function verifyEmail() {

            // Sélectionne la vaeur de l'input code zip:
            const email = document.getElementById('inputEmail').value

            if (regExEmail(email)) {
                document.getElementById('spanErrorEmail').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorEmail').textContent = "Champ incorrect"
                return false
            }
        }

        // Fonction qui vérifie la validité de l'adresse:
        function verifyAddress() {

            // Sélectionne la vaeur de l'input first name:
            const address = document.getElementById('inputAddress').value

            if (regExAddress(address)) {
                document.getElementById('spanErrorAddress').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorAddress').textContent = "Champ incorrect"
                return false
            }
        }

        // Fonction qui vérifie la validité de l'adresse:
        function verifyCity() {

            // Sélectionne la vaeur de l'input first name:
            const city = document.getElementById('inputCity').value

            if (regExNameCity(city)) {
                document.getElementById('spanErrorCity').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorCity').textContent = "Champ incorrect"
                return false
            }
        }

        /*
        // Fonction qui vérifie la validité du code zip::
        function verifyCodeZip () {

            // Sélectionne la vaeur de l'input code zip:
            const codeZip = document.getElementById('inputZip').value

            if (regExCodeZip(codeZip))  {
                document.getElementById('spanErrorZip').textContent = ""
                return true
            } else {
                document.getElementById('spanErrorZip').textContent = "Champ incorrect"
                return false
            }
        }
        */

        // Si tout les input vérifié sont validé, envoie l'objet dans localStorage:
        if (verifyFirstName() && verifyLastName() && verifyAddress() && verifyCity() && verifyEmail() /*&& verifyCodeZip()*/ ) {

            // Crée la clef, convertit l'objet en chaine de caractére et l'envoie dans localStorage:
            localStorage.setItem("orderTeddies", JSON.stringify(orderTeddies))

            // Envoie sur le serveur avec la méthode fetch
            // Variable contenant l'adresse du serveur
            const urlPost = 'http://localhost:3000/api/teddies/order'
            // http://127.0.0.1:5500/front/panier.htmlf

            // Objet contenant les options en second paramétre de fetch:
            var myInit = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json;charset=UTF-8'
                }),
                body: JSON.stringify(orderTeddies),
                mode: 'cors',
                cache: 'default'
            };

            // Fetch à laquelle on donne en paramétres l'url et options:
            console.log('Order Teddies:', orderTeddies);
            fetch(urlPost, myInit)
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                // Quand la promesse est tenue, elle est parsée au format Json
                .then(json_object => {
                    // Quand la promesse est tenue, crée une variable qui contient l'objet:
                    console.log('JSON Object:', json_object);
                    let getOrder = json_object

                    // Crée la clef, convertit l'objet en chaine de caractére et l'envoie dans localStorage:
                    localStorage.setItem("getOrder", JSON.stringify(getOrder))

                    // remove orderTeddies
                    localStorage.removeItem("orderTeddies")

                    // Va à la page:-
                    window.location = "confirmation.html"
                })

        } else {

        }
    })
}
sendOrder()

// Si tous les inputs vérifiés sont validés, envoie l'objet dans localStorage:
// if (verifyFirstName() && verifyLastName() && verifyAddress() && verifyCity() && verifyEmail() /*&& verifyCodeZip()*/ ) {

//     // Crée la clef, convertit l'objet en chaîne de caractères et l'envoie dans localStorage:
//     localStorage.setItem("orderTeddies", JSON.stringify(orderTeddies));

//     // Simule l'envoi au serveur en utilisant une fonction locale
//     simulateServerRequest(orderTeddies);
// } else {
//     // Gérer les erreurs de validation ici
// }

// // Fonction pour simuler l'envoi des données au serveur
// function simulateServerRequest(orderTeddies) {
//     // Simule un délai de traitement
//     setTimeout(() => {
//         // Crée une réponse simulée
//         let simulatedResponse = {
//             orderId: "123456789",
//             products: orderTeddies.products,
//             contact: orderTeddies.contact,
//             totalPrice: orderTeddies.totalPrice
//         };

//         // Crée la clef, convertit l'objet en chaîne de caractères et l'envoie dans localStorage:
//         localStorage.setItem("getOrder", JSON.stringify(simulatedResponse));

//         // Supprime orderTeddies
//         localStorage.removeItem("orderTeddies");

//         // Va à la page de confirmation
//         window.location = "confirmation.html";
//     }, 1000); // Simule un délai de 1 seconde
// }
//     })
// }
// // Appelle la fonction sendOrder
// sendOrder();