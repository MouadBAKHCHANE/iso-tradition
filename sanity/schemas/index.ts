import blockContent from "./helpers/blockContent";
import siteSettings from "./siteSettings";
import marketingSettings from "./marketingSettings";
import homepage from "./homepage";
import aboutPage from "./aboutPage";
import contactPage from "./contactPage";
import solutionsPage from "./solutionsPage";
import product from "./product";
import blogPost from "./blogPost";
import legalPage from "./legalPage";

export const schemaTypes = [
  // Helpers
  blockContent,

  // Singletons
  siteSettings,
  marketingSettings,
  homepage,
  aboutPage,
  contactPage,
  solutionsPage,

  // Collections
  product,
  blogPost,
  legalPage,
];
