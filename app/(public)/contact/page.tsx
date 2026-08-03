import { mintFormToken } from "@/lib/utils/contact-submission.utils";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return <ContactClient formToken={mintFormToken()} />;
}
