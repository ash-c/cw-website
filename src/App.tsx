import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { system } from './theme';
import { Layout } from './components/Layout';

const HomePage = React.lazy(() =>
  import('./pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const ProjectsPage = React.lazy(() =>
  import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
);

export const App = () => {
  return (
    <ChakraProvider value={system}>
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
    </ChakraProvider>
  );
};
