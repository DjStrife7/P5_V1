// Import des fonctions présentent dans script.js
import { fetchProducts, generateProducts } from "./script";

// Récupération des informations dans l'url
const urlProduct = `./product.html?id=${canape._id}`;
const url = new URL(urlProduct);
const searchParams = new URLSearchParams(url.search);

if(searchParams.has('id')) {
  const urlId = searchParams.get('id');
}