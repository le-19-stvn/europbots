// Hypothèses de prix fournies par Europbots (novembre 2026). Toute la page prix et le simulateur en dépendent.

export const pricing = {
  leaseFrom: 500, // € HT par mois, prix d'appel de la gamme
  leaseMonths: 36,
  hourlyCost: 13, // coût horaire employeur hypothétique (€)
  workDays: 22, // jours d'activité par mois
  employeeMonthly: 2000, // coût employeur estimatif d'un salarié au SMIC à temps plein
};

export const eur = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;
export const signedEur = (n: number) => `${n >= 0 ? "+" : "−"}${Math.abs(Math.round(n)).toLocaleString("fr-FR")} €`;

/** Économie brute, gain net et seuil de rentabilité pour un nombre d'heures économisées par jour. */
export function simulate({ hoursPerDay, hourlyCost = pricing.hourlyCost, workDays = pricing.workDays, lease = pricing.leaseFrom, months = pricing.leaseMonths }: {
  hoursPerDay: number;
  hourlyCost?: number;
  workDays?: number;
  lease?: number;
  months?: number;
}) {
  const gross = hoursPerDay * hourlyCost * workDays;
  const net = gross - lease;
  const breakEvenHoursMonth = lease / hourlyCost;
  return {
    gross,
    net,
    yearly: net * 12,
    overTerm: net * months,
    breakEvenHoursMonth,
    breakEvenHoursDay: breakEvenHoursMonth / workDays,
  };
}

export const employeeComparison: [string, string, string][] = [
  ["Coût mensuel", eur(pricing.employeeMonthly), `${eur(pricing.leaseFrom)} HT`],
  ["Coût annuel", eur(pricing.employeeMonthly * 12), `${eur(pricing.leaseFrom * 12)} HT`],
  [`Coût sur ${pricing.leaseMonths} mois`, eur(pricing.employeeMonthly * pricing.leaseMonths), `${eur(pricing.leaseFrom * pricing.leaseMonths)} HT`],
  ["Congés payés", "Oui", "Non"],
  ["Indisponibilités", "Arrêts maladie possibles", "Pannes possibles"],
  ["Horaires décalés", "Coût supplémentaire possible", "Selon programmation"],
  ["Tâches réalisables", "Multiples", "Spécialisées"],
];
