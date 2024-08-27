import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/main/navbar";
import { Landing } from "@/components/main/landing";
import ImageClassifier from "@/components/ui/imageClassifier";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userName = user?.user_metadata.full_name || user?.email;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName={userName} />
      <div className="flex-grow">
        <Landing userName={userName} />
      </div>
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Image Classifier</h2>
          <ImageClassifier />
        </div>
      </div>
    </div>
  );
}
