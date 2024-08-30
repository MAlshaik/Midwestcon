
import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/main/navbar";
import { Landing } from "@/components/main/landing";
import ImageClassifier from "@/components/ui/imageClassifier";
import { createClient as createUrqlClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import ExampleComponent from '@/components/main/ExampleComponent';

const urqlClient = createUrqlClient({
  url: 'https://gateway.thegraph.com/api/e02108768a4c298311ca08881973b9db/subgraphs/id/BMnKqdKs9NaXbn8VzvJmiMzUo4ogQeFw9UxnispGD11i',
  exchanges: [cacheExchange, fetchExchange],
});

const DATA_QUERY = gql`
{
  valueChangeds(first: 5) {
    id
    newValue
    blockNumber
    blockTimestamp
  }
}`;

export default async function Home() {
  // Supabase user authentication
  const supabase = createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userName = user?.user_metadata.full_name || user?.email;

  // GraphQL data fetching
  const result = await urqlClient.query(DATA_QUERY).toPromise();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName={userName} />
      <div className="flex-grow">
        <Landing userName={userName} />
        {result.error ? (
          <div>
            <p>Error: {result.error.message}</p>
          </div>
        ) : (
          <ExampleComponent data={result.data} />
        )}
      </div>
    </div>
  );
}


//original with no subgraph integration
// import { createClient } from "@/utils/supabase/server";
// import { Navbar } from "@/components/main/navbar";
// import { Landing } from "@/components/main/landing";
// import ImageClassifier from "@/components/ui/imageClassifier";

// export default async function Home() {
//   const supabase = createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   const userName = user?.user_metadata.full_name || user?.email;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar userName={userName} />
//       <div className="flex-grow">
//         <Landing userName={userName} />
//       </div>
//     </div>
//   );
// }
