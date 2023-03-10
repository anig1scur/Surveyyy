import { FC } from 'react';
import './style.scss'
import { Admin, Resource, CustomRoutes } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Route } from 'react-router-dom';
import { fetchUtils } from 'ra-core';

import CustomRouteNoLayout from './customRouteNoLayout';
import Layout from './Layout';
import surveys from './surveys';
import collections from './collections';
import simpleRestProvider from 'ra-data-simple-rest';

export type Props = {};

const SurveyAdmin: FC<Props> = () => (
  <Admin
    basename='/admin'
    dataProvider={simpleRestProvider('https://surveyyy.vercel.app/api', fetchUtils.fetchJson, 'X-Total-Count')}
    title='Surveyyy'
    layout={Layout}>
    <Resource
      name='surveys'
      {...surveys}
    />
    <Resource
      name='collections'
      {...collections}
    />
    {(permissions) => (
      <>
        {permissions ? null : null}
        <CustomRoutes noLayout>
          <Route
            path='/custom1'
            element={<CustomRouteNoLayout title='Posts from /custom1' />}
          />
        </CustomRoutes>
      </>
    )}
  </Admin>
);

export default SurveyAdmin;
