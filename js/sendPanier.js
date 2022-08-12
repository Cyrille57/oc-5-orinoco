///////////////////////////////////////////////////////////
//// Ajouter le produit seléctionner dans localstorage ////
///////////////////////////////////////////////////////////


// 1) /////////////////////////////////////////////////////////
// Fonction pour ajouter au panier:
function sendCaddy(idProduct) {

    // Selectionne le bouton envoyer au panier:
    let btn_panier = document.querySelector("a.btn")

    // Ecoute le bouton :
    btn_panier.addEventListener("click", (event) => {

        // Annule l'action par défaut:
        event.preventDefault();

        // 2) /////////////////////////////////////////////////////////
        // fonction pour afficher une pop up de confirmation:
        const popConfirmation = () => {
            if (window.confirm(
                    "Votre produit a bien été ajouté au panier ! Consultez le panier OK ou revenir à l'accueil ANNULER")) {
                window.location.href = "panier.html"
            } else {
                window.location.href = "index.html"
            }
        }

        // 3) /////////////////////////////////////////////////////////
        // Fonction pour ajouté un produit selectionné dans le localstorage:
        const addProduct = () => {
            productLocalStorage = verificationIdProductLocalStorage(idProduct, productLocalStorage)

            // Envoie dans local storage avec la méthode setItem dans le format json:
            localStorage.setItem("product", JSON.stringify(productLocalStorage))
        }

        // 4) /////////////////////////////////////////////////////////
        // Local Storage:

        // Initialise la variable pour mettre les clef et values qui vont etre présent dans localstorage,
        // et recupéré product en format javascript:
        let productLocalStorage = JSON.parse(localStorage.getItem("product"))

        // Verifie si déja un article ou non dans le local strorage:
        if (productLocalStorage) {
            addProduct()
            popConfirmation()
        } else {
            // Creer un tableau vide
            productLocalStorage = []
            addProduct()
            popConfirmation()
        }
    })
}


// 5) /////////////////////////////////////////////////////////
// Vérifie si l'id du produit est déja dans le LocalStorage:
function verificationIdProductLocalStorage(idProduct, productLocalStorage, getValue) {

    console.log(idProduct)
    console.log(productLocalStorage)

    // Retounr l'index du produit
    var indexIdProduct = productLocalStorage.map(function (item) {
        return item.idProduct;
    }).indexOf(idProduct);

    // Si l'index retourné est supérieur à 0, alors rajoute un sinon créer un autre objet:
    if (indexIdProduct >= 0) {
        productLocalStorage[indexIdProduct].quantityProduct++
    } else {

        let objectProduct = {

            quantityProduct: 1,
            idProduct: idProduct,

        }

        // Pousse l'objet produit dans le tableau:
        productLocalStorage.push(objectProduct)
        console.log(objectProduct)
    }
    return productLocalStorage
}