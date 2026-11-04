import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

// Built from the project alone, not the Sanity client, so the product grid can
// make image links in the browser without shipping the client with it.
const builder = createImageUrlBuilder({ projectId: "qrdka284", dataset: "production" });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
