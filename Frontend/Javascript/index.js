fetch ('http://localhost:3000/api/cameras')
.then ((response ) => response.json())
.then ((data) => {
    getListeProduit(data);

})
.catch(function(error){
    alert(error)
})

function getListeProduit(data){
    for (produit of data){
        let liste = document.getElementById("liste");
        liste.innerHTML +=             `<div class="container-produit">
        <div class="card border rounded">
                <img src="${produit.imageUrl}" class="imgTeddy" alt="${produit.name}">
                <h3 class="card-title">${produit.name}</h3>
                <h4 class="card-title price">${produit.price}</h4>
                <a href="./Frontend/produit.html?_id=${produit._id}"><button class="btnMore"> Voir plus </button></a>
        <div>
    </div>`;
    }
}