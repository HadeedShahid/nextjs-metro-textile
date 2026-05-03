import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Section from "./base/Section";

interface ComplianceBadge {
  image: string;
  alt: string;
}

interface ComplianceFeature {
  title: string;
  description: string;
  badgeImage: string;
  badgeAlt: string;
}

interface ComplianceSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  badges?: ComplianceBadge[];
  features?: ComplianceFeature[];
  className?: string;
}

const ComplianceSection = ({
  tagline = "Quality & Compliance",
  heading = "Globally Recognized Manufacturing Standards",
  description = "Metro Metal is a partner to the global leather and textile industry. All of our manufacturing units are ISO 9002 certified and our products adhere to OEKO-TEX standards, ensuring safety, quality, and environmental responsibility.",
  badges = [
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg",
      alt: "ISO Certified",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/GDPR.svg",
      alt: "OEKO-TEX Standard",
    },
  ],
  features = [
    {
      title: "ISO 9002 Certified Manufacturing",
      description:
        "Our state-of-the-art manufacturing units strictly adhere to ISO 9002 quality management systems, guaranteeing excellence in every production run.",
      badgeImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg",
      badgeAlt: "ISO 9002",
    },
    {
      title: "OEKO-TEX Standard Compliance",
      description:
        "We are deeply committed to safety and sustainability. All our products are tested and verified according to the rigorous OEKO-TEX standard.",
      badgeImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27017.svg",
      badgeAlt: "OEKO-TEX",
    },
    {
      title: "Timely & Secure Delivery",
      description:
        "With a very strong global network across Asia and Europe, we maintain an excellent track record of timely and secure deliveries.",
      badgeImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27018.svg",
      badgeAlt: "Delivery",
    },
  ],
  className,
}: ComplianceSectionProps) => {
  return (
    <Section
      className={cn("bg-muted/50 py-16 md:py-24 rounded-2xl", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="flex items-center gap-6 mt-4">
              {badges.map((badge, index) => (
                <img
                  key={index}
                  src={badge.image}
                  alt={badge.alt}
                  className="h-16 md:h-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:invert"
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "relative overflow-hidden p-6 lg:px-8 lg:py-10",
                  index !== features.length - 1 && "border-b border-slate-100",
                )}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-slate-900 lg:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 w-11/12 pr-6 text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <img
                  src={feature.badgeImage}
                  alt={feature.badgeAlt}
                  className="absolute right-4 -bottom-6 size-24 text-slate-200 opacity-20 grayscale lg:right-8 lg:size-32 dark:invert pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ComplianceSection;
