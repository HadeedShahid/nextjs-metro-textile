"use client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Button } from "@/components/ui/button";
import { IconBrandWhatsapp, IconMailFilled } from "@tabler/icons-react";
import { PhoneIcon } from "@/icons";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ContactActionGroup from "./common/ContactActionGroup";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    images: any[];
    category: {
      title: string;
    };
    isFeatured?: boolean;
    isPopular?: boolean;
  };
  categoryPath: string;
}

export default function ProductCard({
  product,
  categoryPath,
}: ProductCardProps) {
  const mainImage = product.images?.[0];
  const productUrl = `/product/${product.slug.current}`;
  const { push } = useRouter();
  return (
    <Card
      onClick={() => {
        push(productUrl);
      }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ring-foreground/5 flex flex-col h-full py-0 gap-0 cursor-pointer"
    >
      {/* Image Section - Edge to Edge in container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        {mainImage ? (
          <Image
            src={urlFor(mainImage).width(600).height(450).url()}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No Image
          </div>
        )}

        {/* Category Badge - Absolute Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          <Button href={categoryPath} size={"xs"} variant={"outline"}>
            {product.category?.title}
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-5 flex flex-col flex-grow bg-white">
        <Link href={productUrl}>
          <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
        </Link>

        {/* Action Row - Unified style, no divider as requested */}
        <div
          className="mt-5"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ContactActionGroup
            className="flex-nowrap"
            emailProps={{
              subject: `Inquiry: ${product.title}`,
              className: "flex-1",
              size: "lg",
            }}
            callProps={{
              className: "flex-1",
              size: "lg",
            }}
            whatsappProps={{
              text: `I'm interested in ${product.title}`,
              label: null,
              icon: <IconBrandWhatsapp />,
              size: "lg",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
