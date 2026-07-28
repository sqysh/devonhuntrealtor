export function headerLinkData(path: string) {
  return [
    {
      path: "/",
      match: "",
      textKey: "Home",
      active: path === "/",
    },
    {
      path: "/services",
      match: "services",
      textKey: "Services",
      active: path === "/services",
    },
    {
      path: "/areas",
      match: "areas",
      textKey: "Areas",
      active: path === "/areas",
    },
    {
      path: "/testimonials",
      match: "testimonials",
      textKey: "Testimonials",
      active: path === "/testimonials",
    },
    {
      path: "/about",
      match: "about",
      textKey: "About",
      active: path === "/about",
    },
    {
      path: "/contact",
      match: "contact",
      textKey: "Contact",
      active: path === "/contact",
    },
  ];
}
