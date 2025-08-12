## GraphQL

## Comparison of REST vs GraphQL

| Aspect                     | Fetch (REST)                                                                       | GraphQL (with Apollo Client)                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Primary Use**            | Basic HTTP requests to predefined endpoints (e.g., GET /users for a full list).    | Custom queries for specific data shapes (e.g., query { users { id name } } to get only IDs and names). |
| **Setup in React**         | Native; pair with useState and useEffect. No installs needed.                      | Install @apollo/client graphql; configure ApolloProvider in main.jsx.                                  |
| **Code Simplicity**        | More boilerplate: Manual promise chains and state updates.                         | Declarative: useQuery hook handles fetching and states automatically.                                  |
| **State Handling Example** | useState for loading/error/data; e.g., setLoading(true) in useEffect.              | Built-in: const { loading, error, data } = useQuery(GET_USERS);                                        |
| **Data Precision**         | Returns entire endpoint payload; e.g., might include unwanted fields like address. | Client specifies exact fields; e.g., avoid over-fetching by omitting extras.                           |
| **Handling Related Data**  | Multiple fetches needed; e.g., separate calls for /users and /posts.               | Nested in one query; e.g., { user { name posts { title } } }.                                          |
| **Real-Time Support**      | Manual polling or add WebSockets; e.g., setInterval for updates.                   | Native subscriptions; e.g., useSubscription for live post comments.                                    |
| **Error Management**       | Custom .catch(); e.g., setError(err.message).                                      | Detailed error objects; e.g., error.networkError for specifics.                                        |
| **Caching**                | None built-in; add manual logic or libraries like TanStack Query.                  | Automatic with InMemoryCache; e.g., reuse fetched users across components.                             |
| **Authentication**         | Add headers in fetch options; e.g., headers: { Authorization: 'Bearer token' }.    | Integrated via links; e.g., authLink for tokens in every query.                                        |
| **Pros**                   | Simple, lightweight, no dependencies—ideal for quick prototypes.                   | Efficient, flexible, reduces API calls—perfect for complex React UIs.                                  |
| **Cons**                   | Lots of manual code; prone to bugs in state handling.                              | Requires GraphQL backend; initial setup overhead.                                                      |
| **Best React Scenarios**   | Small apps or legacy REST; e.g., fetching static data in a simple form.            | Dynamic apps with real-time needs; e.g., our GitHub repo dashboard example.                            |
| **Performance Tip**        | Can be slow for nested data; optimize with concurrent fetches.                     | Built-in optimizations like batching; watch for query complexity.                                      |

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import "./index.css";

// GitHub API setup
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Replace with your actual token (use environment variables for security!)
  const tokeniii = "<YOUR_GITHUB_TOKEN>";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
```

```jsx
import { useQuery, gql } from "@apollo/client";

// Define the GraphQL query
const GET_REPOS = gql`
  query GetRepos {
    viewer {
      repositories(last: 10) {
        nodes {
          name
          description
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_REPOS);

  if (loading) return <p>Loading your repositories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>My GitHub Repositories</h1>
      <ul>
        {data.viewer.repositories.nodes.map((repo, index) => (
          <li key={index}>
            <strong>{repo.name}</strong>: {repo.description || "No description"}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```
