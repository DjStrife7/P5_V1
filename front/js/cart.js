// On récupère dans un premier temps les éléments présent dans le localStorage
let cart = JSON.parse(localStorage.getItem('cart'));

/*console.log(cart);*/

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

  // On crée deux variable pour nous permettre de calculer le prix et la quantité du panier
  let totalPrice = 0;
  let totalQuantity = 0;

  // On doit d'abord vérifier si nous avons des éléments dans le panier, si nous n'avons rien, on retourne un message comme quoi le panier est vide sinon on affiche ce qu'il y a dans le localStorage
  if (cart === null || cart.length === 0 || cart === undefined) {
    document.querySelector('h1').textContent = `Votre panier ne contient aucun article`;
  } else {
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
  
      canapeInfos = await getInfos(item.id);
  
      // Mise en place du calcul des quantité et du prix global du panier
      totalPrice += canapeInfos.price * item.quantity;
      totalQuantity += parseInt(item.quantity);
  
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
      addCanape();
    }
  } 

  // On affiche la quantité et le prix du panier sur la page HTML
  document.getElementById('totalQuantity').innerText = totalQuantity;
  document.getElementById('totalPrice').innerText = totalPrice;
}

displayProductsInToCart();


// Création d'une fonction pour mettre à jour le localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
};


// Création de la fonction pour ajouter des produits au panier
function addCanape() {

  // On récupère l'élément HTML via sa classe pour pouvoir ajouter les futurs canapés
  const itemQuantity = document.getElementsByClassName('itemQuantity')

  // Pour chaque élément "Ajouter"
  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener('change', (event) => {
      // On empêche le rechargement de la page
      event.preventDefault();

      let newItemQuantity = itemQuantity[i].value;
      let newTotalQuantity = document.getElementById('totalQuantity');

      const newLocalStorage = {
        id: cart[i].id,
        img: cart[i].img,
        name: cart[i].name,
        color: cart[i].color,
        quantity: parseInt(newItemQuantity),
      };

      if (newItemQuantity > 100) {
        alert(`Vous avez selectionné trop de produits`);
        return;
      };

      if (newItemQuantity <= 0) {
        alert(`Vous avez une quantité non invalide`);
        return;
      };

      cart[i] = newLocalStorage;
      localStorage.setItem('cart', JSON.stringify(cart));

      // On affiche un message de confirmation de la suppression du produit pour informer l'utilisateur de son action
      alert('Votre article a bien été ajouté de votre panier !');

      // Enfin, on actualise la page du panier
      window.location.href = 'cart.html';
    });
  }
}


// Création de la fonction pour supprimer les produits du panier
function removeCanape() {

  // On récupère l'élément HTML via sa classe pour pouvoir supprimer les canapés
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


/*----------  FORMULAIRE  ----------*/

// On cible en premier lieu le bouton "Commander" du formulaire
const orderButton = document.getElementById('order');
orderButton.addEventListener('click', (event) => {
  event.preventDefault();

  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value
  };

  // Ici on va vérifier que le panier n'est pas vide et que le formulaire est bien rempli pour pouvoir finalisr la commande en la chargeant dans le localStorage
  if (cart == null || cart.length == 0) {
    alert(`Votre panier est vide.`)
  }
  if (
    checkInput(validForm.firstname) == false &&
    checkInput(validForm.lastname) == false &&
    checkInput(validForm.address) == false &&
    checkInput(validForm.city) == false &&
    checkInput(validForm.email) == false
  ) {
    alert(`Le formulaire est incorrect, merci de vérifier vos informations.`)
  }
  if (
    cart.length > 0 &&
    checkInput(validForm.firstname) &&
    checkInput(validForm.lastname) &&
    checkInput(validForm.address) &&
    checkInput(validForm.city) &&
    checkInput(validForm.email)
  ) {
    // Si le formulaire est correctement rempli, on l'enregistre dans le localStorage
    localStorage.setItem('contact', JSON.stringify(contact));
    // Ensuite on appelle la fonction qui envoie les données au serveur
    sendToServer();
  }

  function sendToServer() {
    fetch(`http://localhost:3000/api/products/order`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        products: canape,
      }),
    })
    // On récupère la réponse de l'API orderId et on la stock
      .then((reponse) => {
        console.log(reponse);
        return reponse.json();
      })
      .then((server) => {
        const orderId = server.orderId;

        // Enfin, si oderId n'est pas undefined, on redirige l'utilisateur vers la page de confirmation
        if (orderId != undefined) {
          location.href = `confirmation.html?id=` + orderId;
        }
      });
  }
});

// On crée une variable pour le remplissage du formulaire qui pourra nos retourner un message d'erreur si non conforme
const validForm = {
  firstname: {
    element: document.getElementById('firstName'),
    regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: `Prénom saisie invalide`
  },
  lastname: {
    element: document.getElementById('lastName'),
    regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: `Nom saisie invalide`
  },
  address: {
    element: document.getElementById('address'),
    regex: /^[a-zA-Z0-9.,-_ ]{5,50}[  ]{0,2}$/,
    errorMsg: `Adresse saisie invalide`
  },
  city: {
    element: document.getElementById('city'),
    regex: /^[a-zA-Z][a-zA-Z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: `Ville saisie invalide`
  },
  email: {
    element: document.getElementById('email'),
    regex: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
    errorMsg: `Email saisie invalide`
  }
};

const inputFirstName = document.getElementById('firstName');
if (inputFirstName) {
  inputFirstName.addEventListener('change', () => checkInput(validForm.firstname))
};

const inputLastName = document.getElementById('lastName');
if (inputLastName) {
  inputLastName.addEventListener('change', () => checkInput(validForm.lastname))
};

const inputAddress = document.getElementById('address');
if (inputAddress) {
  inputAddress.addEventListener('change', () => checkInput(validForm.address))
};

const inputCity = document.getElementById('city');
if (inputCity) {
  inputCity.addEventListener('change', () => checkInput(validForm.city))
};

const inputEmail = document.getElementById('email');
if (inputEmail) {
  inputEmail.addEventListener('change', () => checkInput(validForm.email))
};


function checkInput(input) {
  const inputElement = input.element;
  const inputRegex = input.regex;
  const returnErrorDiv = input.element.nextElementSibling;
  const regexIsValid = inputRegex.test(inputElement.value);

  if (regexIsValid) {
    returnErrorDiv.innerText = '';
  } else {
    returnErrorDiv.innerText = input.errorMsg;
  }
  return regexIsValid;
};