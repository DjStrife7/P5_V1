// On crée une fonction pour récupérer l'Id du produit via l'adresse HTML
function getProductId() {
  return new URL(location.href).searchParams.get('id')
};

const orderId = getProductId();

// On va cibler l'élément dans le DOM afin de pouvoir le cibler plus tard pour lui ajouter des valeurs
const confirmation = document.getElementById('orderId');

function displayOderId() {
  // On affiche le numéro de commande dans la page avec un saut de ligne
  confirmation.innerHTML = `</br>` + orderId;

  // Et on termine en vidant le localStorage de tout ce qu'il contient
  localStorage.clear();
}

displayOderId(orderId);