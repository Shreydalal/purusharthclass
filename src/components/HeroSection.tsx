import { GraduationCap, Users, Award, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
const HeroSection = () => {
  const highlights = [{
    icon: GraduationCap,
    text: "Experienced Faculty"
  }, {
    icon: Award,
    text: "Strong Results"
  }, {
    icon: Users,
    text: "Personal Attention"
  }, {
    icon: BookOpen,
    text: "Conceptual Learning"
  }];
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(200_85%_50%/0.3),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(38_95%_55%/0.1),_transparent_50%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">Admissions for the Academic Year 2026–2027 will be announced soon.</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>પુરુષાર્થ ક્લાસ</h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-primary-foreground/90 mb-6 animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            9th & 10th Gujarati Medium
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            ગુણવત્તાયુક્ત શિક્ષણ અને વ્યક્તિગત ધ્યાન સાથે તમારા બાળકના ભવિષ્યને આકાર આપો। 
            Building bright futures through quality education and personalized attention.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <Button variant="accent" size="xl" onClick={scrollToContact} className="w-full sm:w-auto">
              Enroll Now
            </Button>
            <a href="tel:+919876543210" className="w-full sm:w-auto">
              <Button variant="heroOutline" size="xl" className="w-full">
                Contact Us
              </Button>
            </a>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in" style={{
          animationDelay: "0.5s"
        }}>
            {highlights.map((item, index) => <div key={index} className="flex flex-col items-center gap-3 p-4 md:p-6 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl hover:bg-primary-foreground/10 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-accent/20 rounded-lg">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-primary-foreground text-sm md:text-base font-medium text-center">
                  {item.text}
                </span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 33% 98%)" />
        </svg>
      </div>
    </section>;
};
export default HeroSection;