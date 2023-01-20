//Récupération de la chaîne de requete dans l'url
const queryStringUrlId = new URL(document.URL);
const productId = queryStringUrlId.searchParams.get("id");

console.log(productId);

// Récupération du canapé depuis l'API
async function fetchOneProduct() {
  const reponse = await fetch(`http://localhost:3000/api/products/` + productId);
  const canape = await reponse.json();

  /*document.querySelector(".item").innerHTML = "";*/
}

fetchOneProduct();


