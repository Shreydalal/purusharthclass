import { Helmet } from "react-helmet-async";
import { ArrowLeft, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// This page would fetch results from a backend API
// For now, showing placeholder structure
const allResults = [
  {
    id: 1,
    title: "Board Results 2024 – 100% Pass",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "Toppers 2024 – A1 Grade Students",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    year: "2024",
  },
  {
    id: 3,
    title: "Board Results 2023 – Outstanding Performance",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    year: "2023",
  },
  {
    id: 4,
    title: "Toppers 2023 – District Rank Holders",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    year: "2023",
  },
  {
    id: 5,
    title: "Board Results 2022 – Excellent Results",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    year: "2022",
  },
  {
    id: 6,
    title: "Achievement 2022 – State Level Recognition",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    year: "2022",
  },
];

const Results = () => {
  return (
    <>
      <Helmet>
        <title>Results | Purusharth Classes - Our Achievements</title>
        <meta 
          name="description" 
          content="View the outstanding board exam results and achievements of Purusharth Classes students. 95%+ pass rate with consistent toppers every year." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="heroOutline" size="sm" className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Results
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              A showcase of our students' achievements and board exam results over the years.
            </p>
          </div>
        </header>

        {/* Results Grid */}
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allResults.map((result) => (
              <div 
                key={result.id}
                className="group bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-border"
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={result.imageUrl}
                    alt={result.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                      {result.year}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <Award className="h-5 w-5 text-accent" />
                      <span className="font-medium">Achievement</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {result.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Results are updated annually. For more information, please contact us.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-muted py-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Purusharth Classes. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Results;
