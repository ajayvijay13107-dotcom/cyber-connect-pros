import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import OwnerBenefits from "@/components/OwnerBenefits";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <OwnerBenefits />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
