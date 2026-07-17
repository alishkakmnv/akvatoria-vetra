import { Header } from "@/components/header";
import { Hero } from "@/components/hero/hero";
import { Trust } from "@/components/trust";
import { Services } from "@/components/services";
import { Fleet } from "@/components/fleet";
import { Training } from "@/components/training";
import { Instructors } from "@/components/instructors";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Pricing } from "@/components/pricing";
import { Cities } from "@/components/cities";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Trust />
        <Services />
        <Fleet />
        <Training />
        <Instructors />
        <Testimonials />
        <Faq />
        <Pricing />
        <Cities />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
