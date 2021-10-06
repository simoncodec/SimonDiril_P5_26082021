

fetch ('http://localhost:3000/api/cameras')
.then ((response ) => response.json())
.then ((data) => {
    getListeProduit(data);

})

// cas d'erreur

.catch(function(error){
    alert("desoler une erreur technique empêche d’afficher les produits")
})

// creation de la fonction qui permets de recuperé les elements en backend
function getListeProduit(data){
    
    for (produit of data){
        let liste = document.getElementById("liste");
        let price = conversionPrix(produit.price);
        liste.innerHTML +=             `<div class="row mx-3 my-4 boxing" style="width: 40rem;">
        <img src="${produit.imageUrl}" class="card-img-top" alt="${produit.name}">
        <div class="card-body">
          <h4 class="card-title">${produit.name}</h4>
          <p class="card-text">${price}</p>
          <a href="./Frontend/produit.html?_id=${produit._id}" class="btn btn-primary"> Acheter ce produit</a></div>
        </div>`;
    }
}

function conversionPrix(produitPrix) {
    let prix = `${produitPrix}`;
    prix = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', code: "€", }).format(prix / 100);
    return prix;
}