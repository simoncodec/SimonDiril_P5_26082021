// utilisation de JSON.PARSE pour récupérer les données présentes dans localstorage
let localS = JSON.parse(localStorage.getItem("produit"));

main();

function main() {
    afficherPanier();
    totalPanier();
    viderPanier();
    afficherFormulaire();
    validationFormulaireCommande();
}



function afficherPanier() {
    ////// récupération des variables
    const panierPlein = document.getElementById("panierPlein");
    const formulaireCommande = document.getElementById("formulaireCommande");
    const panierVide = document.getElementById("panierVide");
    ////// si le panier est vide
    if (localStorage.getItem("produit") < 1) {
        panierPlein.classList.add("d-none");
        formulaireCommande.classList.add("d-none");
    } else {
        // si le panier n'est pas vide
        panierVide.classList.add("d-none");
        formulaireCommande.classList.add("d-none");
        let listeProduitPanier = [];
        // pour chaque objet on créer une boucle qui affichera les produits du localstorage
        for (cpt = 0; cpt < localS.length; cpt++) {
            listeProduitPanier = listeProduitPanier + `
        <tr class="tableau">
        <td class="liste"><span>${localS[cpt].name}</span></td>
        <td class="liste"><span>${localS[cpt].objectif}</span></td>
        <td class="liste"><span>${localS[cpt].quantite}</span></td>
        <td class="liste"><span>${localS[cpt].price},00 €</span></td>
        </tr>`;
        }
        if (cpt == localS.length) {
            let listePanier = document.getElementById("listeProduitPanier");
            listePanier.innerHTML = listeProduitPanier;
        }
    }
}

//fonction pour vider le panier lorsque le client appuie sur vider le panier
function viderPanier() {
    const btnViderPanier = document.getElementById("viderPanier");
    btnViderPanier.addEventListener("click", (e) => {
        e.preventDefault;
        localStorage.clear();
        location.reload();
    });
}

function afficherFormulaire()
{
    const btnValidationPanier = document.getElementById("validationCommande");
    const formulaireCommande = document.getElementById("formulaireCommande");
    btnValidationPanier.addEventListener("click", (e) => {
        e.preventDefault;
        formulaireCommande.classList.toggle("d-none");
    });
}

function validationFormulaireCommande() {
    const validationCommande = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    let nom = document.getElementById("firstName");
    let prenom = document.getElementById("lastName");
    let adresse = document.getElementById("address");
    let ville = document.getElementById("city");
    let email = document.getElementById("email");

    // on écoute le click sur le bouton commande
    validationCommande.addEventListener("click", (e) => {

        // condition pour valider si le formulaire est correctement rempli par le client
        if (!regexName.test(nom.value) ||
            !regexName.test(prenom.value) ||
            !regexEmail.test(email.value) ||
            !regexAddress.test(adresse.value) ||
            !regexCity.test(ville.value)) {
            alert("Merci de vérifier que les champs complétés sont corrects.");
        } else {
            e.preventDefault();
            // création de l'objet contact pour la fiche client
            let products = [];
            let produitsCommandes = JSON.parse(localStorage.getItem("produit"));
            produitsCommandes.forEach(p => {
                products.push(p._id);
            })
            console.log(produitsCommandes);

            // création d'une constante rassemblant formulaire et produits 
                            const order = {
                                contact: {
                                    firstName: nom.value,
                                    lastName: prenom.value,
                                    address: adresse.value,
                                    city: ville.value,
                                    email: email.value,
                                },
                                products: products,
                            };
                            console.log(order)

                        // Envoi de la requete POST pour le backend
                        fetch("http://localhost:3000/api/teddies/order", {
                            method: "POST",
                            body: JSON.stringify(order),
                            headers: { "Content-Type": "application/json" },
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            localStorage.setItem("orderId", data.orderId);
        
                            // envoi vers la page de confirmation
                            document.location.href = "commande.html";
        
                        })
                        .catch((erreur) => console.log("erreur : " + erreur));
                }
            });
        }