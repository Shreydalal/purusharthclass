import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const CoursesSection = () => {
  const courses = [
    {
      grade: "9th Standard",
      gradeGujarati: "ધોરણ 9",
      medium: "Gujarati Medium",
      subjects: ["Mathematics", "Science", "Social Science", "Gujarati", "English", "Sanskrit"],
      features: [
        "Foundation building for Board exams",
        "Regular tests and assessments",
        "Doubt clearing sessions",
        "Study material included",
      ],
    },
    {
      grade: "10th Standard",
      gradeGujarati: "ધોરણ 10",
      medium: "Gujarati Medium",
      subjects: ["Mathematics", "Science", "Social Science", "Gujarati", "English", "Sanskrit"],
      features: [
        "Board exam focused preparation",
        "Previous year paper practice",
        "Weekly mock tests",
        "One-on-one guidance",
      ],
    },
  ];

  const methodology = [
    {
      icon: BookOpen,
      title: "Conceptual Learning",
      description: "Focus on understanding concepts rather than rote memorization",
    },
    {
      icon: Clock,
      title: "Regular Practice",
      description: "Daily homework and weekly tests to reinforce learning",
    },
    {
      icon: Users,
      title: "Small Batches",
      description: "Limited students per batch for personalized attention",
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Courses
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            અમારા અભ્યાસક્રમો
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive coaching for 9th and 10th standard students in Gujarati medium, 
            designed to help them excel in their board examinations.
          </p>
        </div>

        {/* Courses Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-border"
            >
              {/* Header */}
              <div className="bg-gradient-hero p-6 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-1">{course.grade}</h3>
                <p className="text-xl font-medium opacity-90">{course.gradeGujarati}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary-foreground/20 rounded-full text-sm">
                  {course.medium}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Subjects */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-sky-light text-primary text-sm rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  onClick={scrollToContact}
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Teaching Methodology */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Our Teaching Methodology
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {methodology.map((item, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-golden-light rounded-xl mb-4">
                  <item.icon className="h-7 w-7 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
