import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Button } from "react-bootstrap";
import reactLogo from "/assets/react.svg";
import viteLogo from "/assets/vite.svg";
import { Page } from "../../components";

export const Home = () => {
  const auth = useAuth();
  const [count, setCount] = useState(0);
  return (
    <Page id="home">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="mb-auto infn-title">Hello, {auth.user?.profile.name}!</h1>
      <div className="mx-auto" style={{ marginTop: "120px" }}>
        <div>
          <div className="card mx-auto">
            <Button onClick={() => setCount(count => count + 1)}>
              count is {count}
            </Button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </Page>
  );
};
