
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
        liste.innerHTML +=             `<div class="container">
        <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
                <img src="${produit.imageUrl}" class="img-fluid" alt="${produit.name}">
                <h3 class="card-title">${produit.name}</h3>
                <h4 class="card-title price">${produit.price}</h4>
                <a class="btn" href="./Frontend/produit.html?_id=${produit._id}"><button class="btnMore"> Acheter ce produits </button></a>
        <div>
    </div>`;
    }
}
