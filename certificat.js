// Style pour forcer la taille de police des champs date à 11px
const style = document.createElement('style');
style.textContent = `
    input[type="date"] {
        font-size: 11px !important;
    }
`;
document.head.appendChild(style);

// Fonction personnalisée pour conserver les retours à la ligne
function trimPreserveNewlines(text) {
    return text.replace(/^\s+|\s+$/g, '');
}

// Fonction pour sauvegarder les modifications des champs
function sauvegarderModifications() {
    const textInputs = document.querySelectorAll('.full-width-input');
    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.setAttribute('value', input.value);
        });
    });
}

// Fonction pour charger les données
function loadData() {
    const polyclinique = localStorage.getItem('polyclinique') || '';
    const polycliniqueAr = localStorage.getItem('polyclinique-ar') || '';
    const docteur = localStorage.getItem('docteur') || '';
    
    // Charger les données du patient
    const patientNomPrenom = localStorage.getItem('patientNomPrenom') || '';
    const patientAge = localStorage.getItem('patientAge') || '';
    const patientDateNaissance = localStorage.getItem('patientDateNaissance') || '';
    const dateCertificat = localStorage.getItem('dateCertificat') || '';
    
    document.getElementById('polyclinique').value = polyclinique;
    document.getElementById('polyclinique-ar').value = polycliniqueAr;
    document.getElementById('docteur').value = docteur;
    
    // Remplir les champs du patient
    document.getElementById('patientNomPrenom').value = patientNomPrenom;
    document.getElementById('patientAge').value = patientAge;
    document.getElementById('patientDateNaissance').value = patientDateNaissance;
    document.getElementById('dateCertificat').value = dateCertificat;
    
    // Si aucune date n'est définie, utiliser la date du jour
    if (!dateCertificat) {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateCertificat').value = today;
    }
}

// Fonction pour calculer l'âge à partir de la date de naissance
function calculerAge(dateNaissance) {
    if (!dateNaissance) return '';
    
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    
    // Calculer la différence en millisecondes
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Si moins de 30 jours, afficher en jours
    if (diffDays < 30) {
        return diffDays + ' jours';
    }
    
    // Si moins de 2 ans, afficher en mois
    if (diffDays < 730) { // ~2 ans
        const diffMonths = Math.floor(diffDays / 30.44);
        return diffMonths + ' mois';
    }
    
    // Sinon, afficher en années
    const diffYears = Math.floor(diffDays / 365.25);
    return diffYears + ' ans';
}

// Fonction pour sauvegarder les données
function saveData() {
    const polyclinique = document.getElementById('polyclinique').value;
    const polycliniqueAr = document.getElementById('polyclinique-ar').value;
    const docteur = document.getElementById('docteur').value;
    
    // Sauvegarder les données du patient
    const patientNomPrenom = document.getElementById('patientNomPrenom').value;
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value;
    
    localStorage.setItem('polyclinique', polyclinique);
    localStorage.setItem('polyclinique-ar', polycliniqueAr);
    localStorage.setItem('docteur', docteur);
    
    // Sauvegarder les données du patient
    localStorage.setItem('patientNomPrenom', patientNomPrenom);
    localStorage.setItem('patientAge', patientAge);
    localStorage.setItem('patientDateNaissance', patientDateNaissance);
    localStorage.setItem('dateCertificat', dateCertificat);
    
    alert('Informations sauvegardées avec succès!');
}

// Fonction pour générer l'en-tête
function generateHeader() {
    const polyclinique = localStorage.getItem('polyclinique') || '';
    const polycliniqueAr = localStorage.getItem('polyclinique-ar') || '';

    return `
    <div id="head" style="border: 1px solid #000; padding: 10px; margin-bottom: 20px;">
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td colspan="4">
                        <div style="text-align: center; width: 100%; font-size: 12px;">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <div style="text-align: center; width: 100%; font-size: 12px;">MINISTERE DE LA SANTE</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div style="width: 100%; font-size: 12px; white-space: pre-wrap;">${polyclinique}</div>
                    </td>
                    <td colspan="2" style="text-align: right;">
                        <div style="text-align: right; width: 100%; font-size: 12px; white-space: pre-wrap;" class="arabic-text">${polycliniqueAr}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
}

// Fonction pour générer un certificat d'éviction scolaire
function genererCertificat() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';
    
    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }
    
    const certificatHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificat d'Éviction Scolaire</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .certificat {
            background-color: white;
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            margin-top: 60px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            text-decoration: underline;
            font-size: 20px;
        }
        p {
            line-height: 1.5;
            color: #555;
        }
        .signature {
            text-align: right;
            margin-top: 50px;
        }
        @media print {
            body {
                background-color: white;
            }
            .certificat {
                border: none;
                box-shadow: none;
                margin-top: 0;
            }
            .print-button {
                display: none;
            }
        }
        .print-button {
            text-align: center;
            margin-top: 20px;
        }
        .print-button button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .print-button button:hover {
            background-color: #0056b3;
        }
        #head {
            margin-bottom: 20px;
        }
        #head table {
            width: 100%;
            border: 0px solid #000000;
            padding: 4px;
            margin-bottom: 15px;
        }
        #head td {
            text-align: center;
        }
    </style>
</head>
<body>
    ${enteteContent}
    <div class="certificat">
        <h1>CERTIFICAT MÉDICAL D'ÉVICTION SCOLAIRE</h1>
        <p>
            Je soussigné(e), Dr ${docteur || '[Nom du docteur]'}, certifie avoir examiné 
            l'élève <strong>[Nom de l'élève]</strong>, né(e) le <strong>[Date de naissance]</strong>, 
            et étudiant(e) dans l'établissement <strong>[Nom de l'établissement]</strong>.
        </p>
        <p>
            À la suite de cet examen, je constate que l'état de santé de l'élève nécessite son 
            éloignement temporaire de l'environnement scolaire pour des raisons médicales.
        </p>
        <p>
            Cette évasion scolaire est nécessaire du <strong>[Date de début]</strong> au 
            <strong>[Date de fin]</strong> inclus.
        </p>
        <p>
            Cette décision est prise afin de permettre à l'élève de se reposer et de recevoir 
            les soins appropriés pour favoriser sa guérison complète.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>[Date]</strong><br><br><br>
            Signature et cachet<br>
            Dr ${docteur || '[Nom du docteur]'}
        </div>
    </div>
    <div class="print-button">
        <button onclick="window.print()">Imprimer le certificat</button>
    </div>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Fonction pour générer un certificat d'inaptitude sportive
function genererInaptitudeSport() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';
    
    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }
    
    const certificatHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificat d'Inaptitude Sportive</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .certificat {
            background-color: white;
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            margin-top: 60px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            text-decoration: underline;
            font-size: 20px;
        }
        p {
            line-height: 1.5;
            color: #555;
        }
        .signature {
            text-align: right;
            margin-top: 50px;
        }
        @media print {
            body {
                background-color: white;
            }
            .certificat {
                border: none;
                box-shadow: none;
                margin-top: 0;
            }
            .print-button {
                display: none;
            }
        }
        .print-button {
            text-align: center;
            margin-top: 20px;
        }
        .print-button button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .print-button button:hover {
            background-color: #0056b3;
        }
        #head {
            margin-bottom: 20px;
        }
        #head table {
            width: 100%;
            border: 0px solid #000000;
            padding: 4px;
            margin-bottom: 15px;
        }
        #head td {
            text-align: center;
        }
    </style>
</head>
<body>
    ${enteteContent}
    <div class="certificat">
        <h1>CERTIFICAT MÉDICAL D'INAPTITUDE SPORTIVE</h1>
        <p>
            Je soussigné(e), Dr ${docteur || '[Nom du docteur]'}, certifie avoir examiné 
            le patient <strong>[Nom du patient]</strong>, né(e) le <strong>[Date de naissance]</strong>.
        </p>
        <p>
            À la suite de cet examen, je constate que l'état de santé du patient ne lui permet 
            pas de pratiquer des activités sportives collectives ou individuelles.
        </p>
        <p>
            Cette inaptitude est valable du <strong>[Date de début]</strong> au 
            <strong>[Date de fin]</strong> inclus.
        </p>
        <p>
            Il est recommandé au patient de suivre un repos relatif et de ne pas participer 
            à des compétitions ou entraînements sportifs durant cette période.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>[Date]</strong><br><br><br>
            Signature et cachet<br>
            Dr ${docteur || '[Nom du docteur]'}
        </div>
    </div>
    <div class="print-button">
        <button onclick="window.print()">Imprimer le certificat</button>
    </div>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Fonction pour générer un certificat d'arrêt de travail
function genererArretTravail() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';
    
    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }
    
    const certificatHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificat d'Arrêt de Travail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .certificat {
            background-color: white;
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            margin-top: 60px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            text-decoration: underline;
            font-size: 20px;
        }
        p {
            line-height: 1.5;
            color: #555;
        }
        .signature {
            text-align: right;
            margin-top: 50px;
        }
        @media print {
            body {
                background-color: white;
            }
            .certificat {
                border: none;
                box-shadow: none;
                margin-top: 0;
            }
            .print-button {
                display: none;
            }
        }
        .print-button {
            text-align: center;
            margin-top: 20px;
        }
        .print-button button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .print-button button:hover {
            background-color: #0056b3;
        }
        #head {
            margin-bottom: 20px;
        }
        #head table {
            width: 100%;
            border: 0px solid #000000;
            padding: 4px;
            margin-bottom: 15px;
        }
        #head td {
            text-align: center;
        }
    </style>
</head>
<body>
    ${enteteContent}
    <div class="certificat">
        <h1>CERTIFICAT MÉDICAL D'ARRÊT DE TRAVAIL</h1>
        <p>
            Je soussigné(e), Dr ${docteur || '[Nom du docteur]'}, certifie avoir examiné 
            le patient <strong>[Nom du patient]</strong>, né(e) le <strong>[Date de naissance]</strong>, 
            employé(e) chez <strong>[Nom de l'employeur]</strong>.
        </p>
        <p>
            À la suite de cet examen, je constate que l'état de santé du patient nécessite un 
            arrêt de travail pour des raisons médicales.
        </p>
        <p>
            Cet arrêt de travail est valable du <strong>[Date de début]</strong> au 
            <strong>[Date de fin]</strong> inclus.
        </p>
        <p>
            Le patient est apte à reprendre ses activités professionnelles à compter du 
            <strong>[Date de reprise]</strong>.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>[Date]</strong><br><br><br>
            Signature et cachet<br>
            Dr ${docteur || '[Nom du docteur]'}
        </div>
    </div>
    <div class="print-button">
        <button onclick="window.print()">Imprimer le certificat</button>
    </div>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Fonction pour générer un certificat de radiox
function genererRadiox() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';
    
    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }
    
    const certificatHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Radiox</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .certificat {
            background-color: white;
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            margin-top: 60px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            text-decoration: underline;
            font-size: 20px;
        }
        p {
            line-height: 1.5;
            color: #555;
        }
        .signature {
            text-align: right;
            margin-top: 50px;
        }
        @media print {
            body {
                background-color: white;
            }
            .certificat {
                border: none;
                box-shadow: none;
                margin-top: 0;
            }
            .print-button {
                display: none;
            }
        }
        .print-button {
            text-align: center;
            margin-top: 20px;
        }
        .print-button button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .print-button button:hover {
            background-color: #0056b3;
        }
        #head {
            margin-bottom: 20px;
        }
        #head table {
            width: 100%;
            border: 0px solid #000000;
            padding: 4px;
            margin-bottom: 15px;
        }
        #head td {
            text-align: center;
        }
    </style>
</head>
<body>
    ${enteteContent}
    <div class="certificat">
        <h1>Cher confrère</h1>
        <p>
            Permettez-moi de vous adresser le(la) nommé(e) <strong>[Nom du patient]</strong>,
            né(e) le <strong>[Date de naissance]</strong>, qui consulte chez nous pour :<br>
            <textarea style="width: 100%; height: 80px; margin: 10px 0; padding: 8px;">[Raison de la consultation]</textarea>
            <br>
            Pour faire un :<br>
            <textarea style="width: 100%; height: 80px; margin: 10px 0; padding: 8px;">[Type d'exploration]</textarea>
        </p>
        <p style="text-align: right; margin-right: 50px;">
            Confraternellement,<br><br><br>
            <span>${docteur || '[Nom du docteur]'}</span>
        </p>
    </div>
    <div class="print-button">
        <button onclick="window.print()">Imprimer la lettre</button>
    </div>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Configuration des écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    loadData(); // Chargement des données de la polyclinique et du docteur
    
    // Initialiser le format au chargement
    const format = localStorage.getItem('certificatFormat');
    if (format === 'sansEntete') {
        document.getElementById('formatSansEntete').classList.add('selected-format');
    } else {
        // Par défaut, on utilise avec en-tete
        document.getElementById('formatAvecEntete').classList.add('selected-format');
    }
    
    // Écouteurs pour les boutons
    document.getElementById("SavePolycliniqueDocteur").addEventListener("click", saveData);
    document.getElementById("genererCertificat").addEventListener("click", genererCertificat);
    document.getElementById("inaptSport").addEventListener("click", genererInaptitudeSport);
    document.getElementById("genererArret").addEventListener("click", genererArretTravail);
    document.getElementById("genererRadiox").addEventListener("click", genererRadiox);
    
    // Écouteurs pour les formats
    document.getElementById("formatAvecEntete").addEventListener("click", function() {
        localStorage.setItem('certificatFormat', 'avecEntete');
        this.classList.add('selected-format');
        document.getElementById('formatSansEntete').classList.remove('selected-format');
    });
    
    document.getElementById("formatSansEntete").addEventListener("click", function() {
        localStorage.setItem('certificatFormat', 'sansEntete');
        this.classList.add('selected-format');
        document.getElementById('formatAvecEntete').classList.remove('selected-format');
    });
    
    // Écouteur pour le champ date de naissance - calcul automatique de l'âge
    document.getElementById('patientDateNaissance').addEventListener('change', function() {
        const dateNaissance = this.value;
        if (dateNaissance) {
            const ageCalcule = calculerAge(dateNaissance);
            document.getElementById('patientAge').value = ageCalcule;
        }
    });
    
    // Écouteur pour le champ âge - effacer la date de naissance si l'âge est modifié manuellement
    document.getElementById('patientAge').addEventListener('input', function() {
        // Si l'utilisateur commence à taper dans le champ âge, on ne force plus le calcul automatique
        // Mais on ne vide la date de naissance que si l'âge est significativement différent
        // Pour permettre les deux modes de saisie
    });
});
