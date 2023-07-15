import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { gql, useQuery } from "urql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const query = gql`
  query {
    hello
  }
`;

const Planet = () => {
  const [result] = useQuery({
    query: query,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return <p>{data.hello}</p>;
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider value={client}>
        <div>
          <a href="https://vitejs.dev">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Planet />
      </Provider>
    </>
  );
}

export default App;
