import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);
