// Récupération des canapés depuis l'API
async function fetchProducts() {
  const reponse = await fetch("http://localhost:3000/api/products");
  const canapes = await reponse.json();

  document.querySelector(".items").innerHTML = "";
  generateProducts(canapes);
}

fetchProducts();

function generateProducts(tabCanapes) {
  for (let i = 0; i < tabCanapes.length; i++) {
    
    // Récupération d'un modèle de canapé
    const canape = tabCanapes[i];

    // Récupération de l'élément du DOM qui accueillera les différents canapés
    const sectionFiches = document.querySelector(".items");

    // Création d’une balise "a" dédiée au lien vers la fiche du canapé
    const linkElement = document.createElement("a");
    sectionFiches.appendChild(linkElement);
    linkElement.setAttribute("href", `./product.html?id=${canape._id}`);
    linkElement.addEventListener("click", function () {
      onclick = document.location.href = `./product.html?id=${canape._id}`;
    });

    // Création d’une balise "article" qui contiendra toutes les informations du canapé
    const infosElement = document.createElement("article");
    linkElement.appendChild(infosElement);

    // Création des différentes balises qui composerons les détails du canapé
    const idElement = document.createElement("p");
    idElement.innerText = canape._id;
    const imageElement = document.createElement("img");
    imageElement.src = canape.imageUrl;
    imageElement.setAttribute("alt","${canape.altTxt}");
    const nameElement = document.createElement("h3");
    nameElement.innerText = canape.name;
    const priceElement = document.createElement ("p");
    priceElement.innerText = `Prix: ${canape.price} €`;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = canape.description;

    // Rattachement de la balise "article" aux différentes sous sections
    infosElement.appendChild(imageElement);
    infosElement.appendChild(nameElement);
    infosElement.appendChild(priceElement);
    infosElement.appendChild(descriptionElement);
    
  }
};
