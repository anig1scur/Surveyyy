/* eslint react/jsx-key: off */
import React, { FC } from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Route } from 'react-router-dom';

import authProvider from './authProvider';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import Layout from './Layout';
import posts from './posts';

export type Props = {};

const SurveyAdmin: FC<Props> = () => (
  <Admin
    basename='/admin'
    authProvider={authProvider}
    dataProvider={dataProvider}
    title='Example Admin'
    layout={Layout}>
    <CustomRoutes noLayout>
      <Route
        path='/custom'
        element={<CustomRouteNoLayout title='Posts from /custom' />}
      />
    </CustomRoutes>
    <Resource
      name='posts'
      {...posts}
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
