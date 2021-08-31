const params = new URLSearchParams(document.location.search);
const urlID = params.get('_id');

const newId = "http://localhost:3000/api/cameras/" + urlID;

let produitImage = document.getElementById("imageProduit");
let produitNom = document.getElementById("nomProduit"); 
let produitDescription = document.getElementById("descriptionProduit");
let produitPrix = document.getElementById("prixProduit");

fetch(newId)
    .then(produit => produit.json())
    .then ((produit) => {
        produitsFiche(produit);
        lensesChoice(produit);
    })

    .catch(function(error) {
        alert(error)
    })

function produitsFiche(produit) 
{
    produitImage.innerHTML += `<img src="${produit.imageUrl}" class="imgFicheProduit" alt="${produit.name}">`;
    produitNom.innerHTML += `<p>${produit.name}</p>`;
    produitDescription.innerHTML += `<p>${produit.description}</p>`;
    
    produitPrix.innerHTML += `<p>${produit.price}</p>`;

}

function lensesChoice(produit)
{
    let choixObjectif = document.getElementById("choixObjectif");
    console.log("choixObjectif");
    for (let i = 0; i < produit.lenses.lenght; i++)
    {
        let option = document.createElement("option");
        option.innerText = produit.lenses[i];
        choixObjectif.appendChild(option);
    }
}