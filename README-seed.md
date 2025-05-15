# Firestore Seeding Script

Detta script hjälper dig att ladda upp produktdata till din Firebase Firestore-databas från JSON-filen med kategori- och produktdata.

## Förutsättningar

- Node.js installerat på din dator
- Ett Firebase-projekt med Firestore aktiverat
- En servicekontonyckel från Firebase

## Installation

1. Installera nödvändiga beroenden:

```bash
npm install
```

## Skapa en servicekontonyckel

För att scriptet ska kunna ansluta till din Firestore-databas behöver du en servicekontonyckel:

1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Välj ditt projekt
3. Gå till Projektinställningar (kugghjulet) > Servicekonton
4. Välj "Node.js" och klicka på "Generera ny privat nyckel"
5. Spara den nedladdade filen som `serviceAccountKey.json` i samma mapp som detta script

## Importera data

När du har installerat beroenden och har din servicekontonyckel på plats, kör följande kommando för att importera data:

```bash
npm run seed
```

eller

```bash
node seed.js
```

## Struktur på importdata

Scriptet förväntar sig att din `firestore-import.json` fil har följande struktur:

```json
{
  "categories": {
    "kategorinamn": {
      "title": "kategorinamn",
      "imgsrc": "URL till kategoribild",
      "isLarge": true/false,
      "storedItems": [
        {
          "id": "produkt-id",
          "plantName": "Produktnamn",
          "price": "Pris",
          "size": "Storlek",
          "imgUrl": "URL till produktbild"
        },
        ...
      ]
    },
    ...
  }
}
```

## Säkerhet

⚠️ **Viktigt**: Lägg aldrig till `serviceAccountKey.json` i versionshantering (git). Den innehåller känsliga uppgifter som ger administratörsåtkomst till din Firebase-databas.

Lägg till följande rad i din `.gitignore`-fil:

```
serviceAccountKey.json
``` 