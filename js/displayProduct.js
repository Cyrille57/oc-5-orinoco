///////////////////////////////////////////////////////////
////////// Afficher le produit sur product.html: //////////
///////////////////////////////////////////////////////////


// 1) ////////////////////////////////////////////////////////
// Récupére l'id de l'url avec la propriété .search de window.location:
const getIdUrl = window.location.search;
//console.log(getIdUrl)
// réponse : ?id=XXXXXXXX


// 2) /////////////////////////////////////////////////////////
// Purge getIdUrl de ?id= et recupere uniquement l'id avec la méthode getUrlParams:

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdUrl);

// retournera la première valeur associée au paramètre de recherche donné:
const getId = getUrlParams.get('id')
//console.log(getId)
// réponse : xxxxxxxxx


// 3) /////////////////////////////////////////////////////////
// Fonction qui concaténe l'url de l'API avec l'id récupéré et filtré
function assemblyId(getId) {
    //console.log(getId);
    //réponse : 5beaaa8f1c9d440000a57d95

    // Déclaration des variables:
    const url = "https://orinoco-oc-5.herokuapp.com/api/teddies";
    const urlProduct = url + "/" + getId;
    //console.log(urlProduct)
    // reponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

    connect2(urlProduct);
}
assemblyId(getId);


// 4) /////////////////////////////////////////////////////////
// XMLHttpRequest se connecte et récupére les données de l'url précédent:
async function connect2(urlProduct) {
    //console.log(urlProduct)
    // reponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

    // Creer un nouvel objet Ajax de type XMLHttpRequest:
    let xhr = new XMLHttpRequest();

    // Détecte de la requête:
    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            // Envoie terminé et contenu bien recue et convertit en Json:
            var result2 = JSON.parse(this.responseText);
            //console.log(result2);

            // envoie le result2 a la fonction displayProduct:
            displayProduct(result2);
            //console.log(displayProduct)
        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
            console.log("Erreur 500");
            window.location.href = 'page404.html'
        }
    };

    // Ouvre la connexion en précisant la méthode:
    xhr.open("GET", urlProduct, true);

    // Envoie la requête:
    xhr.send();
}


// 5) ////////////////////////////////////////////////////////
// Fonction qui affiche les données par rapport a l'id du produit:
function displayProduct(result2) {
    //console.log(result2)

    ///////////////////////////////////////////////////////////
    //Selectionne l'id parent:
    let main = document.querySelector('main')

    ///////////////////////////////////////////////////////////
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div')
    addClass(divContainer, 'container')
    addClass(divContainer, 'containerCardProduct')

    // Row:
    let divRow = createTag('div')
    addClass(divRow, 'row')

    // Col-12
    let divCol = createTag('div')
    addClass(divCol, 'col-12')

    ///////////////////////////////////////////////////////////
    // Création de la box qui vas contenir le produit:

    // Box:
    let divBox = createTag('div')
    addClass(divBox, 'box')

    // BoxProduct
    let divBoxProduct = createTag('div')
    addClass(divBoxProduct, 'box__product')

    ///////////////////////////////////////////////////////////
    // Création de la carte produit:

    // Card:
    let divCard = createTag('div')
    divCard.setAttribute("id", "divCardIndex")
    addClass(divCard, 'card')
    addClass(divCard, 'text-center')

    // Card-body:
    let divCardBody = createTag('div')
    addClass(divCardBody, 'card-body')
    addClass(divCardBody, 'card-body-product')

    ///////////////////////////////////////////////////////////
    // Partie gauche de la box:

    // PictureBox:
    let divPictureBox = createTag('div')
    addClass(divPictureBox, 'picture-box')

    // PictureProduct:
    let divPictureProduct = createTag('img')
    addClass(divPictureProduct, 'picture__product')

    // Récupére l'imageUrl
    divPictureProduct.src = result2.imageUrl
    // Alt de l'image:
    divPictureProduct.alt = 'Image de nounours de la gamme Orinoco'

    // ColorTitle
    let divColorTitle = createTag('div')
    addClass(divColorTitle, 'color__title')
    divColorTitle.innerHTML = "Choix des couleurs:"

    // PictureColor:
    let divPictureColor = createTag('div')
    addClass(divPictureColor, 'picture__color')

    // Color:
    let divColor = createTag('div')
    addClass(divColor, 'color')

    // Choice:
    let divChoice = createTag('div')
    addClass(divChoice, 'choice')

    // Recupére l'objet colors:
    let colors = result2.colors

    // Boucle qui vas parcourir le tableau color:
    for (var i = 0; i < colors.length; i++) {

        // Création du divColorChoice:
        let divColorChoice = createTag('a')
        addClass(divColorChoice, 'color--choice')

        divColorChoice.setAttribute("href", "#")
        divColorChoice.setAttribute("data-toggle", "tooltip")
        divColorChoice.setAttribute("data-placement", "bottom")
        divColorChoice.setAttribute("title", colors[i])

        // Récupére les couleurs une à une:
        let selectColors = colors[i]

        // Convertit dark et pale brown et met le background adéquate:
        switch (selectColors) {
            case 'Dark brown':
                divColorChoice.style.backgroundColor = "#341c02"
                break;
            case 'Pale brown':
                divColorChoice.style.backgroundColor = "#755847"
                break;
            default:
                divColorChoice.style.backgroundColor = colors[i]
        }
        divChoice.appendChild(divColorChoice)
    }

    // Séparation:
    let divSeparation = createTag('div')
    addClass(divSeparation, 'separation')

    ///////////////////////////////////////////////////////////
    // Partie droite de la box:

    // Descrition Box:
    let divDescriptionBox = createTag('div')
    addClass(divDescriptionBox, 'description-box')

    // CardHeaderDescription:
    let divCardHeaderDescription = createTag('div')
    addClass(divCardHeaderDescription, 'card-header')

    // DescriptionTitle
    let divDescriptionTitle = createTag('h3')
    addClass(divDescriptionTitle, 'description__title')

    // DescriptionProduct:
    let divDescriptionProduct = createTag('p')
    addClass(divDescriptionProduct, 'description__product')

    // DescriptionPrice:
    let divDescriptionPrice = createTag('p')
    addClass(divDescriptionPrice, 'description__price')

    // CardFooter:
    let divCardFooter = createTag('div')
    addClass(divCardFooter, 'card-footer')
    addClass(divCardFooter, 'card-footer--height')

    // ButtonBox:
    let divButtonBox = createTag('div')
    addClass(divButtonBox, 'button-box')

    // a:
    let divA = createTag('a')
    addClass(divA, 'btn')
    addClass(divA, 'panier')
    addClass(divA, 'rounded-pill')
    addClass(divA, 'btn-dark')
    addClass(divA, 'btn-lg')
    divA.textContent = "Ajouter au panier"
    divA.setAttribute("href", "panier.html")
    console.log(divA)

    // Ajoute la reponse trouvé dans l'objet:
    divDescriptionTitle.innerHTML = result2.name
    divDescriptionProduct.innerHTML = result2.description
    divDescriptionPrice.innerHTML = result2.price /100 + "€"

    // Ajout des élément de base:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    // Ajout de la box qui vas contenir le produit:
    divCol.appendChild(divBox)
    divBox.appendChild(divBoxProduct)

    // Ajout de la carte produit:
    divBoxProduct.appendChild(divCard)
    divCard.appendChild(divCardBody)

    // Ajout de la partie gauche de la box:
    divCardBody.appendChild(divPictureBox)
    divPictureBox.appendChild(divPictureProduct)

    // Ajout de la partie choix de couleur:
    divPictureBox.appendChild(divPictureColor)
    divPictureColor.appendChild(divColor)
    divPictureColor.appendChild(divChoice)
    divColor.appendChild(divColorTitle)

    // Ajout de la séparation:
    divCardBody.appendChild(divSeparation)

    // // Ajout de la partie droite de la box:
    divCardBody.appendChild(divDescriptionBox)
    divDescriptionBox.appendChild(divCardHeaderDescription)
    divDescriptionBox.appendChild(divDescriptionTitle)
    divDescriptionBox.appendChild(divDescriptionProduct)
    divDescriptionBox.appendChild(divDescriptionPrice)
    divDescriptionBox.appendChild(divCardFooter)

    // Ajout du bouton:
    divCardFooter.appendChild(divButtonBox)
    divButtonBox.appendChild(divA)

    // Envoie l'id du produit à la fonction sendCaddy:
    sendCaddy(result2._id)

}