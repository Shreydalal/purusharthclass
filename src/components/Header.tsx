import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.jpg";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    name: "Home",
    href: "#home"
  }, {
    name: "About Us",
    href: "#about"
  }, {
    name: "Courses",
    href: "#courses"
  }, {
    name: "Results",
    href: "#results"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Purusharth Class Logo" className="h-12 md:h-14 w-auto object-contain mix-blend-multiply" />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-primary leading-tight">Purusharth Class</h1>
              <p className="text-xs text-muted-foreground">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.href)} className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200">
                {link.name}
              </button>)}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+919876543210">
              <Button variant="default" size="default" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.href)} className="w-full text-left px-4 py-3 text-foreground/80 hover:text-primary hover:bg-muted rounded-md font-medium transition-colors duration-200">
                  {link.name}
                </button>)}
              <a href="tel:+919876543210" className="mt-2 px-4">
                <Button variant="default" size="lg" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;