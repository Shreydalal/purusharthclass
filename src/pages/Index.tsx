import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Purusharth Class | 9th & 10th Gujarati Medium Coaching in Ahmedabad</title>
        <meta 
          name="description" 
          content="Purusharth Class offers quality coaching for 9th and 10th standard Gujarati medium students. Experienced faculty, strong results, and personal attention. Join us for excellence in education." 
        />
        <meta name="keywords" content="Purusharth Class, Gujarati medium coaching, 9th standard tuition, 10th standard tuition, Ahmedabad coaching class, board exam preparation" />
        <link rel="canonical" href="https://purusharthclass.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ResultsSection />
          <AboutSection />
          <CoursesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
