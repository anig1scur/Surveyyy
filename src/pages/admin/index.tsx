/* eslint react/jsx-key: off */
import React, { FC } from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Route } from 'react-router-dom';

import CustomRouteNoLayout from './customRouteNoLayout';
import Layout from './Layout';
import surveys from './surveys';
import simpleRestProvider from 'ra-data-simple-rest';

export type Props = {};

const SurveyAdmin: FC<Props> = () => (
  <Admin
    basename='/admin'
    dataProvider={simpleRestProvider('https://surveyyy.vercel.app/api')}
    title='Example Admin'
    layout={Layout}>
    <CustomRoutes noLayout>
      <Route
        path='/custom'
        element={<CustomRouteNoLayout title='Posts from /custom' />}
      />
    </CustomRoutes>
    <Resource
      name='surveys'
      {...surveys}
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
