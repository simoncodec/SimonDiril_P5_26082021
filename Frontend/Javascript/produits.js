const params = new URLSearchParams(document.location.search);
const urlID = params.get('_id');

const newId = "http://localhost:3000/api/cameras/" + urlID;

let produitImage = document.getElementById("imgProduit");
let produitNom = document.getElementById("nomProduit"); 
let produitDescription = document.getElementById("descriptionProduit");
let produitPrix = document.getElementById("prixProduit");

fetch(newId)
    .then(produit => produit.json())
    .then ((produit) => {
        produitsFiche(produit);
        lensesChoice(produit);
        ajoutPanier(produit);
    })

    .catch(function(error) {
        alert(error)
    })

function produitsFiche(produit) 
{
    produitImage.innerHTML += `<img src="${produit.imageUrl}" class="img-fluid" alt="${produit.name}">`;
    produitNom.innerHTML += `<h5>${produit.name}</h5>`;
    produitDescription.innerHTML += `<p>${produit.description}</p>`;
    produit.price = produit.price /100;
    console.log(produitPrix);
    produitPrix.innerHTML = new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR', code: "€", }).format(produit.price);

}

function lensesChoice(produit) 
{
    const versionChoice = document.getElementById("choixObjectif");
    for (let lenses of produit.lenses) 
    {
        versionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
    }
}


function ajoutPanier(produit)
{
    // création de la constante du btn
    const btnAjoutPanier = document.getElementById("btnAjoutPanier");
    // écoute de l'evenement clic sur le btn d'ajout au panier 
    btnAjoutPanier.addEventListener("click", (event) => {
        event.preventDefault();

        // création constante pour choix de l'objectif et récupération de la valeur
        const idObjectif = document.getElementById("choixObjectif");
        const choixObjectif = idObjectif.value;

        // création constante pour choix de la quantité et récupération de la valeur
        const idQuantite = document.getElementById("quantite");
        const choixQuantite = idQuantite.value;
        console.log(produitPrix.innerHTML.replace(" ",""))
        console.log(parseFloat(produitPrix.innerHTML))
        // création de l'objet pour l'ajout au panier
        let newProduit = {
            name: produit.name,
            price: produit.price,
            lenses: choixObjectif,
            quantite: choixQuantite,
            _id: urlID
        };

        // déclaration d'une variable pour l'enregistrement des donnéesKey et value dans le localstorage
        // utilisation de JSON.PARSE pour récupérer les données présentes dans localstorage
        let produitAjoute = JSON.parse(localStorage.getItem("produit"));
        // si produits dans le localstorage

        if (produitAjoute < 1) {
            // Déclaration du tableau ou seront stockés les choix produits
            produitAjoute = [];
        }
        produitAjoute.push(newProduit);
        localStorage.setItem("produit", JSON.stringify(produitAjoute));

    });
}