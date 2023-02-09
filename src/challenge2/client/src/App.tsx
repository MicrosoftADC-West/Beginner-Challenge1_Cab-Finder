import Router from "./router/Router";

// loading component
import PageLoading from "./components/pageLoading/PageLoading";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Router />
      </div>
    </div>
  );
}

export default App;
