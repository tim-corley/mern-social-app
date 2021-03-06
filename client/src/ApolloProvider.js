import React from "react";
import App from "./App";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";

// https://www.apollographql.com/docs/react/api/link/apollo-link-context/
// https://www.apollographql.com/docs/react/networking/authentication/

const httpLink = createHttpLink({
  uri: "http://localhost:5000/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          comments: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Query: {
        fields: {
          getPosts: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
