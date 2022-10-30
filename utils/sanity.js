import { createClient, createCurrentUserHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
// sanity studio
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "zl2lq0w6", // changes danger
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_DEV === "production",
};
export const sanityClient = createClient(config);

// so far its very very similar to how we configure firebase

// gives url for the image
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentUserHook(config); // a hook provided by sanity
