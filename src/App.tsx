import './index.scss';
import { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Content from './pages/Intro';
import Result from './pages/Result';
import { SurveyMock } from './common/mock';
import { StoredProvider } from './context';

export type Props = {};

const SurveyWeb = lazy(() => import('./pages/survey'));
const SurveyAdmin = lazy(() => import('./pages/admin'));

const App: FC<Props> = () => (
  <div>
    <div>
      <Routes>
        <Route
          path='/'
          element={<Content />}
        />
        <Route
          path='app'
          element={
            <StoredProvider>
              <SurveyWeb survey={SurveyMock} />
            </StoredProvider>
          }>
          <Route
            path=':id'
            element={<SurveyWeb survey={SurveyMock} />}
          />
          <Route
            path='*'
            element={<SurveyWeb survey={SurveyMock} />}
          />
        </Route>
        <Route
          path='/result'
          element={<Result />}
        />
          <Route
          path='/admin/*'
          element={<SurveyAdmin />}
        />
      </Routes>
    </div>
  </div>
);

export default App;
