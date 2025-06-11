export function berechneBussgeld(verstossArt, antworten) {
  switch (verstossArt) {
    case "zu_schnell":
      return berechneGeschwindigkeit(antworten);
    case "abstand":
      return berechneAbstand(antworten);
    case "rote_ampel":
      return berechneAmpel(antworten);
    case "handy":
      return berechneHandy(antworten);
    case "alkohol_drogen":
      return berechneAlkohol(antworten);
    default:
      return {
        bussgeld: 0,
        punkte: 0,
        fahrverbot: null,
        bemerkung: "Keine gültige Auswahl getroffen",
      };
  }
}

function berechneGeschwindigkeit({ fahrzeugart, ort, kmhZuSchnell }) {
  if (fahrzeugart === "PKW" && ort === "innerorts") {
    if (kmhZuSchnell <= 10) return { bussgeld: 30, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 15) return { bussgeld: 50, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 20) return { bussgeld: 70, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 25) return { bussgeld: 115, punkte: 1, fahrverbot: null };
    if (kmhZuSchnell <= 30) return { bussgeld: 180, punkte: 1, fahrverbot: "1 Monat (Wiederholungstäter)" };
    if (kmhZuSchnell <= 40) return { bussgeld: 260, punkte: 2, fahrverbot: "1 Monat" };
    if (kmhZuSchnell <= 50) return { bussgeld: 400, punkte: 2, fahrverbot: "1 Monat" };
    if (kmhZuSchnell <= 60) return { bussgeld: 560, punkte: 2, fahrverbot: "2 Monate" };
    if (kmhZuSchnell <= 70) return { bussgeld: 700, punkte: 2, fahrverbot: "3 Monate" };
    return { bussgeld: 800, punkte: 2, fahrverbot: "3 Monate" };
  }

  if (fahrzeugart === "PKW" && ort === "ausserorts") {
    if (kmhZuSchnell <= 10) return { bussgeld: 20, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 15) return { bussgeld: 40, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 20) return { bussgeld: 60, punkte: 0, fahrverbot: null };
    if (kmhZuSchnell <= 25) return { bussgeld: 100, punkte: 1, fahrverbot: null };
    if (kmhZuSchnell <= 30) return { bussgeld: 150, punkte: 1, fahrverbot: "1 Monat (Wiederholungstäter)" };
    if (kmhZuSchnell <= 40) return { bussgeld: 200, punkte: 1, fahrverbot: "1 Monat" };
    if (kmhZuSchnell <= 50) return { bussgeld: 320, punkte: 2, fahrverbot: "1 Monat" };
    if (kmhZuSchnell <= 60) return { bussgeld: 480, punkte: 2, fahrverbot: "1 Monat" };
    if (kmhZuSchnell <= 70) return { bussgeld: 600, punkte: 2, fahrverbot: "2 Monate" };
    return { bussgeld: 700, punkte: 2, fahrverbot: "3 Monate" };
  }

  // Weitere Fälle für LKW, Anhänger etc.

  return {
    bussgeld: 0,
    punkte: 0,
    fahrverbot: null,
    bemerkung: "Unbekannte Kombination",
  };
}

function berechneAbstand({ distanceSpeed }) {
  // Beispielhafte Logik für Abstand
  if (distanceSpeed === 'bis80') return { bussgeld: 25, punkte: 0, fahrverbot: null };
  if (distanceSpeed === '81-100') return { bussgeld: 100, punkte: 1, fahrverbot: null };
  if (distanceSpeed === '101-130') return { bussgeld: 200, punkte: 2, fahrverbot: "1 Monat" };
  if (distanceSpeed === 'ueber130') return { bussgeld: 400, punkte: 2, fahrverbot: "3 Monate" };
  return {
    bussgeld: 0,
    punkte: 0,
    fahrverbot: null,
    bemerkung: "Unbekannte Kombination",
  };
}

function berechneAmpel({ redLightDuration, personEndangerment }) {
  // Beispielhafte Logik für rote Ampel
  if (redLightDuration === 'under1' && personEndangerment === 'no') return { bussgeld: 90, punkte: 1, fahrverbot: null };
  if (redLightDuration === 'under1' && personEndangerment === 'yes') return { bussgeld: 200, punkte: 2, fahrverbot: "1 Monat" };
  if (redLightDuration === 'over1' && personEndangerment === 'no') return { bussgeld: 200, punkte: 2, fahrverbot: "1 Monat" };
  if (redLightDuration === 'over1' && personEndangerment === 'yes') return { bussgeld: 320, punkte: 2, fahrverbot: "1 Monat" };
  return {
    bussgeld: 0,
    punkte: 0,
    fahrverbot: null,
    bemerkung: "Unbekannte Kombination",
  };
}

function berechneHandy({ phonePersonEndangerment, phoneDamage }) {
  // Beispielhafte Logik für Handy am Steuer
  if (phonePersonEndangerment === 'no' && phoneDamage === 'no') return { bussgeld: 100, punkte: 1, fahrverbot: null };
  if (phonePersonEndangerment === 'yes' || phoneDamage === 'yes') return { bussgeld: 200, punkte: 2, fahrverbot: "1 Monat" };
  return {
    bussgeld: 0,
    punkte: 0,
    fahrverbot: null,
    bemerkung: "Unbekannte Kombination",
  };
}

function berechneAlkohol({ substanceType, firstOffense }) {
  // Beispielhafte Logik für Alkohol/Drogen
  if (substanceType === 'alcohol' && firstOffense === 'yes') {
    return { bussgeld: 500, punkte: 2, fahrverbot: "1 Monat" };
  }
  if (substanceType === 'drugs' && firstOffense === 'yes') {
    return { bussgeld: 500, punkte: 2, fahrverbot: "1 Monat" };
  }
  if (substanceType === 'alcohol' && firstOffense === 'no') {
    return { bussgeld: 1000, punkte: 3, fahrverbot: "3 Monate" };
  }
  if (substanceType === 'drugs' && firstOffense === 'no') {
    return { bussgeld: 1000, punkte: 3, fahrverbot: "3 Monate" };
  }
  return {
    bussgeld: 0,
    punkte: 0,
    fahrverbot: null,
    bemerkung: "Unbekannte Kombination",
  };
} 