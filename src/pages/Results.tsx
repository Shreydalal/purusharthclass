import { Helmet } from "react-helmet-async";
import { ArrowLeft, Award, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useResults } from "@/hooks/useResults";
import { X } from "lucide-react";

const Results = () => {
  const { results, isLoading, error } = useResults();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <>
      <Helmet>
        <title>Results | Purusharth Class - Our Achievements</title>
        <meta 
          name="description" 
          content="View the outstanding board exam results and achievements of Purusharth Class students. 95%+ pass rate with consistent toppers every year." 
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading results...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Results</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Results Yet</h3>
              <p className="text-muted-foreground">Check back soon for our latest achievements!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {results.map((result) => (
                <div 
                  key={result.id}
                  onClick={() => setSelectedImage({
                    url: result.imageUrl,
                    title: result.title
                  })}
                  className="group bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-border cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img 
                      src={result.imageUrl}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
          )}

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
            © {new Date().getFullYear()} Purusharth Class. All Rights Reserved.
          </p>
        </footer>
      </div>

      {/* Image Popup Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background border-border">
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 hover:bg-background transition-colors">
            <X className="h-5 w-5" />
          </DialogClose>
          {selectedImage && (
            <div className="flex flex-col">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full max-h-[80vh] object-contain" 
              />
              <div className="p-4 border-t border-border">
                <h3 className="font-semibold text-foreground text-lg">{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Results;
