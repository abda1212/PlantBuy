/**
 * SEED SCRIPT - FIREBASE FIRESTORE
 * 
 * Detta script laddar upp kategori- och produktdata från firestore-import.json till Firestore
 * Använder Firebase Admin SDK för att ansluta till Firestore
 * 
 * Kör med: node seed.js
 */

// Importera nödvändiga moduler
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path till serviceAccount-nyckel för Firebase (skapa din egen nyckel från Firebase Console)
// OBS: Ersätt denna sökväg med din egen serviceAccount-nyckelfil
const serviceAccountPath = './serviceAccountKey.json';

// Läs in JSON-data från importfilen
const importFilePath = path.join(__dirname, 'firestore-import.json');
const jsonData = JSON.parse(fs.readFileSync(importFilePath, 'utf8'));

/**
 * Funktion för att ladda upp data till Firestore
 */
async function seedFirestore() {
  try {
    console.log('Startar uppladdning till Firestore...');

    // Kontrollera om serviceAccount-filen existerar
    if (!fs.existsSync(serviceAccountPath)) {
      console.error(`ERROR: Servicekontonyckel hittades inte på sökvägen: ${serviceAccountPath}`);
      console.log('\nFölj dessa steg för att skapa en servicekontonyckel:');
      console.log('1. Gå till Firebase Console: https://console.firebase.google.com/');
      console.log('2. Välj ditt projekt');
      console.log('3. Gå till Projektinställningar (kugghjulet) > Servicekonton');
      console.log('4. Välj "Node.js" och klicka på "Generera ny privat nyckel"');
      console.log('5. Spara den nedladdade filen som "serviceAccountKey.json" i samma mapp som detta script\n');
      return;
    }

    // Läs in servicekontonyckel
    const serviceAccount = require(serviceAccountPath);

    // Initiera Firebase Admin SDK med servicekontonyckel
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    // Få åtkomst till Firestore-databasen
    const db = admin.firestore();

    // Extrahera kategoridata från importfilen
    const { categories } = jsonData;

    // Kontrollera att vi har kategoridata
    if (!categories) {
      throw new Error('Kunde inte hitta kategorier i importfilen');
    }

    // Räkna antal importerade kategorier för rapport
    let importedCategories = 0;
    let importedProducts = 0;

    // Loopa igenom alla kategorier och ladda upp dem till Firestore
    for (const [categoryName, categoryData] of Object.entries(categories)) {
      console.log(`Laddar upp kategori: ${categoryName}`);
      
      // Skapa dokumentreferens för kategorin med kategorins namn som dokument-ID
      const categoryRef = db.collection('categories').doc(categoryName);
      
      // Ladda upp kategoridatan
      await categoryRef.set(categoryData);
      
      // Räkna upp statistik
      importedCategories++;
      importedProducts += categoryData.storedItems ? categoryData.storedItems.length : 0;
    }

    // Visa importresultat
    console.log('\n✅ Import slutförd!');
    console.log(`Importerade ${importedCategories} kategorier`);
    console.log(`Importerade ${importedProducts} produkter totalt`);

  } catch (error) {
    console.error('ERROR vid import:', error);
  }
}

// Kör seedningsfunktionen
seedFirestore()
  .then(() => {
    console.log('Seedning slutförd! Du kan nu stänga detta script (Ctrl+C).');
  })
  .catch(error => {
    console.error('Ett fel inträffade:', error);
    process.exit(1);
  }); 