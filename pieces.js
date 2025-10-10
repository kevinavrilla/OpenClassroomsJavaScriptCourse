// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d'une balise dédiée à une pièce
        const pieceElement = document.createElement("article");
        // Création de l'élément image
        const imageElement = document.createElement("img");
        // Accès à l'indice i de la liste pieces pour configurer la source de l'image
        imageElement.src = pieces[i].image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment."

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = `${pieces[i].disponibilite ? "En stock" : "Rupture de stock"}`;

        // Rattachement de l'image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);
        // Rattachement de la balise article à la section Fiches
        sectionFiches.appendChild(pieceElement);
    }
}

// Premier affichage de la page
genererPieces(pieces);

const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFilterPrix = document.querySelector(".btn-filtrer-prix");

boutonFilterPrix.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonFilterDescription = document.querySelector(".btn-filtrer-description");

boutonFilterDescription.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const nomsAbordables = pieces.map(piece => piece.nom);
for(let i = pieces.length -1; i >= 0; i--){
   if(pieces[i].prix > 35){
       nomsAbordables.splice(i,1)
   }
}
console.log(nomsAbordables)

// Création de l'en-tête
const pElementsAbordables = document.createElement('p');
pElementsAbordables.innerText = "Pièces abordables :";
// Création de la liste
const abordablesElements = document.createElement('ul');
// Ajout de chaque nom à la liste
for (let i=0; i < nomsAbordables.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = nomsAbordables[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(pElementsAbordables).appendChild(abordablesElements);

// Affichage des pièces disponibles et leur prix
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length -1; i >= 0; i--) {
    if(!pieces[i].disponibilite) {
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}
console.log(nomsDisponibles);

const disponiblesElements = document.createElement('ul');
for(let i = 0; i < nomsDisponibles.length; i++) {
    const descriptionElement = document.createElement('li');
    descriptionElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElements.appendChild(descriptionElement);
}
const pElementsDisponibles = document.createElement('p');
pElementsDisponibles.innerText = "Pièces disponibles :";
document.querySelector('.disponibles').appendChild(pElementsDisponibles).appendChild(disponiblesElements);

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= inputPrixMax.value;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})

// Efface le contenu de la balise body et donc l’écran
//document.querySelector(".fiches").innerHTML = '';