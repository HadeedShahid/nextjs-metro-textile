import ProductCard from "../ProductCard";
import EmblaCarouselWrapper from "@/components/emblaCarousel/EmblaCarouselWrapper";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Section from "../base/Section";
import Text from "../base/Text";
import { Button } from "../ui/button";

interface ProductCarouselProps {
  products: any[];
  title?: string;
  viewAllHref?: string;
}

const ProductCarousel = ({
  products,
  title,
  viewAllHref,
}: ProductCarouselProps) => {
  return (
    <Section
      title={title}
      headerAction={
        viewAllHref && (
          <Button
            variant={"link"}
            href={viewAllHref}
            className="font-semibold text-md"
          >
            Explore All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        )
      }
    >
      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-4 md:gap-6"
        slideClassName="basis-[80%] sm:basis-[45%] lg:basis-[25%]"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            categoryPath={`/products/${product.category?.slug?.current || ""}`}
          />
        ))}
      </EmblaCarouselWrapper>
    </Section>
  );
};

export default ProductCarousel;
