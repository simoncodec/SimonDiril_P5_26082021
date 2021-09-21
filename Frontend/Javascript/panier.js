////// utilisation de JSON.PARSE pour récupérer les données présentes dans localstorage
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
    ////// récupération de mes variables
    const panierPlein = document.getElementById("panierPlein");
    const formulaireCommande = document.getElementById("formulaireCommande");
    const panierVide = document.getElementById("panierVide");
    ////// si le panier est vide
    if (localStorage.getItem("produit") < 1) {
        panierPlein.classList.add("d-none");
        formulaireCommande.classList.add("d-none");
    } else {
        // si le panier n'est pas vide
        //panierVide.classList.add("d-none");
        formulaireCommande.classList.add("d-none");
        let listeProduitPanier = [];
        // pour chaque objet on créer une boucle qui affichera les produits du localstorage
        for (cpt = 0; cpt < localS.length; cpt++) {
            listeProduitPanier = listeProduitPanier + `
        <th scope="col titreTableau">${localS[cpt].name}</th>
        <th scope="col titreTableau">${localS[cpt].lenses}</th>
        <th scope="col titreTableau">${localS[cpt].quantite}</th>
        <th scope="col titreTableau">${localS[cpt].price}€</th>
        </tr>`;
        }
        if (cpt == localS.length) {
            let listePanier = document.getElementById("listeProduitPanier");
            listePanier.innerHTML = listeProduitPanier;
        }
    }
}



// calcul du montant total du panier
function totalPanier() {
    // récupération de l'id ou est afficher le total
    let totalPanier = document.getElementById("totalPanier");
    // utilisation d'un tableau pour stocker les prix de chaque produits
    let tableauListePrix = [];
    for (let j = 0; j < localS.length; j++) {
        prixProduitsPanier = localS[j].price * localS[j].quantite;

        //Calcul du prix total de tous les produits
        tableauListePrix.push(prixProduitsPanier);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    tableauListePrix = tableauListePrix.reduce(reducer);

    totalPanier.innerText = `${(tableauListePrix = new Intl.NumberFormat(
        "fr-FR",
        {
          style: "currency",
          currency: "EUR",
        }
      ).format(tableauListePrix))}`;

      localStorage.setItem("prixTotal", JSON.stringify(tableauListePrix));
}


//fonction pour vider le panier lorsque le client appuie sur vider le panier
function viderPanier() {
    const btnViderPanier = document.getElementById("viderPanier");
    btnViderPanier.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        location.reload();
    });
}

// fonction pour l'affichage du formulaire lorsque le client appuie sur valider panier
function afficherFormulaire() {
    const btnValidationPanier = document.getElementById("validationPanier");
    const formulaireCommande = document.getElementById("formulaireCommande");
    btnValidationPanier.addEventListener("click", (e) => {
        e.preventDefault();
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
        e.preventDefault();
        // condition pour valider si le formulaire est correctement rempli par le client
        if (!regexName.test(nom.value) ||
            !regexName.test(prenom.value) ||
            !regexEmail.test(email.value) ||
            !regexAddress.test(adresse.value) ||
            !regexCity.test(ville.value)) {
            alert("Merci de vérifier que les champs complétés sont corrects.");
        } else {
            
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
            console.log(order);



            // Envoi de la requete POST pour le backend
            fetch("http://localhost:3000/api/cameras/order", {
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