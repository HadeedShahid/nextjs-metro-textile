import { client } from "@/sanity/client"
import { PortableText } from "next-sanity"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IconBrandWhatsapp, IconMailFilled } from "@tabler/icons-react"
import { PhoneIcon } from "@/icons"
import Breadcrumbs from "@/components/common/Breadcrumbs"
import ImageGallery from "@/components/common/ImageGallery"
import SpecificationGrid from "@/components/common/SpecificationGrid"
import OurClient from "@/components/OurClient"
import Cta from "@/components/Cta"
import BlogSection from "@/components/common/BlogSection"
import KeyFeatures from "@/components/common/KeyFeatures"
import RelatedProducts from "@/components/common/RelatedProducts"

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        images,
        description,
        "category": category->{
            _id,
            title,
            "slug": slug.current,
            "parent": parent->{
                title,
                "slug": slug.current
            }
        }
    }`
  return await client.fetch(query, { slug }, { next: { revalidate: 30 } })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium text-lg">Product not found.</p>
      </div>
    )
  }

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ]

  if (product.category) {
    if (product.category.parent) {
      breadcrumbs.push({
        label: product.category.parent.title,
        href: `/products/${product.category.parent.slug}`,
      })
    }
    breadcrumbs.push({
      label: product.category.title,
      href: `/products/${product.category.parent ? `${product.category.parent.slug}/` : ""}${product.category.slug}`,
    })
  }
  breadcrumbs.push({ label: product.title })

  return (
    <main className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col gap-8 mb-16">
          <h1 className="font-bold text-4xl md:text-5xl text-slate-900 leading-tight">
            {product.title}
          </h1>

          <ImageGallery images={product.images || []} />

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <SpecificationGrid />

              <h3 className="text-slate-900 mt-0 mb-4">Description</h3>
              {product.description ? (
                <PortableText value={product.description} />
              ) : (
                <p>
                  Premium quality {product.title} meticulously crafted for durability and style.
                  Metro Textiles ensures the highest standards of manufacturing for brands worldwide.
                </p>
              )}

            </div>

            <div className="hidden lg:block">
              <Card className="p-6 sticky top-24 border-slate-200 shadow-sm rounded-2xl bg-slate-50/30">
                <h3 className="font-bold text-lg text-slate-900">
                  Quick Inquiry
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="lg"
                    variant="secondary"
                    href={`mailto:info@metrotextile.com?subject=Inquiry: ${product.title}`}
                    className="flex-1 text-slate-600 font-semibold"
                  >
                    <IconMailFilled /> Email
                  </Button>

                  <Button
                    size="lg"
                    variant="secondary"
                    href={`tel:+1234567890`}
                    className="flex-1 text-slate-600 font-semibold"
                  >
                    <PhoneIcon /> Call
                  </Button>

                  <Button
                    size="lg"
                    variant="default"
                    href={`https://wa.me/1234567890?text=I'm interested in ${product.title}`}
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 "
                  >
                    <IconBrandWhatsapp />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <KeyFeatures />

        <div className="mt-16">
          <RelatedProducts
            categoryId={product.category?._id}
            currentProductId={product._id}
            categoryTitle={product.category?.title}
          />

          <BlogSection />
        </div>

        <div className="mt-16">
          <OurClient />
        </div>

        <div className="mt-16">
          <Cta />
        </div>
      </section >

      {/* Mobile Floating Contact Bar */}
      < div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 flex gap-2 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]" >
        <Button
          size="lg"
          variant="secondary"
          href={`mailto:info@metrotextile.com?subject=Inquiry: ${product.title}`}
          className="flex-1 text-slate-600 font-semibold"
        >
          <IconMailFilled /> Email
        </Button>

        <Button
          size="lg"
          variant="secondary"
          href={`tel:+1234567890`}
          className="flex-1 text-slate-600 font-semibold"
        >
          <PhoneIcon /> Call
        </Button>

        <Button
          size="lg"
          variant="default"
          href={`https://wa.me/1234567890?text=I'm interested in ${product.title}`}
          className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 "
        >
          <IconBrandWhatsapp />
        </Button>
      </div >
    </main >
  )
}
