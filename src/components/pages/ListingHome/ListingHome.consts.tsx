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

export const PROPERTY_ID_STR = "[propertyId]";

export const LISTING_STEP_TO_URL: Record<string, string> = {
  // new: `/become-a-host/${PROPERTY_ID_STR}/about-your-place`,
  type: `/become-a-host/${PROPERTY_ID_STR}/structure`,
  location: `/become-a-host/${PROPERTY_ID_STR}/location`,
  bedroom_info: `/become-a-host/${PROPERTY_ID_STR}/floor-plan`,
  amenities: `/become-a-host/${PROPERTY_ID_STR}/amenities`,
  images: `/become-a-host/${PROPERTY_ID_STR}/photos`,
  title: `/become-a-host/${PROPERTY_ID_STR}/title`,
  description: `/become-a-host/${PROPERTY_ID_STR}/description`,
  price: `/become-a-host/${PROPERTY_ID_STR}/price`,
  discount: `/become-a-host/${PROPERTY_ID_STR}/discount`,
  draft: `/become-a-host/${PROPERTY_ID_STR}/receipt`,
};

export const NUMBER_OF_PROPERTIES_TO_SHOW = 2;
