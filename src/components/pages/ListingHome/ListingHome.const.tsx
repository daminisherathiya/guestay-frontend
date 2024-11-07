/* eslint-disable sort-keys */

export const ALL_LISTING_STEPS = [
  "new",
  "type",
  "location",
  "bedroom_info",
  "amenities",
  "images",
  "title",
  "description",
  "price",
  "discount",
  "draft",
];

export const LISTING_STEP_TO_URL: Record<string, string> = {
  new: "/become-a-host/about-your-place",
  type: "/become-a-host/structure",
  location: "/become-a-host/location",
  bedroom_info: "/become-a-host/floor-plan",
  amenities: "/become-a-host/amenities",
  images: "/become-a-host/photos",
  title: "/become-a-host/title",
  description: "/become-a-host/description",
  price: "/become-a-host/price",
  discount: "/become-a-host/discount",
  draft: "/become-a-host/receipt",
};

export const NUMBER_OF_PROPERTIES_TO_SHOW = 2;
