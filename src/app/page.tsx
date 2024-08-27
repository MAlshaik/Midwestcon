import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Landing } from "@/components/main/landing";
import ImageClassifier from "@/components/ui/imageClassifier";  // Ensure the correct path

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName = user?.user_metadata.full_name || user?.email;

  console.log(JSON.stringify(user, null, 2));

  return (
    <>
      <Landing userName={userName} />
      <ImageClassifier />
    </>
  );
}
