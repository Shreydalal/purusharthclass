import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Courses", href: "#courses" },
    { name: "Results", href: "#results" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Purusharth Classes" 
                className="h-14 w-auto object-contain bg-primary-foreground rounded-lg p-1"
              />
              <div>
                <h3 className="text-xl font-bold">Purusharth Classes</h3>
                <p className="text-sm text-primary-foreground/70">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-6">
              Dedicated to providing quality education for 9th and 10th standard students 
              in Gujarati medium. Building bright futures through conceptual learning and 
              personal attention.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span>© {currentYear} Purusharth Classes</span>
              <span>•</span>
              <span>All Rights Reserved</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  Sakuntala Upvan, Near Bapod Police Station, Waghodia Road, Vadodara
                </span>
              </li>
              <li>
                <a 
                  href="tel:+918200912189"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-sm">+91 82009 12189</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:purusharthclasses@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-sm">purusharthclasses@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-primary-foreground/60">
          ગુણવત્તાયુક્ત શિક્ષણ • Quality Education
        </div>
      </div>
    </footer>
  );
};

export default Footer;
