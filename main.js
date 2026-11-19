
function accueil() {
    document.getElementById("accueil").innerHTML =
        "<h2>Bienvenue sur Cap Bon Explorer</h2>" +
        "<p>Decouvrez les activites du Cap Bon.</p>";
}

var activites = [
    { nom: "Decouverte de la medina", lieu: "Nabeul", categorie: "Culture", prix: 20 },
    { nom: "Atelier de poterie", lieu: "Nabeul", categorie: "Artisanat", prix: 35 },
    { nom: "Decouverte de Kerkouane", lieu: "Kerkouane", categorie: "Culture", prix: 30 },
    { nom: "Randonnee decouverte", lieu: "Korbous", categorie: "Nature", prix: 25 },
    { nom: "Circuit du littoral", lieu: "Kelibia", categorie: "Nature", prix: 40 },
    { nom: "Peinture sur ceramique", lieu: "Nabeul", categorie: "Artisanat", prix: 25 },
    { nom: "Decouverte d'un marche local", lieu: "Nabeul", categorie: "Decouverte", prix: 15 },
    { nom: "Promenade photographique", lieu: "Hammamet", categorie: "Decouverte", prix: 30 }
];

function afficherActivites(liste) {
    var contenu = document.getElementById("listeActivites");
    var compteur = document.getElementById("compteur");
    var message = document.getElementById("message");
    var i;

    contenu.innerHTML = "";
    compteur.innerHTML = "Nombre de resultats : " + liste.length;
    message.innerHTML = "";

    if (liste.length == 0) {
        message.innerHTML = "Aucune activite trouvee";
    } else {
        for (i = 0; i < liste.length; i++) {
            contenu.innerHTML +=
                "<div class='card p-3 m-2'>" +
                "<h3>" + liste[i].nom + "</h3>" +
                "<p>Lieu : " + liste[i].lieu + "</p>" +
                "<p>Categorie : " + liste[i].categorie + "</p>" +
                "<p>Prix : " + liste[i].prix + " TND</p>" +
                "<button class='btn btn-primary' onclick='details(" + activites.indexOf(liste[i]) + ")'>Details</button>" +
                "</div>";
        }
    }
}

function rechercher() {
    var mot = document.getElementById("recherche").value.toLowerCase();
    var categorie = document.getElementById("filtre").value;
    var resultat = [];
    var i;

    for (i = 0; i < activites.length; i++) {
        if (
            (activites[i].nom.toLowerCase().includes(mot) ||
             activites[i].lieu.toLowerCase().includes(mot))
            &&
            (categorie == "Toutes" || activites[i].categorie == categorie)
        ) {
            resultat[resultat.length] = activites[i];
        }
    }

    afficherActivites(resultat);
}

function details(i) {
    document.getElementById("details").innerHTML =
        "<h3>" + activites[i].nom + "</h3>" +
        "<p>Lieu : " + activites[i].lieu + "</p>" +
        "<p>Categorie : " + activites[i].categorie + "</p>" +
        "<p>Prix : " + activites[i].prix + " TND</p>";
}

function calculer() {
    var prix = Number(document.getElementById("type").value);
    var nombre = Number(document.getElementById("nombre").value);
    var total;
    var reduction = 0;

    if (nombre >= 1 && Number.isInteger(nombre)) {
        total = prix * nombre;

        if (nombre >= 4) {
            reduction = total * 0.10;
        }

        total = total - reduction;

        document.getElementById("montant").innerHTML =
            "Prix total : " + (prix * nombre) + " TND<br>" +
            "Reduction : " + reduction + " TND<br>" +
            "Montant a payer : " + total + " TND";
    } else {
        document.getElementById("montant").innerHTML =
            "Nombre de participants invalide";
    }
}

function reserver() {
    var nom = document.getElementById("nom").value.trim();
    var email = document.getElementById("email").value.trim();
    var date = document.getElementById("date").value;
    var nombre = Number(document.getElementById("nombre").value);
    var message = document.getElementById("messageReservation");

    if (nom == "" || email == "" || date == "" ||
        nombre < 1 || !Number.isInteger(nombre)) {
        message.innerHTML = "Veuillez remplir tous les champs correctement.";
        message.className = "text-danger";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        message.innerHTML = "Adresse email invalide.";
        message.className = "text-danger";
        return;
    }

    var dateChoisie = new Date(date + "T00:00:00");
    var aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    if (dateChoisie < aujourdHui) {
        message.innerHTML = "Veuillez choisir une date future.";
        message.className = "text-danger";
        return;
    }

    calculer();

    message.innerHTML = "Reservation validee !";
    message.className = "text-success";
}

function reinitialiser() {
    document.getElementById("formReservation").reset();
    document.getElementById("messageReservation").innerHTML = "";
    document.getElementById("montant").innerHTML = "";
}

accueil();
afficherActivites(activites);
