///////////////////////////////////////////////////////////
////////// Afficher les produits sur index.html: //////////
///////////////////////////////////////////////////////////


// 1) ////////////////////////////////////////////////////////
// XMLHttpRequest se connecte et récupére les données:

// Déclaration de la variable contenant l'url:
const url = "https://orinoco-oc-5.herokuapp.com/api/teddies";

// Création de la fonction qui se connecte:
async function connect(url) {

  // Creer un nouvel objet Ajax de type XMLHttpRequest:
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    // Détecte l'état de la requête:
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      // Envoie terminé, contenu récupéré et convertit en Json:
      var result = JSON.parse(this.responseText)
      //console.log(result)
      // Réponse: retourne le tableau avec les produits

      // envoie le result à la fonction display:
      displayAll(result)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      // Si erreur 500 affiche dans console:
      console.log("Erreur 500")
    }
  }

  // Ouvre la connexion en précisant la méthode:
  xhr.open("GET", url, true)

  // Envoie la requête:
  xhr.send()
}
connect(url)


// 2) ////////////////////////////////////////////////////////
// Fonction qui affiche les produit:
function displayAll(result) {

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  //////////////////////////////////////////////////////////
  // Création des éléments de base enfants:

  // Container:
  let divContainer = createTag('div')
  addClass(divContainer, 'container')

  // Row:
  let divRow = createTag('div')
  addClass(divRow, 'row')

  // Col-12
  let divCol = createTag('div')
  addClass(divCol, 'col-12')

  // Box:
  let box = createTag('div')
  addClass(box, 'box')

  // BoxCarte:
  let boxCarte = createTag('div')
  addClass(boxCarte, 'box__carte')

  //////////////////////////////////////////////////////////
  // Boucle qui parcours result:
  for (var i = 0; i < result.length; i++) {

    //////////////////////////////////////////////////////////
    // Création des éléments enfants à chaque tour du tableau:

    // Carte:
    let divCarte = createTag('div')
    addClass(divCarte, 'carte')

    // CarteTurned:
    let divCarteTurned = createTag('div')
    addClass(divCarteTurned, 'carte__turned')

    // Front:
    let divCarteFront = createTag('label')
    addClass(divCarteFront, 'carte__front')

    //////////////////////////////////////////////////////////
    // Intérieur du Front:

    // Image:
    let divCardPicture = createTag('img')
    addClass(divCardPicture, 'carte--picture')
    divCardPicture.src = result[i].imageUrl
    divCardPicture.alt = 'Image de nounours de la gamme Orinoco'

    // Overlay:
    let divCarteOverlay = createTag('div')
    addClass(divCarteOverlay, 'carte--overlay')

    // Titre du Front:
    let divCarteTitle = createTag('h3')
    addClass(divCarteTitle, 'carte--title')

    // Back:
    let divCarteBack = createTag('label')
    addClass(divCarteBack, 'carte__back')
    addClass(divCarteBack, 'text-center')
    addClass(divCarteBack, 'bg-gradient')

    //////////////////////////////////////////////////////////
    // Intérieur du Back:

    // Header:
    let divCarteHeader = createTag('div')
    addClass(divCarteHeader, 'card-header')
    addClass(divCarteHeader, 'card-header--modify')

    // Body:
    let divCarteBody = createTag('div')
    addClass(divCarteBody, 'card-body')

    //////////////////////////////////////////////////////////
    // Intérieur de Card-body:

    //Lien du produit:
    let link= createTag('a')
    link.textContent= 'link'

     //Récupére l'id pour le mettre dans le href:
     let id = result[i]._id

     // Ajoute l'id dans l'url des produit sélectionnés:
     link.setAttribute("href", "product.html?id=" + id)
     addClass(link, 'link')
     link.innerHTML = result[i].name
    addClass(link, 'btn')
    addClass(link, 'rounded-pill')
    addClass(link, 'btn-outline-light')

    // Description:
    let pCarteDescription = createTag('p')
    addClass(pCarteDescription, 'card-text')
    addClass(pCarteDescription, 'text-black-50')

    // Price:
    let price = createTag('p')
    addClass(price, 'card-text')

    // Intérieur de Price:
    let strongPrice = createTag('strong')
    addClass(strongPrice, 'text-light')
    addClass(strongPrice, 'font-weight-normal')

    // Carte Footer
    let carteFooter = createTag('div')
    addClass(carteFooter, 'card-footer')

    //////////////////////////////////////////////////////////
    // Affiche les données:
    divCardPicture.innerHTML = result[i].imageurl
    divCarteTitle.innerHTML = result[i].name
    pCarteDescription.innerHTML = result[i].description
    price.innerHTML = result[i].price /100 + "€"

    //////////////////////////////////////////////////////////
    // Ajout des élément dans le index.html:

    // Ajout des élément de base:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    divCol.appendChild(box)
    box.appendChild(boxCarte)
    boxCarte.appendChild(divCarte)
    divCarte.appendChild(divCarteTurned)

    // Ajoute le Front de la carte:
    divCarteTurned.appendChild(divCarteFront)
    divCarteFront.appendChild(divCardPicture)
    divCarteFront.appendChild(divCarteOverlay)
    divCarteOverlay.appendChild(divCarteTitle)

    // Ajoue le Back de la carte:
    divCarteTurned.appendChild(divCarteBack)
    divCarteBack.appendChild(divCarteBody)
    divCarteBody.appendChild(link)
    divCarteBody.appendChild(pCarteDescription)
    divCarteBody.appendChild(price)

  }
}