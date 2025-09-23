import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.escuelajs.co/graphql" }),
  cache: new InMemoryCache(),
});

export default client;

type GraphQLRequestOptions = {
  query: string;
  variables?: Record<string, any>;
  headers?: HeadersInit;
};

export async function fetchGraphQL<T>({
  query,
  variables = {},
  headers = {},
}: GraphQLRequestOptions): Promise<T> {
  const response = await fetch("https://api.escuelajs.co/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HTTP Error:", response.status, errorText);
    throw new Error(`HTTP error ${response.status}`);
  }

  let result;
  try {
    result = await response.json();
  } catch (err) {
    const rawText = await response.text();
    console.error("Failed to parse JSON:", rawText);
    throw new Error("Invalid JSON response");
  }

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error("GraphQL query failed");
  }

  return result.data;
}
