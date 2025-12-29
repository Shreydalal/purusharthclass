import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    studentClass: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Sakuntala Upvan, Near Bapod Police Station, Wagodhia Road, Vadodara",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 82009 12189",
      link: "tel:+918200912189",
    },
    {
      icon: Mail,
      title: "Email",
      content: "purusharthclasses@gmail.com",
      link: "mailto:purusharthclasses@gmail.com",
    },
    {
      icon: Clock,
      title: "Timings",
      content: "Mon - Sat: 7:00 AM - 8:00 PM",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted!",
      description: "We will contact you soon.",
    });
    setFormData({ name: "", phone: "", studentClass: "", message: "" });
  };

  const whatsappNumber = "918200912189";
  const whatsappMessage = encodeURIComponent("Hello! I want to enquire about admission in Purusharth Class.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            સંપર્ક કરો
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions about admissions or courses? Reach out to us and we'll be happy to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Map */}
          <div>
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card p-5 rounded-xl border border-border shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-muted-foreground text-sm hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block mb-8">
              <Button variant="whatsapp" size="lg" className="w-full gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-border shadow-card h-64 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.123!2d73.2089!3d22.3217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf5dc00a52e5%3A0x6f3c3b9f1a2b3c4d!2sSakuntala%20Upvan%2C%20Waghodia%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Purusharth Class Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Send an Enquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Student Name / વિદ્યાર્થીનું નામ
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number / ફોન નંબર
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium text-foreground mb-2">
                  Class / ધોરણ
                </label>
                <select
                  id="class"
                  value={formData.studentClass}
                  onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select Class</option>
                  <option value="9th">9th Standard (ધોરણ 9)</option>
                  <option value="10th">10th Standard (ધોરણ 10)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message / સંદેશ (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Any specific query or message..."
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
