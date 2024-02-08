import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useIAM } from "./services/IAM";
import { Button } from "react-bootstrap";
import reactLogo from "/assets/react.svg";
import viteLogo from "/assets/vite.svg";

function App() {
  const auth = useAuth();
  const iam = useIAM();

  const [count, setCount] = useState(0);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  const fetchScimMe = async () => {
    try {
      const response = await iam.fetchScimMe();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (auth.isAuthenticated) {
    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Hello, {auth.user?.profile.name}!</h1>
        <div className="card">
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
        <div>
          <Button onClick={() => fetchScimMe()}>
            log openid-configuration to console
          </Button>
        </div>
        <div className="mt-2">
          <Button onClick={() => void auth.removeUser()}>Log out</Button>
        </div>
      </>
    );
  }

  return <Button onClick={() => void auth.signinRedirect()}>Log in</Button>;
}

export default App;
