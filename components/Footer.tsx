import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Section from "./base/Section";
import { cn } from "@/lib/utils";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

interface FooterBasicProps {
  logo?: FooterLogo;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string;
}

const defaultProps: Footer2Props = {
  logo: {
    url: "/",
    src: "/logo.png",
    alt: "Metro Metal Logo",
    title: "Metro Metal",
  },
  description:
    "Your trusted partner in the global leather and textile industry. We provide premium accessories to the global soft and hard goods industry.",
  sections: [
    {
      title: "Product Range",
      links: [
        { name: "All Products", href: "/#products" },
        { name: "Zippers", href: "/#products" },
        { name: "Buttons", href: "/#products" },
        { name: "Buckles", href: "/#products" },
        { name: "Others", href: "/#products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Business Inquiries", href: "mailto:Shahid@metro-metal.com" },
        { name: "Call Us: +42 35846163", href: "tel:+4235846163" },
      ],
    },
  ],
  copyright: "© 2025 Metro Metal. All rights reserved.",
};

const MAX_SECTIONS = 4;

const Footer = (props: Partial<Footer2Props>) => {
  const { logo, description, sections, copyright, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <Section className={cn("py-6", className)}>
      <div className="flex flex-col justify-between">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 mb-8 md:mb-0">
            <div className="flex items-center md:justify-start">
              <Link href={logo!.url}>
                <Image
                  src={logo!.src}
                  alt={logo!.alt}
                  title={logo!.title}
                  width={120}
                  height={116}
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-500 max-w-sm">
              {description}
            </p>

            <div className="flex justify-start gap-3 pt-6">
              <a
                href="#"
                className="bg-[#7f2f821b] hover:bg-[#7f2f8230] transition-colors p-2.5 rounded-full"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="bg-[#7f2f821b] hover:bg-[#7f2f8230] transition-colors p-2.5 rounded-full"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="bg-[#7f2f821b] hover:bg-[#7f2f8230] transition-colors p-2.5 rounded-full"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="bg-[#7f2f821b] hover:bg-[#7f2f8230] transition-colors p-2.5 rounded-full"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {visibleSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="col-span-1 md:col-span-1">
              <h3 className="mb-4 text-base font-semibold tracking-tight text-slate-900">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm text-slate-500">
                {section.links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between items-end gap-4 border-t border-slate-200 pt-6 text-sm font-medium text-slate-500 md:flex-row md:items-center md:justify-end">
          <p>{copyright}</p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
