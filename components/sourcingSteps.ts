import { Search, PencilRuler, Package, Truck, type LucideIcon } from "lucide-react";

export type SourcingStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const sourcingSteps: SourcingStep[] = [
  {
    icon: Search,
    title: "Choose your materials",
    description:
      "Browse our catalog of zippers, buttons, buckles and finishes tailored to your brand.",
  },
  {
    icon: PencilRuler,
    title: "Technical consulting",
    description:
      "Work with our production specialists on spec sheets and technical drawings.",
  },
  {
    icon: Package,
    title: "Quality-controlled sampling",
    description:
      "Get physical samples to verify finish and colour accuracy before you commit.",
  },
  {
    icon: Truck,
    title: "Production and delivery",
    description:
      "Sit back as your order is manufactured and delivered on time, every time.",
  },
];
