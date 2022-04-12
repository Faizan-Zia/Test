import React from 'react';
import { useDependencyHook } from './useDependency';

export const User = () => {
  // Our first usage of useDependencyHook to fetch user prop
  const { user } = useDependencyHook('user');

  return (
    <header>
      <h1>Welcome</h1>
      {user && <p>{user.name}</p>}
    </header>
  );
};
