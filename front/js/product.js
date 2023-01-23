//Récupération de la chaîne de requete dans l'url
const queryStringUrlId = new URL(document.URL);
const productId = queryStringUrlId.searchParams.get("id");

// Récupération du canapé depuis l'API
async function fetchOneProduct() {
  const reponse = await fetch(`http://localhost:3000/api/products/` + productId);
  const canape = await reponse.json();

  console.log(canape);

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
};

fetchOneProduct();


/*
//Création de la zone de sélection des couleurs
function chooseColor(tabColors) {
  for (let i = 0; i < tabColors.length; i++) {

    // Récupération d'une couleur
    const oneColor = tabColors[i];

    // Récupération de l'élément du DOM qui accueillera le choix de couleur
    const sectionColors = document.querySelector("#colors");

    // Création des balises pour l'affichage et le choix des différentes couleurs
    const productColor = document.createElement("option");
    productColor.value = oneColor.colors;


    // Rattachement de la(les) balise(s) "option" à la sous section #colors
    sectionColors.appendChild(productColor);

  }
};
*/