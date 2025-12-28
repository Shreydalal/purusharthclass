import { Award, ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogClose } from "./ui/dialog";
import { useState } from "react";
import result1 from "@/assets/results/result-1.jpg";
import result2 from "@/assets/results/result-2.jpg";
import result3 from "@/assets/results/result-3.jpg";
import result4 from "@/assets/results/result-4.jpg";

// This data will eventually come from a backend API
// For now, using placeholder data structure
const mockResults = [{
  id: 1,
  title: "ધોરણ ૯ પ્રથમ પરીક્ષા પરીક્ષામાં ગણિત વિષયમાં 50/50 ગુણ",
  imageUrl: result1
}, {
  id: 2,
  title: "ધોરણ ૯ - પ્રથમ નંબર વિદ્યાર્થીઓ",
  imageUrl: result2
}, {
  id: 3,
  title: "માર્ચ 2024 બોર્ડ પરિણામ",
  imageUrl: result3
}, {
  id: 4,
  title: "માર્ચ 2025 SSC Board - 100% પરિણામ",
  imageUrl: result4
}];
const ResultsSection = () => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // In production, this would fetch from an API endpoint
  // const { data: results } = useQuery(['results'], fetchResults);
  const results = mockResults;
  const handleViewAll = () => {
    // This would redirect to a backend-managed results page
    // For now, scrolling to show intent
    window.open("/results", "_blank");
  };
  return <section id="results" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">પરિણામ</h2>
          <p className="text-lg text-muted-foreground">
            Our students consistently achieve excellent results in board examinations. 
            Here are some of our proud achievements.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
          {results.map(result => <div key={result.id} onClick={() => setSelectedImage({
          url: result.imageUrl,
          title: result.title
        })} className="group bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-border cursor-pointer">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={result.imageUrl} alt={result.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            </div>)}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="default" size="lg" onClick={handleViewAll} className="gap-2">
            View All Results
            <ExternalLink className="h-4 w-4" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Click to see complete result gallery
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-golden-light/50 border border-accent/20 rounded-2xl p-6 md:p-8 text-center">
            <Award className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">99.5%+ Pass Rate</h3>
            <p className="text-muted-foreground">
              Consistently maintaining excellent pass rates in Board Examinations for over a decade.
            </p>
          </div>
        </div>
      </div>

      {/* Image Popup Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background border-border">
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 hover:bg-background transition-colors">
            <X className="h-5 w-5" />
          </DialogClose>
          {selectedImage && <div className="flex flex-col">
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain" />
              <div className="p-4 border-t border-border">
                <h3 className="font-semibold text-foreground text-lg">{selectedImage.title}</h3>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </section>;
};
export default ResultsSection;