import { Service } from "@/app/(public)/services/_types/services.types";

export const SERVICES: Service[] = [
  {
    id: "buy",
    eyebrow: "For buyers",
    title: "Buy Property",
    image: "/images/services-1.png",
    intro:
      "Looking to buy a property? I am dedicated to guiding you through every step of the process. Whether you're a first-time homebuyer or looking to invest, I offer personalized assistance to help you find the perfect property.",
    points: [
      "Personalized consultation to understand your needs and preferences.",
      "Expert guidance on local market trends and property values.",
      "Access to a wide range of listings tailored to your criteria.",
      "Support throughout the negotiation and closing process for a seamless transaction.",
    ],
  },
  {
    id: "sell",
    eyebrow: "For sellers",
    title: "Sell Property",
    image: "/images/services-2.jpg",
    intro:
      "Ready to sell your property? I am here to make the process as smooth and profitable as possible. I offer comprehensive market analysis, effective marketing strategies, and expert negotiation skills to ensure you get the best value for your property.",
    points: [
      "Detailed market analysis to determine optimal pricing.",
      "Professional marketing strategies to attract potential buyers.",
      "Staging and presentation tips to enhance property appeal.",
      "Skilled negotiation to maximize your property's value.",
    ],
  },
  {
    id: "rent",
    eyebrow: "For renters",
    title: "Rent Property",
    image: "/images/services-3.jpg",
    intro:
      "Interested in a rental? I am committed to ensuring a smooth and rewarding experience. I strive to find the ideal rental that matches your needs and budget, offering personalized service and expert market insights.",
    points: [
      "Comprehensive listings, detailed market analysis, and seamless assistance with lease negotiations.",
      "Ongoing support and guidance throughout your rental journey.",
      "Make the process as smooth as possible for you.",
    ],
  },
];
