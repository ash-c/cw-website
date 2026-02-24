import React, { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import system from "./theme";
import Layout from "./components/Layout";
import { ColorModeProvider } from "./colorMode";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));

const App = () => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;

