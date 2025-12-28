import { Target, BookOpen, Users, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide quality education that builds strong foundations for students, focusing on conceptual understanding and practical application.",
    },
    {
      icon: BookOpen,
      title: "Teaching Philosophy",
      description: "We believe in discipline, dedication, and conceptual clarity. Our approach ensures every student understands and excels.",
    },
    {
      icon: Users,
      title: "Personal Attention",
      description: "With small batch sizes, we ensure each student receives individual attention and guidance tailored to their learning pace.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Year after year, our students achieve exceptional results in board examinations, a testament to our teaching methodology.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            અમારા વિશે
          </h2>
          <p className="text-lg text-muted-foreground">
            પુરુષાર્થ ક્લાસીસ 9મા અને 10મા ધોરણના વિદ્યાર્થીઓ માટે ગુજરાતી માધ્યમમાં શ્રેષ્ઠ શિક્ષણ પ્રદાન કરે છે।
            With years of experience, we have helped thousands of students achieve their academic goals.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {values.map((item, index) => (
            <div 
              key={index}
              className="group p-6 md:p-8 bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <item.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "1000+", label: "Students Taught" },
            { value: "95%+", label: "Pass Rate" },
            { value: "50+", label: "Toppers" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
