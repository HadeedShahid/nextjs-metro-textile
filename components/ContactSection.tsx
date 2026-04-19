import React from "react";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Section from "./base/Section";
import Text from "./base/Text";
import Whatsapp from "./common/Whatsapp";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const contactDetails = [
  {
    title: "Email Support",
    description: "For spec sheets and technical drawings.",
    icon: Mail,
    linkText: "hello@metrotextile.com",
    href: "mailto:hello@metrotextile.com",
  },
  {
    title: "Whatsapp",
    description: "Real time availability and custom leads.",
    icon: IconBrandWhatsapp,
    linkText: "Start chat now",
    href: "https://wa.me/9230654332176",
  },
  {
    title: "Call us directly",
    description: "Speak with a production specialist.",
    icon: Phone,
    linkText: "+92 30654332176",
    href: "tel:+9230654332176",
  },
  {
    title: "Visit our office",
    description: "Visit to feel the fabric and see the colors.",
    icon: MapPin,
    linkText: "Check the map",
    href: "https://maps.google.com/?q=Metro+Textile",
  },
];

const ContactSection = () => {
  return (
    <Section
      title="We'd love to hear from you"
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactDetails.map((item, index) => (
          <Card key={index} className="hover:shadow-md  flex flex-col">
            <CardHeader>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <item.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </CardTitle>
              <CardDescription className="text-foreground/60">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button href={item.href} variant="link" className="p-0 text-lg font-semibold" >
                {item.linkText}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default ContactSection;
