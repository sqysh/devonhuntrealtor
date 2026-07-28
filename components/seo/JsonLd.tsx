/**
 * Not a Lighthouse audit, but it's what turns a good SEO score into
 * actual rich results. Render once in app/layout.tsx inside <body>.
 */
const SITE_URL = "https://www.devonhuntrealtor.com";

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#agent`,
  name: "Devon Hunt",
  jobTitle: "Realtor\u00AE, Accredited Buyer's Representative (ABR\u00AE)",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+1-978-818-5303",
  email: "devon@thepropernest.com",
  parentOrganization: {
    "@type": "RealEstateAgent",
    name: "The Proper Nest Real Estate",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "257 Washington St #3",
    addressLocality: "Marblehead",
    addressRegion: "MA",
    postalCode: "01945",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "Massachusetts",
  },
  sameAs: [
    "https://www.facebook.com/devondhunt",
    "https://www.instagram.com/devondhunt/",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
