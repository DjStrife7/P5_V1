// On récupère dans un premier temps les éléments présent dans le localStorage
let cart = JSON.parse(localStorage.getItem('cart'));

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
    document.querySelector('h1').textContent = `Votre panier ne contient aucun article`;
  } else for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    canapeInfos = await getInfos(item.id);

    // On envoi le nouveau contenu dans la page
    document.getElementById('cart__items').innerHTML +=
    `
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${canapeInfos.imageUrl}" alt="${canapeInfos.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${canapeInfos.name}</h2>
                    <p>${item.color}</p>
                    <p>${canapeInfos.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;

    // Du coup, on pousse les infos dans le tableau canape
    canape.push(item.id);

    updateLocalStorage();
    removeCanape();

  }
}

displayProductsInToCart();


// Création d'une fonction pour mettre à jour le localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
};


// Création d'une fonction pour calculer le montant total du panier de l'utilisateur et lui retourner le résultat




// Création de la fonction pour supprimer les produits du panier
function removeCanape() {

  // On récupère l'élément HTML via sa classe pour pouvoir le supprimer
  const deleteCanape = document.getElementsByClassName('deleteItem');

  // Pour chaque élément "Supprimer"
  for (let i = 0; i < deleteCanape.length; i++) {

    // >On ajoute un écouteur d'événement "click" à l'élément "Supprimer"
    deleteCanape[i].addEventListener('click', (event) => {

      // On empêche le rechargement de la page
      event.preventDefault();

      // On enregistre l'ID et la couleur du produit à supprimer
      const deleteId = cart[i].id;
      const deleteColor = cart[i].color;

      // On filtre les produits à conserver dans le panier et supprime le produit cliqué
      cart = cart.filter(
        (element) => element.id !== deleteId || element.color !== deleteColor
      );

      // Ensuite, on met à jour le LocalStorage avec les produits restants
      localStorage.setItem('cart', JSON.stringify(cart));

      // On affiche un message de confirmation de la suppression du produit pour informer l'utilisateur de son action
      alert('Votre article a bien été retiré de votre panier !');

      // Enfin, on actualise la page du panier
      window.location.href = 'cart.html';
    });
  }
}