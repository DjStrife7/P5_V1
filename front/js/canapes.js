// Récupération des canapés depuis l'API
async function fetchProducts() {
  const reponse = await fetch("http://localhost:3000/api/products");
  const canapes = await reponse.json();

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
    // Création d’une balise "article" qui contiendra toutes les informations du canapé
    const infosElement = document.createElement("article");
    linkElement.appendChild(infosElement);

    // Création du tableau de sélection des couleurs du canapé
    function chooseColors(tabColors) {
      for (let i = 0; i < tabColors.length; i++) {
        const color = tabColors[i];
        const colorOneElement = document.createElement("p");
        colorOneElement.innerText = canape.colors[0];
        const colorTwoElement = document.createElement("p");
        colorTwoElement.innerText = canape.colors[1];
        const colorThreeElement = document.createElement("p");
        colorThreeElement.innerText = canape.colors[2] ?? "\u{1F6AB}" === '🚫';
        const colorFourElement = document.createElement("p");
        colorFourElement.innerText = canape.colors[3];
      }
    };

    // Création des différentes balises qui composerons les détails du canapé
    const imageElement = document.createElement("img");
    imageElement.src = canape.imageUrl;
    imageElement.setAttribute("alt","${canape.altTxt}");
    const refElement = document.createElement("p");
    refElement.innerText = canape._id;
    const nameElement = document.createElement("h3");
    nameElement.innerText = canape.name;
    const priceElement = document.createElement ("p");
    priceElement.innerText = `Prix: ${canape.price} €`;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = canape.description;


    console.log(canape.colors[0]);
  }
};

