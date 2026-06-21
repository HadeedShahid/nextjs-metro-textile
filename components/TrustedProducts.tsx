import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "./base/Section";
import Text from "./base/Text";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";
import { fetchParentCategories } from "@/lib/api";
import { urlFor } from "@/sanity/image";

const FALLBACK_IMAGE = "/assets/landing-card-1.png";

export default async function TrustedProducts() {
  const { data: categories } = await fetchParentCategories();
  const safeCategories = categories ?? [];

  if (safeCategories.length === 0) return null;

  return (
    <Section title="Product Catalog">
      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-6"
        slideClassName="basis-[75%] sm:basis-[40%] lg:basis-[24%]"
      >
        {safeCategories.map((cat) => {
          const imgUrl = cat.image
            ? urlFor(cat.image).width(400).height(300).url()
            : FALLBACK_IMAGE;

          return (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="flex flex-col items-start p-7 justify-between bg-[#f3f3f3] rounded-lg w-full group transition-all duration-300 hover:shadow-lg hover:bg-[#ebebeb] cursor-pointer h-full"
            >
              <Text className="font-medium">
                {cat.title} &ndash;{" "}
                <span className="text-gray-500">Metro</span>
              </Text>
              <Image
                src={imgUrl}
                alt={cat.title}
                width={400}
                height={300}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex w-full justify-end">
                <div className="group/btn border border-[#7F2F82] py-1 px-6 rounded-full transition-all ease-in-out duration-300 bg-transparent group-hover:bg-[#7f2f82] group-hover:text-white flex items-center justify-center">
                  <ArrowRight className="text-[#7F2F82] group-hover:text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </EmblaCarouselWrapper>
    </Section>
  );
}
