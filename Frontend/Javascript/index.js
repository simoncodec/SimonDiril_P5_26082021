
fetch ('http://localhost:3000/api/cameras')
.then ((response ) => response.json())
.then ((data) => {
    getListeProduit(data);

})

// cas d'erreur

.catch(function(error){
    alert(error)
})

// creation de la fonction qui permets de recuperé les elements en backend
function getListeProduit(data){
    for (produit of data){
        let liste = document.getElementById("liste");
        liste.innerHTML +=             `<div class="row mx-3 my-4 boxing" style="width: 40rem;">
        <img src="${produit.imageUrl}" class="card-img-top" alt="${produit.name}">
        <div class="card-body">
          <h5 class="card-title">${produit.name}</h5>
          <p class="card-text">${produit.price}</p>
          <a href="./Frontend/produit.html?_id=${produit._id}" class="btn btn-primary stretched-link"> Acheter ce produits </a>
        
      </div>`;
    }
}
