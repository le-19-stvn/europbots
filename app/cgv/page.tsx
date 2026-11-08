import type { Metadata } from "next";
import Legal from "@/components/Legal";

export const metadata: Metadata = { title: "Conditions générales de vente", alternates: { canonical: "/cgv" } };

export default function Page() {
  return <Legal id="cgv" />;
}
