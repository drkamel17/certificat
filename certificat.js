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
    
    // Initialiser l'état des boutons de format
    const format = localStorage.getItem('certificatFormat');
    if (format === 'sansEntete') {
        document.getElementById('formatSansEntete').classList.add('selected-format');
    } else {
        // Par défaut, on utilise avec en-tête
        document.getElementById('formatAvecEntete').classList.add('selected-format');
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
                        <div style="text-align: left; width: 100%; font-size: 12px; white-space: pre-wrap;">${polyclinique}</div>
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

// Fonction pour configurer les gestionnaires d'événements des boutons de format
function setupFormatButtons() {
    const formatAvecEnteteBtn = document.getElementById('formatAvecEntete');
    const formatSansEnteteBtn = document.getElementById('formatSansEntete');
    
    if (formatAvecEnteteBtn) {
        formatAvecEnteteBtn.addEventListener('click', function() {
            // Mettre à jour le localStorage
            localStorage.setItem('certificatFormat', 'avecEntete');
            
            // Mettre à jour l'interface utilisateur
            formatAvecEnteteBtn.classList.add('selected-format');
            formatSansEnteteBtn.classList.remove('selected-format');
        });
    }
    
    if (formatSansEnteteBtn) {
        formatSansEnteteBtn.addEventListener('click', function() {
            // Mettre à jour le localStorage
            localStorage.setItem('certificatFormat', 'sansEntete');
            
            // Mettre à jour l'interface utilisateur
            formatSansEnteteBtn.classList.add('selected-format');
            formatAvecEnteteBtn.classList.remove('selected-format');
        });
    }
}

// Configurer les gestionnaires d'événements lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupFormatButtons();
});

// Fonction pour générer un certificat d'éviction scolaire
function genererCertificat() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom de l\'élève]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'né(e) le ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
<title>Certificat médical d'éviction scolaire</title>
<style>
body {
font-family: Arial, sans-serif;
padding: 20px;
background-color: #f9f9f9;
}
.certificat {
background-color: white;
border: 1px solid #ddd;
padding: 20px 40px;
max-width: 600px;
margin: 0 auto;
margin-top: 60px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
padding-top: 30px;
}
h1 {
text-align: center;
color: #333;
text-decoration: underline;
font-size: 20px;
margin-top: 15px;
margin-bottom: 25px;
}
p {
line-height: 1.5;
color: #555;
}
.editable-field {
border-bottom: 1px dashed #666;
display: inline-block;
min-width: 50px;
min-height: 20px;
padding: 2px 4px;
margin: 0 3px;
}
.editable-area {
border: 1px solid #ddd;
border-radius: 4px;
padding: 8px;
margin: 5px 0;
width: 100%;
min-height: 20px;
resize: vertical;
overflow: hidden;
font-family: inherit;
font-size: inherit;
line-height: inherit;
}
.editable-area:focus {
outline: none;
border-color: #007bff;
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
@media print {
@page {
    size: A5;
    margin: 0.2cm 0.2cm 0.2cm 0.2cm;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10pt !important;
    line-height: 1.2 !important;
    background-color: white;
}

.certificat {
    border: none;
    box-shadow: none;
    margin: 0 !important;
    padding: 2px 8px !important;
    max-width: 100% !important;
}

h1 {
    font-size: 14pt !important;
    margin: 5px 0 !important;
    margin-top: 2cm !important;
}

input[type="text"],
input[type="date"],
textarea {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 9pt !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border: none !important;
    outline: none !important;

}

.print-button {
    display: none;
}

.editable-field, .editable-area {
    border: none !important;
}

/* Additional space optimization */
* {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
}

p {
    margin: 2px 0 !important;
    font-size: 9pt !important;
}
}
</style>
</head>
<body>
${enteteContent}
<div class="certificat">
<h1>Certificat médical d'éviction scolaire</h1>
<br><br><br>
<p>
Je soussigné, Dr <input type="text" id="docteur" value="${docteur}" placeholder="">, certifie avoir examiné ce jour
<strong><input type="text" value="${patientNomPrenom}" style="width: 150px;"></strong>,
<span class="editable-field" contenteditable="true" style="min-width: 100px; display: inline-block;">${ageInfo}</span>.
</p>
<p>
déclare que son état de santé nécessite une éviction scolaire de
<input type="text" placeholder="1 (un)" style="width: 80px;"> Jour(s)
à daté du <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block;">${formattedDate}</span> <br>
sauf complication.
</p>
<p>
<textarea placeholder=" " style="width: 450px;"></textarea>
</p>
<p style="text-align: right; margin-top: 30px;">
Dont certificat&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>
<span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;
</p>
</div>
<div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
    <div style="display: flex; align-items: center; gap: 8px;">
        <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
        <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
    </div>
    <button id="printButton">Imprimer le Certificat</button>
</div>
<script>
    // Appliquer la taille de police sauvegardée et masquer les éléments non désirés à l'impression
    document.addEventListener('DOMContentLoaded', () => {
        const savedFontSize = localStorage.getItem('certificatFontSize') || '14';
        const styleElement = document.createElement('style');
        styleElement.textContent = "@media print { .print-button { display: none !important; } }";
        styleElement.id = 'certificatFontSizeStyle';
        document.head.appendChild(styleElement);
        
        // Add print functionality
        document.getElementById('printButton').addEventListener('click', function() {
            window.print();
        });
    });
</script>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Fonction pour générer un certificat d'inaptitude sportive
function inaptitudeSport() {
    // Ajouter le style pour déplacer le titre lors de l'impression
    const style = document.createElement('style');
    style.textContent = `
    @media print {
      .certificat h1 {
        margin-top: 2cm !important;
      }
    }
  `;
    document.head.appendChild(style);

    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    const polyclinique = localStorage.getItem('polyclinique') || "";
    const docteur = document.getElementById('docteur').value || localStorage.getItem('docteur') || "";

    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = patientAge;
    } else if (patientDateNaissance) {
        ageInfo = patientDateNaissance;
    } else {
        ageInfo = '[Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');

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
    <title>CERTIFICAT MEDICAL D'INAPTITUDE AU SPORT</title>
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
        font-size: 14pt !important;
        margin: 5px 0 !important;
    }
    h2 {
        text-align: center;
        color: #555;
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 15px;
    }
    p {
        line-height: 1.5;
        color: #555;
    }
	
    .editable-field {
        border-bottom: 1px dashed #666;
        display: inline-block;
        min-width: 50px;
        min-height: 20px;
        padding: 2px 4px;
        margin: 0 3px;
    }
    .editable-area {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px;
        margin: 5px 0;
        width: 100%;
        min-height: 20px;
        resize: vertical;
        overflow: hidden;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    .editable-area:focus {
        outline: none;
        border-color: #007bff;
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
    @media print {
        @page {
            size: A5;
            margin: 0.2cm 0.2cm 0.2cm 0.2cm;
        }

        body {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 10pt !important;
            line-height: 1.2 !important;
            background-color: white;
        }

        .certificat {
            border: none;
            box-shadow: none;
            margin: 0 !important;
            padding: 2px 8px !important;
            max-width: 100% !important;
        }

        h1 {
            font-size: 14pt !important;
            margin: 5px 0 !important;
            margin-top: 2cm !important;
        }

        input[type="text"],
        input[type="date"],
        textarea {
            border: none !important;
            background: none !important;
            box-shadow: none !important;
            outline: none !important;
            font-size: 9pt !important;
        }

        input[type="text"]:focus,
        input[type="date"]:focus,
        textarea:focus {
            border: none !important;
            outline: none !important;
        }

        /* Rendre le placeholder transparent lors de l'impression */
        input::placeholder,
        textarea::placeholder {
            color: transparent; /* Masquer le placeholder */
        }

        /* Styles existants */
        .print-button {
            display: none;
        }
        .editable-field, .editable-area {
            border: none !important;
        }

        /* Additional space optimization */
        * {
            margin-top: 0 !important;
            margin-bottom: 2px !important;
        }

        p {
            margin: 2px 0 !important;
            font-size: 9pt !important;
        }
        
        .contenu-certificat {
            margin-top: 1.5cm !important;
        }
        
    }
    </style>
    </head>
    <body>
    ${enteteContent}
  <div class="certificat">
    <h1>CERTIFICAT MEDICAL D'INAPTITUDE AU SPORT</h1>
    <div class="contenu-certificat" style="margin-top: 1.5cm !important;">
      <p>
        Je soussigné(e), Dr <input type="text" id="docteur" value="${docteur}" placeholder="Medecin">, certifie avoir examiné ce jour :<br>
    <strong><input type="text" value="${patientNomPrenom}" style="width: 180px;"></strong>
    <br>
    née le : <strong><input type="text" value="${ageInfo}" style="width: 120px;"></strong>
    <br> met en évidence des contre-indications à  la pratique de sports<br>
        <textarea class="editable-area" style="width: 90%;" placeholder=" "></textarea>
      </p>
      <p style="text-align: right;">
        Signature :<br>
        <span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </p>
    </div>
    <div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 8px;">
            <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
            <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
        </div>
        <button id="printButton">Imprimer le Certificat</button>
    </div>
    <script>
    // Sauvegarder les modifications dans le localStorage
    function sauvegarderModifications() {
        const polycliniqueInput = document.getElementById('polyclinique');
        const polycliniqueArInput = document.getElementById('polyclinique-ar');
        const docteurInput = document.getElementById('docteur');
        
        if (polycliniqueInput && polycliniqueInput.value) {
            localStorage.setItem('polyclinique', polycliniqueInput.value);
        }
        
        if (polycliniqueArInput && polycliniqueArInput.value) {
            localStorage.setItem('polyclinique-ar', polycliniqueArInput.value);
        }
        
        if (docteurInput && docteurInput.value) {
            localStorage.setItem('docteur', docteurInput.value);
        }
    }

    // Ecouteur pour le bouton d'impression
    document.getElementById('printButton').addEventListener('click', function() {
        sauvegarderModifications();
        window.print();
    });
    </script>
    </body>
    </html>
    `;

    // Ouvrir le certificat dans un nouvel onglet
    const newTab = window.open('', '_blank');
    newTab.document.write(certificatHtml);
    newTab.document.close();
}

// Fonction pour générer une justification de présence
function justification() {
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    const polyclinique = localStorage.getItem('polyclinique') || "";
    const docteur = document.getElementById('docteur').value || localStorage.getItem('docteur') || "";
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'né(e) le ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Justification</title>
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
.editable-field {
border-bottom: 1px dashed #666;
display: inline-block;
min-width: 50px;
min-height: 20px;
padding: 2px 4px;
margin: 0 3px;
}
.editable-area {
border: 1px solid #ddd;
border-radius: 4px;
padding: 8px;
margin: 5px 0;
width: 100%;
min-height: 20px;
resize: vertical;
overflow: hidden;
font-family: inherit;
font-size: inherit;
line-height: inherit;
}
.editable-area:focus {
outline: none;
border-color: #007bff;
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
#head .arabic-text {
font-size: 12px;
text-align: right;
}
#head div {
font-size: 12px;
white-space: pre-wrap;
text-align: left;
}
#head td:first-child {
text-align: left !important;
padding-left: 0 !important;
margin-left: 0 !important;
}
@media print {
@page {
    size: A5;
    margin: 0.2cm 0.2cm 0.2cm 0.2cm;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10pt !important;
    line-height: 1.2 !important;
    background-color: white;
}

.certificat {
    border: none;
    box-shadow: none;
    margin: 0 !important;
    padding: 2px 8px !important;
    max-width: 100% !important;
}

h1 {
    font-size: 14pt !important;
    margin: 5px 0 !important;
    margin-top: 2cm !important;
}

input[type="text"],
input[type="date"],
textarea {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 9pt !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border: none !important;
    outline: none !important;
}

/* Styles existants */
.print-button {
    display: none;
}
.editable-field, .editable-area {
    border: none !important;
}

/* Additional space optimization */
* {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
}

p {
    margin: 2px 0 !important;
    font-size: 9pt !important;
}
}
</style>
</head>
<body>
${enteteContent}
    <div class="certificat">
        <h1>Justification de présence</h1>
        <div class="contenu-certificat" style="margin-top: 1.5cm !important;">
        <p>
            Je soussigné, Dr <input type="text" id="docteur" value="${docteur}" placeholder="" style="width: 120px;">, 
            certifie avoir examiné ce jour le(la) susnommé(e) 
            <strong><input type="text" value="${patientNomPrenom}" style="width: 180px;"></strong>,
            <span class="editable-field" contenteditable="true" style="min-width: 100px; display: inline-block;">${ageInfo}</span>.
        </p>
        <p>
            est présenter pour la consultation ce jour le 
             <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block;">${formattedDate}</span> à  l'heure:<input type="time" style="font-size: 11px !important;"> <br> 
            <div style="direction: rtl; text-align: right;">
                 تم فحص المعني يوم :   <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block; margin-left: 10px;">${formattedDate}</span>   <br>
                على الساعة : <input type="time" > 
            </div>
        </p>
        <p style="text-align: right; margin-top: 30px;">
            Dont certificat<br>
            <span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>
        </p>
    </div>
    <div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 8px;">
            <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
            <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
        </div>
        <button id="printButton">Imprimer le Certificat</button>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const printButton = document.getElementById('printButton');
            if (printButton) {
                printButton.addEventListener('click', function () {
                    window.print();
                });
            }
        });
    </script>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

// Fonction pour générer un certificat de non-grossesse
function genererNonGrossesse() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Certificat de Non-Grossesse</title>
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
        <h1>CERTIFICAT MEDICAL DE NON-GROSSESSE</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné ce jour :
            <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            Je n'ai constaté aucun signe clinique évocateur d'une grossesse en cours à la date du présent certificat.
        </p>
        <p>
            Ce certificat est délivré à la demande de l'intéressée et remis en main propre pour servir et valoir ce que de droit.
        </p>
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

// Fonction pour générer un certificat de maladie chronique
function genererChronique() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Certificat de Maladie Chronique</title>
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
        <h1>CERTIFICAT DE MALADIE CHRONIQUE</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné 
            le patient <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            À la suite de cet examen, je constate que le patient souffre d'une maladie chronique nécessitant 
            un suivi médical régulier et des soins continus.
        </p>
        <p>
            Cette affection chronique nécessite des consultations périodiques et un traitement adapté.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
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

// Fonction pour générer un certificat de prolongation d'arrêt de travail
function genererProlongation() {
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Split patient name into first and last name
    let nom = '';
    let prenom = '';
    if (patientNomPrenom) {
        const parts = patientNomPrenom.split(' ');
        nom = parts[0] || '';
        prenom = parts.slice(1).join(' ') || '';
    }
    
    // Use date of birth if available
    const dob = patientDateNaissance || '[Date de naissance]';
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${year}-${month}-${day}`;

    const polyclinique = localStorage.getItem('polyclinique') || "";
    const polycliniqueAr = localStorage.getItem('polyclinique-ar') || "";
    const docteur = localStorage.getItem('docteur') || "";

    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';

    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }

    const certificatContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';">
    <title>Certificat de prolongation d'arret de Travail</title>
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
.editable-field {
border-bottom: 1px dashed #666;
display: inline-block;
min-width: 50px;
min-height: 20px;
padding: 2px 4px;
margin: 0 3px;
}
.editable-area {
border: 1px solid #ddd;
border-radius: 4px;
padding: 8px;
margin: 5px 0;
width: 100%;
min-height: 20px;
resize: vertical;
overflow: hidden;
font-family: inherit;
font-size: inherit;
line-height: inherit;
}
.editable-area:focus {
outline: none;
border-color: #007bff;
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
@media print {
@page {
    size: A5;
    margin: 0.2cm 0.2cm 0.2cm 0.2cm;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10pt !important;
    line-height: 1.2 !important;
    background-color: white;
}

.certificat {
    border: none;
    box-shadow: none;
    margin: 0 !important;
    padding: 2px 8px !important;
    max-width: 100% !important;
}

h1 {
    font-size: 14pt !important;
    margin: 5px 0 !important;
    margin-top: 2cm !important;
}

input[type="text"],
input[type="date"],
textarea {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 9pt !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border: none !important;
    outline: none !important;
}

/* Styles existants */
.print-button {
    display: none;
}
.editable-field, .editable-area {
    border: none !important;
}

/* Additional space optimization */
* {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
}

p {
    margin: 2px 0 !important;
    font-size: 9pt !important;
}
}
</style>
</head>
<body>
${enteteContent}
    <div class="certificat">
        <h1>certificat de prolongation d'arret de travail</h1>
        <div class="contenu-certificat" style="margin-top: 1.5cm !important;">
        <p>
            Je soussigné, Dr <input type="text" id="docteur" value="${docteur}" placeholder="" style="width: 120px;">, 
            certifie avoir examiné ce jour le(la) susnommé(e) 
            <strong><input type="text" value="${nom} ${prenom}" style="width: 180px;"></strong>,
            <span class="editable-field" contenteditable="true" style="min-width: 100px; display: inline-block;">né(e) le ${dob}</span>.
        </p>
        <p>
            déclare que son état de santé nécessite une prolongation d'arret de travail de 
            <input type="text" placeholder="1 (un)" style="width: 70px;"> Jour(s)
            à  dater du <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block;">${todayFormatted}</span> sauf complication.
        </p>
        <p style="text-align: right; margin-top: 30px;">
            Dont certificat<br>
            <span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>
        </p>
    </div>
    <div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 8px;">
            <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
            <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
        </div>
        <button id="printButton">Imprimer le Certificat</button>
    </div>
    <script>
    // Fonction pour imprimer le certificat
    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });
    
    // Fonction pour ajuster la taille du texte
    document.getElementById('fontSize').addEventListener('change', function() {
        const fontSize = this.value;
        const style = document.createElement('style');
        style.textContent = \`
            @media print {
                body {
                    font-size: \${fontSize}pt !important;
                }
            }
        \`;
        document.head.appendChild(style);
    });
    </script>
</body>
</html>
`;

    var newWindow = window.open("", "_blank");
    if (newWindow) {
        newWindow.document.write(certificatContent);
        newWindow.document.close();
    } else {
        console.log("Popup bloquée par le navigateur.");
    }
}

// Fonction pour générer une lettre médicale
function genererLettre() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Lettre Médicale</title>
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
        <h1>LETTRE MEDICALE</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné ce jour :
            <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            Je constate que l'état de santé de ce patient nécessite des soins médicaux réguliers.
        </p>
        <p>
            Ce certificat est délivré à la demande de l'intéressée et remis en main propre pour servir et valoir ce que de droit.
        </p>
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

// Fonction pour générer une attestation de décès
function genererDeces() {
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const patientDateDeces = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    const polyclinique = localStorage.getItem('polyclinique') || "";
    const docteur = localStorage.getItem('docteur') || "";

    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(patientDateDeces).toLocaleDateString('fr-FR');
    
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
    <title>Attestation de Décès</title>
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
        <h1>ATTESTATION DE DÉCÈS</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné ce jour :
            <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            Je certifie que le décès de ce patient s'est produit le <strong>${formattedDate}</strong>.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
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

// Fonction pour générer un certificat de reprise de travail
function genererReprise() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Certificat de Reprise de Travail</title>
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
        <h1>CERTIFICAT DE REPRISE DE TRAVAIL</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné 
            le patient <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            À la suite de cet examen, je constate que le patient est apte à reprendre ses activités professionnelles 
            à compter du <strong>[Date de reprise]</strong>.
        </p>
        <p>
            Cette reprise est sans restrictions ni limitations particulières.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
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

// Fonction pour générer un certificat de maladie chronique
function genererChronique() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Certificat de Maladie Chronique</title>
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
        <h1>CERTIFICAT DE MALADIE CHRONIQUE</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné 
            le patient <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            À la suite de cet examen, je constate que le patient souffre d'une maladie chronique nécessitant 
            un suivi médical régulier et des soins continus.
        </p>
        <p>
            Cette affection chronique nécessite des consultations périodiques et un traitement adapté.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
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

// Fonction pour générer un certificat de prolongation d'arrêt de travail
function genererProlongation() {
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Split patient name into first and last name
    let nom = '';
    let prenom = '';
    if (patientNomPrenom) {
        const parts = patientNomPrenom.split(' ');
        nom = parts[0] || '';
        prenom = parts.slice(1).join(' ') || '';
    }
    
    // Use date of birth if available
    const dob = patientDateNaissance || '[Date de naissance]';
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${year}-${month}-${day}`;

    const polyclinique = localStorage.getItem('polyclinique') || "";
    const polycliniqueAr = localStorage.getItem('polyclinique-ar') || "";
    const docteur = localStorage.getItem('docteur') || "";

    // Vérifier le format choisi
    const avecEntete = localStorage.getItem('certificatFormat') === 'avecEntete';

    let enteteContent = '';
    if (avecEntete) {
        enteteContent = generateHeader();
    } else {
        // Espace vide pour garder la meme mise en page
        enteteContent = '<div style="height: 155px;"></div>';
    }

    const certificatContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';">
    <title>Certificat de prolongation d'arret de Travail</title>
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
.editable-field {
border-bottom: 1px dashed #666;
display: inline-block;
min-width: 50px;
min-height: 20px;
padding: 2px 4px;
margin: 0 3px;
}
.editable-area {
border: 1px solid #ddd;
border-radius: 4px;
padding: 8px;
margin: 5px 0;
width: 100%;
min-height: 20px;
resize: vertical;
overflow: hidden;
font-family: inherit;
font-size: inherit;
line-height: inherit;
}
.editable-area:focus {
outline: none;
border-color: #007bff;
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
@media print {
@page {
    size: A5;
    margin: 0.2cm 0.2cm 0.2cm 0.2cm;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10pt !important;
    line-height: 1.2 !important;
    background-color: white;
}

.certificat {
    border: none;
    box-shadow: none;
    margin: 0 !important;
    padding: 2px 8px !important;
    max-width: 100% !important;
}

h1 {
    font-size: 14pt !important;
    margin: 5px 0 !important;
    margin-top: 2cm !important;
}

input[type="text"],
input[type="date"],
textarea {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 9pt !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border: none !important;
    outline: none !important;

}

/* Styles existants */
.print-button {
    display: none;
}
.editable-field, .editable-area {
    border: none !important;
}

/* Additional space optimization */
* {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
}

p {
    margin: 2px 0 !important;
    font-size: 9pt !important;
}
}
</style>
</head>
<body>
${enteteContent}
    <div class="certificat">
        <h1>certificat de prolongation d'arret de travail</h1>
        <div class="contenu-certificat" style="margin-top: 1.5cm !important;">
        <p>
            Je soussigné, Dr <input type="text" id="docteur" value="${docteur}" placeholder="" style="width: 120px;">, 
            certifie avoir examiné ce jour le(la) susnommé(e) 
            <strong><input type="text" value="${nom} ${prenom}" style="width: 180px;"></strong>,
            <span class="editable-field" contenteditable="true" style="min-width: 100px; display: inline-block;">né(e) le ${dob}</span>.
        </p>
        <p>
            déclare que son état de santé nécessite une prolongation d'arret de travail de 
            <input type="text" placeholder="1 (un)" style="width: 70px;"> Jour(s)
            à  dater du <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block;">${todayFormatted}</span> sauf complication.
        </p>
        <p style="text-align: right; margin-top: 30px;">
            Dont certificat<br>
            <span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>
        </p>
    </div>
    <div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 8px;">
            <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
            <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
        </div>
        <button id="printButton">Imprimer le Certificat</button>
    </div>
    <script>
    // Fonction pour imprimer le certificat
    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });
    
    // Fonction pour ajuster la taille du texte
    document.getElementById('fontSize').addEventListener('change', function() {
        const fontSize = this.value;
        const style = document.createElement('style');
        style.textContent = \`
            @media print {
                body {
                    font-size: \${fontSize}pt !important;
                }
            }
        \`;
        document.head.appendChild(style);
    });
    </script>
</body>
</html>
`;

    var newWindow = window.open("", "_blank");
    if (newWindow) {
        newWindow.document.write(certificatContent);
        newWindow.document.close();
    } else {
        console.log("Popup bloquée par le navigateur.");
    }
}

// Fonction pour générer une lettre médicale
function genererLettre() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Lettre Médicale</title>
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
        <h1>LETTRE MEDICALE</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné 
            le patient <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            [Contenu de la lettre médicale]
        </p>
        <p>
            Cette lettre est établie à la demande du patient pour servir et valoir ce que de droit.
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
        </div>
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

// Fonction pour générer un certificat CBV
function genererCvb() {
    const polyclinique = document.getElementById('polyclinique').value;
    const docteur = document.getElementById('docteur').value;
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom du patient]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'âgé(e) de ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
    <title>Certificat CBV</title>
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
        <h1>CERTIFICAT CBV</h1>
        <p>
            Je soussigné(e), Dr <strong>${docteur || '[Nom du docteur]'}</strong>, certifie avoir examiné 
            le patient <strong>${patientNomPrenom}</strong>, ${ageInfo}.
        </p>
        <p>
            [Contenu du certificat CBV]
        </p>
        <div class="signature">
            Fait à <strong>${polyclinique || '[Nom de la polyclinique]'}</strong>, le <strong>${formattedDate}</strong><br><br><br>
            Signature et cachet<br>
            Dr <strong>${docteur || '[Nom du docteur]'}</strong>
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
    
    // Get patient information from the form fields
    const patientNomPrenom = document.getElementById('patientNomPrenom').value || '[Nom de l\'élève]';
    const patientAge = document.getElementById('patientAge').value;
    const patientDateNaissance = document.getElementById('patientDateNaissance').value;
    const dateCertificat = document.getElementById('dateCertificat').value || new Date().toISOString().split('T')[0];
    
    // Construire la partie de l'âge/date de naissance
    let ageInfo = '';
    if (patientAge) {
        ageInfo = 'né(e) le ' + patientAge;
    } else if (patientDateNaissance) {
        ageInfo = 'né(e) le ' + patientDateNaissance;
    } else {
        ageInfo = 'né(e) le [Date de naissance]';
    }
    
    // Format the date for display
    const formattedDate = new Date(dateCertificat).toLocaleDateString('fr-FR');
    
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
<title>Certificat médical d'éviction scolaire</title>
<style>
body {
font-family: Arial, sans-serif;
padding: 20px;
background-color: #f9f9f9;
}
.certificat {
background-color: white;
border: 1px solid #ddd;
padding: 20px 40px;
max-width: 600px;
margin: 0 auto;
margin-top: 60px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
padding-top: 30px;
}
h1 {
text-align: center;
color: #333;
text-decoration: underline;
font-size: 20px;
margin-top: 15px;
margin-bottom: 25px;
}
p {
line-height: 1.5;
color: #555;
}
.editable-field {
border-bottom: 1px dashed #666;
display: inline-block;
min-width: 50px;
min-height: 20px;
padding: 2px 4px;
margin: 0 3px;
}
.editable-area {
border: 1px solid #ddd;
border-radius: 4px;
padding: 8px;
margin: 5px 0;
width: 100%;
min-height: 20px;
resize: vertical;
overflow: hidden;
font-family: inherit;
font-size: inherit;
line-height: inherit;
}
.editable-area:focus {
outline: none;
border-color: #007bff;
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
@media print {
@page {
    size: A5;
    margin: 0.2cm 0.2cm 0.2cm 0.2cm;
}

body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10pt !important;
    line-height: 1.2 !important;
    background-color: white;
}

.certificat {
    border: none;
    box-shadow: none;
    margin: 0 !important;
    padding: 2px 8px !important;
    max-width: 100% !important;
}

h1 {
    font-size: 14pt !important;
    margin: 5px 0 !important;
    margin-top: 2cm !important;
}

input[type="text"],
input[type="date"],
textarea {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 9pt !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border: none !important;
    outline: none !important;

}

.print-button {
    display: none;
}

.editable-field, .editable-area {
    border: none !important;
}

/* Additional space optimization */
* {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
}

p {
    margin: 2px 0 !important;
    font-size: 9pt !important;
}
}
</style>
</head>
<body>
${enteteContent}
<div class="certificat">
<h1>CERTIFICAT MÉDICAL D'ARRÊT DE TRAVAIL</h1>
<br><br><br>
<p>
Je soussigné, Dr <input type="text" id="docteur" value="${docteur}" placeholder="">, certifie avoir examiné ce jour
<strong><input type="text" value="${patientNomPrenom}" style="width: 150px;"></strong>,
<span class="editable-field" contenteditable="true" style="min-width: 100px; display: inline-block;">${ageInfo}</span>.
</p>
<p>
déclare que son état de santé nécessite un arret de travail de
<input type="text" placeholder="1 (un)" style="width: 80px;"> Jour(s)
à daté du <span class="editable-field" contenteditable="true" style="min-width: 120px; display: inline-block;">${formattedDate}</span> <br>
sauf complication.
</p>
<p>
<textarea placeholder=" " style="width: 450px;"></textarea>
</p>
<p style="text-align: right; margin-top: 30px;">
Dont certificat&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>
<span class="docteur" style="font-weight: bold;">Dr ${docteur}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;
</p>
</div>
<div class="print-button" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
    <div style="display: flex; align-items: center; gap: 8px;">
        <label for="fontSize" style="font-size: 14px; margin: 0;">Taille du texte:</label>
        <input type="number" id="fontSize" min="8" max="20" value="14" style="width: 60px; padding: 5px; border: 1px solid #bdbdbd; border-radius: 4px;">
    </div>
    <button id="printButton">Imprimer le Certificat</button>
</div>
<script>
    // Appliquer la taille de police sauvegardée et masquer les éléments non désirés à l'impression
    document.addEventListener('DOMContentLoaded', () => {
        const savedFontSize = localStorage.getItem('certificatFontSize') || '14';
        const styleElement = document.createElement('style');
        styleElement.textContent = "@media print { .print-button { display: none !important; } }";
        styleElement.id = 'certificatFontSizeStyle';
        document.head.appendChild(styleElement);
        
        // Add print functionality
        document.getElementById('printButton').addEventListener('click', function() {
            window.print();
        });
    });
</script>
</body>
</html>
    `;
    
    const newWindow = window.open();
    newWindow.document.write(certificatHtml);
    newWindow.document.close();
}

function setupFormatButtons() {
    const formatAvecEnteteBtn = document.getElementById("formatAvecEntete");
    const formatSansEnteteBtn = document.getElementById("formatSansEntete");
    
    if (formatAvecEnteteBtn) {
        formatAvecEnteteBtn.addEventListener("click", function() {
            localStorage.setItem('certificatFormat', 'avecEntete');
            this.classList.add('selected-format');
            if (formatSansEnteteBtn) {
                formatSansEnteteBtn.classList.remove('selected-format');
            }
        });
    }
    
    if (formatSansEnteteBtn) {
        formatSansEnteteBtn.addEventListener("click", function() {
            localStorage.setItem('certificatFormat', 'sansEntete');
            this.classList.add('selected-format');
            if (formatAvecEnteteBtn) {
                formatAvecEnteteBtn.classList.remove('selected-format');
            }
        });
    }
}

// Configurer les gestionnaires d'événements lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupFormatButtons();
    
    // Initialiser le format au chargement
    const format = localStorage.getItem('certificatFormat');
    const formatAvecEnteteBtn = document.getElementById('formatAvecEntete');
    const formatSansEnteteBtn = document.getElementById('formatSansEntete');
    
    if (format === 'sansEntete' && formatSansEnteteBtn) {
        formatSansEnteteBtn.classList.add('selected-format');
    } else if (formatAvecEnteteBtn) {
        // Par défaut, on utilise avec en-tete
        formatAvecEnteteBtn.classList.add('selected-format');
    }
    
    // Écouteurs pour les boutons
    const saveBtn = document.getElementById("SavePolycliniqueDocteur");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveData);
    }
    
    const certificatBtn = document.getElementById("genererCertificat");
    if (certificatBtn) {
        certificatBtn.addEventListener("click", genererCertificat);
    }
    
    const inaptSportBtn = document.getElementById("inaptSport");
    if (inaptSportBtn) {
        inaptSportBtn.addEventListener("click", inaptitudeSport);
    }
    
    const arretBtn = document.getElementById("genererArret");
    if (arretBtn) {
        arretBtn.addEventListener("click", genererArretTravail);
    }
    
    const radioxBtn = document.getElementById("genererRadiox");
    if (radioxBtn) {
        radioxBtn.addEventListener("click", genererRadiox);
    }
    
    // Écouteur pour le champ date de naissance - calcul automatique de l'âge
    const dateNaissanceInput = document.getElementById('patientDateNaissance');
    if (dateNaissanceInput) {
        dateNaissanceInput.addEventListener('change', function() {
            const dateNaissance = this.value;
            if (dateNaissance) {
                const ageCalcule = calculerAge(dateNaissance);
                const ageInput = document.getElementById('patientAge');
                if (ageInput) {
                    ageInput.value = ageCalcule;
                }
            }
        });
    }
    
    // Écouteur pour le champ âge - effacer la date de naissance si l'âge est modifié manuellement
    const ageInput = document.getElementById('patientAge');
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            // Si l'utilisateur commence à taper dans le champ âge, on ne force plus le calcul automatique
            // Mais on ne vide la date de naissance que si l'âge est significativement différent
            // Pour permettre les deux modes de saisie
        });
    }
});
