import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Upload, 
  Pin, 
  PinOff, 
  Trash2, 
  Plus,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

interface Result {
  id: string;
  title: string;
  imageUrl: string;
  isPinned: boolean;
  createdAt: Date;
  storagePath?: string;
}

const AdminDashboard = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin-login");
        return;
      }
      fetchResults();
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchResults = async () => {
    try {
      const resultsQuery = query(
        collection(db, "results"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(resultsQuery);
      const resultsData: Result[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        imageUrl: doc.data().imageUrl,
        isPinned: doc.data().isPinned || false,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        storagePath: doc.data().storagePath,
      }));
      setResults(resultsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load results",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        toast({
          title: "Invalid File Type",
          description: "Only JPEG and PNG images are allowed",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newTitle.trim()) {
      toast({
        title: "Error",
        description: "Please select an image and enter a title",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const extension = selectedFile.name.split('.').pop();
      const storagePath = `results/${uniqueId}.${extension}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "results"), {
        title: newTitle.trim(),
        imageUrl,
        storagePath,
        isPinned: false,
        createdAt: Timestamp.now(),
      });

      toast({
        title: "Success",
        description: "Result uploaded successfully",
      });

      // Add to local state
      setResults([
        {
          id: docRef.id,
          title: newTitle.trim(),
          imageUrl,
          isPinned: false,
          createdAt: new Date(),
          storagePath,
        },
        ...results,
      ]);

      // Reset form
      setNewTitle("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload result",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTogglePin = async (resultId: string, currentlyPinned: boolean) => {
    const pinnedCount = results.filter(r => r.isPinned).length;
    
    if (!currentlyPinned && pinnedCount >= 4) {
      toast({
        title: "Limit Reached",
        description: "You can only pin up to 4 results. Unpin one to pin another.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultRef = doc(db, "results", resultId);
      await updateDoc(resultRef, { isPinned: !currentlyPinned });

      setResults(results.map(r => 
        r.id === resultId ? { ...r, isPinned: !currentlyPinned } : r
      ));

      toast({
        title: "Success",
        description: currentlyPinned ? "Result unpinned" : "Result pinned to main page",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pin status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (resultId: string) => {
    if (!confirm("Are you sure you want to delete this result?")) {
      return;
    }

    try {
      const result = results.find(r => r.id === resultId);
      
      // Delete from Storage if storagePath exists
      if (result?.storagePath) {
        const storageRef = ref(storage, result.storagePath);
        await deleteObject(storageRef).catch(() => {
          // Ignore storage deletion errors (file might not exist)
        });
      }

      // Delete from Firestore
      await deleteDoc(doc(db, "results", resultId));

      setResults(results.filter(r => r.id !== resultId));

      toast({
        title: "Success",
        description: "Result deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete result",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const pinnedCount = results.filter(r => r.isPinned).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Purusharth Class</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Results Management</h2>
              <p className="text-muted-foreground">
                {results.length} total results • {pinnedCount}/4 pinned to main page
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Result
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Result</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-6 mt-4">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Result Image (JPEG/PNG only)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {previewUrl ? (
                        <div className="space-y-4">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-h-48 mx-auto rounded-lg object-contain"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload image
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title / Caption</Label>
                    <Input
                      id="title"
                      placeholder="e.g., ધોરણ ૧૦ બોર્ડ પરીક્ષા 2024"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload Result
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Results Grid */}
          {results.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Results Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by uploading your first result image
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Result
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((result) => (
                <div 
                  key={result.id} 
                  className={`bg-card rounded-xl border overflow-hidden transition-all ${
                    result.isPinned ? "border-accent ring-2 ring-accent/20" : "border-border"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40 bg-muted">
                    <img
                      src={result.imageUrl}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    {result.isPinned && (
                      <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
                        Pinned
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-3">
                      {result.title}
                    </h3>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant={result.isPinned ? "default" : "outline"}
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleTogglePin(result.id, result.isPinned)}
                      >
                        {result.isPinned ? (
                          <>
                            <PinOff className="h-3 w-3" />
                            Unpin
                          </>
                        ) : (
                          <>
                            <Pin className="h-3 w-3" />
                            Pin
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(result.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
