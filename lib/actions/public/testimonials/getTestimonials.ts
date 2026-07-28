import prisma from "@/prisma/client";

export type Testimonial = {
  id: number;
  title: string | null;
  desc: string | null;
  name: string | null;
  type: string | null;
  img: string | null;
};

/**
 * Plain server-only read — deliberately not a "use server" action.
 * Actions exist so client code can invoke the server; a server
 * component can just call this, skipping the extra round trip.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        desc: true,
        name: true,
        type: true,
        img: true,
      },
    });
  } catch (error) {
    console.error("[getTestimonials]", error);
    return [];
  }
}
