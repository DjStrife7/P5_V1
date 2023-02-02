// On récupère dans un premier temps les éléments présent dans le localStorage
const cart = JSON.parse(localStorage.getItem("cart"));

console.log(cart);

// Du coup, on crée un tableau afin de récupérer les informations des produits présent dans le loaclStorage
const canape = [];

// Après on crée une variable pour la référence de la commande
const orderId = "";

// Maintenant on récupère les informations depuis l'API
function getInfos(productId) {
  reponse = fetch(`http://localhost:3000/api/products/` + productId)
  .then(infos => {
    return infos.json();
  })
  .catch(error => {
    error = `Une erreur est survenue lors du chargement de la page, merci d'essayer à nouveau.`;
    alert(error);
  })
  return reponse;
};


// Création de la partie affichage des produits et du résumé de la commande
async function displayProductsInToCart() {

  // On doit d'abord vérifier si nous avons des éléments dans le panier, si nous n'avons rien, on retourne un message comme quoi le panier est vide sinon on affiche ce qu'il y a dans le localStorage
  if (cart === null || cart.length === 0 || cart === undefined) {
    document.querySelector("h1").textContent = `Votre panier ne contient aucun article`;
  } else for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    canapeInfos = await getInfos(item.id);


  }

}