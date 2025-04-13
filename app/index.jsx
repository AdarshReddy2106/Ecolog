import React from 'react';
import { Redirect } from 'expo-router';
import { AuthProvider } from './AuthContext';
import { TreeDataProvider } from './TreeDataContext';

export default function Index() {
  return (
    <TreeDataProvider>
      <AuthProvider>
        <Redirect href="/home" />
      </AuthProvider>
    </TreeDataProvider>
  );
}

