import React, { Suspense } from "react";
import { createPortal } from "react-dom";
const RemoteApp = React.lazy(() => import("app2/App"));

const observerOptions = {
  root: null,
  threshold: 0.5,
};

const observerCb = (entries, observer) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      // load script only when it's needed
      const script = document.createElement('script')
      script.src = "no-federation-bundle.js"
      document.body.append(script)
    }
  });
};

const footer = document.querySelector("footer");

const observer = new IntersectionObserver(observerCb, observerOptions);

const ObserverComponent = () => {
  React.useEffect(() => {
    observer.observe(footer);

    return () => {
      console.log("cleanup runs")
      observer.unobserve(footer);
    }
  }, []);

  return <></>
}

const App = () => {
  const [ observerEnabled, setObserverEnabled ] = React.useState(false)

  return (
    <div>
      <button onClick={() => setObserverEnabled(!observerEnabled)}>
        {observerEnabled ? "disable" : "enable"} observer
      </button>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>App1</h1>
      </div>
      {observerEnabled && <ObserverComponent/>}
      {createPortal(
        <Suspense fallback={"loading..."}>
          <RemoteApp />
        </Suspense>,
        document.getElementById("test")
      )}
    </div>
  );
};

export default App;
