//Récupération de la chaîne de requete dans l'url
const queryStringUrlId = new URL(document.URL);
const productId = queryStringUrlId.searchParams.get("id");


// Récupération du canapé depuis l'API
async function fetchOneProduct() {
  const reponse = await fetch("http://localhost:3000/api/products/" + productId);
  const canape = await reponse.json();

  // Récupération de l'élément du DOM qui accueillera l'image du canapé
  const sectionImageProduct = document.querySelector(".item__img");

  // Création de la balise image
  const imageProduct = document.createElement("img");
  imageProduct.src = canape.imageUrl;
  imageProduct.setAttribute("alt", `${canape.altTxt}`);

  sectionImageProduct.appendChild(imageProduct);

  // Insertion des éléments dans les différentes balises
  document.getElementById("title").innerText = canape.name;
  document.getElementById("price").innerText = canape.price;
  document.getElementById("description").innerText = canape.description;
  
  chooseColor(canape.colors);
};

fetchOneProduct();


// Création de la zone de sélection des couleurs
//tabColors est un tableau qui contient des string
function chooseColor(tabColors) {
  for (let i = 0; i < tabColors.length; i++) {

    // Récupération d'une couleur
    const oneColor = tabColors[i];

    // Récupération de l'élément du DOM qui accueillera le choix de couleur
    const sectionColors = document.querySelector("#colors");

    // Création des balises pour l'affichage et le choix des différentes couleurs
    const productColor = document.createElement("option");
    productColor.value = oneColor;
    productColor.innerText = oneColor;

    // Rattachement de la(les) balise(s) "option" à la sous section #colors
    sectionColors.appendChild(productColor);

  }
};


// Création de la fonction qui permettra d'ajouter le produit en appuyant sur le bouton d'envoi
function addProductToCart(canape) {

  // On cible le bouton pour les futurs opérations
  const buttonAddToCart = document.getElementById('addToCart');

  buttonAddToCart.addEventListener("click", function (event) {

    // Récupération des différentes informations saisie par l'utilisateur
    const id = productId;
    const name = document.getElementById('title').innerText;
    const color = document.getElementById('colors').value;
    const quantity = document.getElementById('quantity').value;

    // Vérification des informations sélectionnées par l'utilisateur
    if (color === undefined || color === "" || quantity < 1 || quantity > 100 || quantity === undefined) {
      return
    } else {
      // On ajoute les valeurs du canapé choisit par l'utilisateur
      const selectProduct = {
        id: id,
        name: name,
        color: color,
        quantity: quantity
      }
      console.log(selectProduct);

      // Création d'une variable pour le localStorage
      const localStorageCart = JSON.parse(localStorage.getItem("cart"));

      //Vérification du contenu du panier dans le localStorage
      if (localStorageCart) {
        // On effectue une vérification de la présence d'un canapé via l'id et la couleur
        const modelCanape = localStorageCart.find(
          (modelCanape) => selectProduct.id === modelCanape.id && selectProduct.color === modelCanape.color
        );

        // Si c'est true, on ajoute la nouvelle quantité à la précédente
        if (modelCanape) {
          const newQuantityModelCanape = parseInt(selectProduct.quantity) + parseInt(modelCanape.quantity);
          window.location.href = 'cart.html';

          // Si on dépasse les 100 unités, on informe l'utilisateur d'un problème de stock
          if (newQuantityModelCanape >= 100) {
            return ("Vous avez commandé plus de 100 exemplaires de ce modèle. De ce fait, les délais de livraison ne peuvent être honoré. Merci de sélectionner une quantité maximum de 100 unités par commande.")
          }
          // Si on ne dépasse pas les 100 on ajoute la quantité selectionnée
          modelCanape.quantity = newQuantityModelCanape;

          localStorage.setItem("cart", JSON.stringify(localStorageCart));
          return;
        }
        
        // Si le produit n'existe pas dans le localStorage, on l'ajoute
        localStorageCart.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
      } else {

        // Sinon on ajoute un nouveau tableau dans lequel on met le nouveau canape 
        const newModelCanape = [];
        newModelCanape.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(newModelCanape));
      }
      document.getElementById('addToCart').textContent = "Votre selection a été ajouté au panier!";
      window.location.href = 'cart.html';
    }
  });
}

// Création d'un message d'erreur ci la demande remplie n'est pas valide afin d'informer l'utilisateur
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle('active')
}

addProductToCart();