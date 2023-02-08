import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Routes

// scroll
import Scroll from "../components/scrollToTop/ScrollToTop";
import riderRoutes from "./routes/riderRoutes";

interface RouteComponentProps {
  title: string;
  component: JSX.Element;
}
function ComponentWithTitleDisplay(props: RouteComponentProps) {
  const { title, component } = props;
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        {component}
      </div>
    </HelmetProvider>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Scroll />
      <Toaster />
      <Routes>
        {riderRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                <ComponentWithTitleDisplay
                  title={route.title}
                  component={<route.component />}
                />
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
