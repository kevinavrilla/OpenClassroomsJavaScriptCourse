export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {

        piecesElements[i].addEventListener("click", async function (event) {

            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();

            // Stockage des avis dans le localStorage
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));

            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis)
        });
    }
}

export function afficherAvis(pieceElement, avis) {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur} :</b> ${avis[i].commentaire} <br>`;
    }
    pieceElement.appendChild(avisElement);
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur : rechargement
        event.preventDefault();

        // Création de l'objet du nouvel avis
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            nbetoiles: event.target.querySelector("[name=nbEtoiles]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
        };

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);

        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    })
}

export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par nombre d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nbCommentaires = [0, 0, 0, 0, 0];
    for (let commentaire of avis) {
        if (commentaire.nbetoiles === 0){
            commentaire.nbetoiles = 1;
        }
        nbCommentaires[commentaire.nbEtoiles - 1]++;
        // console.log(`Ajout de l'avis ${commentaire.commentaire}`)
    }
    
    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Etoiles attribuées",
            data: nbCommentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
        }],
    }
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    }
    // Rendu du graphique dans l'élément canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );
}

export async function afficherGraphiqueAvisDisponibilite() {
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const avisPiecesDisponibles = [0,0];
    let pieces = window.localStorage.getItem("pieces");
    pieces = JSON.parse(pieces);

    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;

    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(p => p.id === avis[i].pieceId);

        if (piece) {
            if (piece.disponibilite) {
                nbCommentairesDispo++;
            } else {
                nbCommentairesNonDispo++;
            }
        }
    }

    const labelsDispo = ["Disponibles", "Non disponibles"];
    const dataDispo = {
        labels: labelsDispo,
        datasets: [{
            label: "Quantité d'avis sur chaque type de pièce",
            data: [nbCommentairesDispo, nbCommentairesNonDispo],
            backgroundColor: "rgba(0, 230, 255, 1)",
        }],
    }

    const configDispo = {
        type: "bar",
        data: dataDispo,
    }

    new Chart(
        document.querySelector("#graphique-avis-disponibilite"),
        configDispo,
    );
}