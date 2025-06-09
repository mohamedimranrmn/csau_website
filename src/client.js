import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "wzu06sd5",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-09-21",
});

const builder = imageUrlBuilder(client);

// Utility function to build image URLs
export const urlFor = (source) => {
  if (!source || !source.asset) {
    console.warn('urlFor called with invalid source:', source);
    return { url: () => '' };
  }
  return builder.image(source);
};
// Utility function to fetch data from Sanity
export default client;
