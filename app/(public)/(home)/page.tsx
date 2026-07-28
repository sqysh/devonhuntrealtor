import Acknowledgements from "./_components/Acknowledgements";
import Benefits from "./_components/Benefits";
import HomeHero from "./_components/HomeHero";
import QuoteAndImage from "./_components/QuoteAndImage";
import Services from "./_components/Services";

export default function Home() {
  return (
    <main id="main">
      <HomeHero />
      <Services />
      <QuoteAndImage />
      <Acknowledgements />
      <Benefits />
    </main>
  );
}
