import { LandingInteractions } from "@/components/landing/landing-interactions";
import { landingHtml } from "./landing-html";

export default function Home() {
  return (
    <>
      <LandingInteractions />
      <div dangerouslySetInnerHTML={{ __html: landingHtml }} />
    </>
  );
}
