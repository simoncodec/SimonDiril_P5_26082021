let confirmation = localStorage.getItem("orderId");
let prixTotal = localStorage.getItem("prixTotal");

// affiche Mes informations
const recapitulatif = document.getElementById("recapitulatif");
recapitulatif.innerHTML +=
    `<h3>Récapitulatif de votre commande</h3>
    <p>Référence n° : <span>${confirmation}</span>.</p>
    <p>Facture d'un montant de : <span>${prixTotal}</span>.</p>`;

localStorage.clear();