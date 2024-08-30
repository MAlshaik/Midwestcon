// // app/ExampleComponent.tsx (Client Component)

// 'use client';

// import React from 'react';
// const ExampleComponent = ({ data }) => {
//   if (!data) {
//     return <p>Loading...</p>;
//   }
//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// };
// export default ExampleComponent;


//just before trying to fix the reduceright error
// 'use client';

// import React, { useState } from 'react';
// import { createClient, gql } from 'urql';

// const client = createClient({
//   url: 'https://gateway.thegraph.com/api/{api-key}/subgraphs/id/BMnKqdKs9NaXbn8VzvJmiMzUo4ogQeFw9UxnispGD11i',
// });

// const DATA_QUERY = gql`
// {
//   valueChangeds(first: 5) {
//     id
//     newValue
//     blockNumber
//     blockTimestamp
//   }
// }`;

// const ExampleComponent = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const result = await client.query(DATA_QUERY).toPromise();
//       if (result.error) {
//         setError(result.error.message);
//       } else {
//         setData(result.data);
//       }
//     } catch (err) {
//       setError(err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <button onClick={fetchData} className="btn-primary">
//         Fetch Data
//       </button>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </div>
//   );
// };

// export default ExampleComponent;


'use client';

import React, { useState } from 'react';
import { createClient, gql, cacheExchange, fetchExchange } from 'urql';

// URQL client setup for GraphQL queries
const client = createClient({
  url: 'https://gateway.thegraph.com/api/e02108768a4c298311ca08881973b9db/subgraphs/id/BMnKqdKs9NaXbn8VzvJmiMzUo4ogQeFw9UxnispGD11i',
  exchanges: [cacheExchange, fetchExchange], // Ensure proper setup of exchanges
});

// GraphQL query definition
const DATA_QUERY = gql`
{
  valueChangeds(first: 5) {
    id
    newValue
    blockNumber
    blockTimestamp
  }
}`;

const ExampleComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await client.query(DATA_QUERY).toPromise();
      if (result.error) {
        setError(result.error.message);
      } else {
        setData(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} className="btn-primary">
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ExampleComponent;
