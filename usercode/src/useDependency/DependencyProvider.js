import React from 'react';
import PropTypes from 'prop-types';

// Create Context object for DependencyProvider
export const DependencyProviderContext = React.createContext({});

// DependencyProvider renders the app wrapped in DependencyProviderContext
// DependencyProvider should be included in `App.js`
export const DependencyProvider = ({ children, config }) => {
  return (
    <DependencyProviderContext.Provider value={config}>
      {children}
    </DependencyProviderContext.Provider>
  );
};

DependencyProvider.propTypes = {
  config: PropTypes.shape({
    options: PropTypes.object.isRequired,
    dependencies: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string
      })
    ).isRequired
  }).isRequired
};
