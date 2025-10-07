// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

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

    // Rattachement de la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // Rattachement de l'image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement)
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
}

const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFilterPrix = document.querySelector(".btn-filtrer-prix");

boutonFilterPrix.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

const boutonFilterDescription = document.querySelector(".btn-filtrer-description");

boutonFilterDescription.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesFiltrees);
});