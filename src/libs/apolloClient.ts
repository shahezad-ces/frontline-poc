import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api.escuelajs.co/graphql",
      fetchOptions: { cache: "no-store" }, // ✅ Next.js caching
    }),
    ssrMode: true, // ✅ Important for SSR
  });
});
