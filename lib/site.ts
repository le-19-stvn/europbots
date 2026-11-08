export const SITE_URL = "https://europbots.com";

export const company = {
  name: "Europbots",
  legalName: "Europbots SAS",
  email: "contact@europbots.com",
  phone: "+33 1 85 37 03 37",
  phoneHref: "tel:+33185370337",
  hours: "Du lundi au vendredi, 9 h – 18 h",
  address: { street: "9 Avenue de la Grande Armée", postalCode: "75016", city: "Paris", country: "FR" },
  linkedin: "https://www.linkedin.com/company/europbots-officiel/",
  instagram: "https://www.instagram.com/europbots/",
};

export const showrooms = [
  { city: "Paris", country: "France", address: "9 Avenue de la Grande Armée, 75016 Paris", hours: "Lun – Ven, 9 h – 18 h", open: true, note: "Siège et showroom principal" },
  { city: "Clermont-Ferrand", country: "France", address: "8 rue de la Pépinière, Solagnat, 63870 Orcines", hours: "Lun – Ven, 9 h – 18 h", open: true, note: "Showroom et atelier" },
  { city: "Lyon", country: "France", address: "Ouverture prochaine", hours: "", open: false, note: "" },
  { city: "Marseille", country: "France", address: "Ouverture prochaine", hours: "", open: false, note: "" },
  { city: "Lisbonne", country: "Portugal", address: "Ouverture prochaine", hours: "", open: false, note: "" },
];

// Tous les CTA de démonstration mènent au formulaire de contact (sujet pré-sélectionné).
export const BOOKING_HREF = "/contact?sujet=demo#devis";
