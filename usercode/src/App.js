import React, { useReducer } from 'react';
import { DependencyProvider } from './useDependency';
import { User } from './User';
import { StoreContext } from './store';
import { reducer } from './store/reducer';
import { refreshUser } from './store/actions';

// Define dependencies array for the app
const dependencies = [
  {
    content: 'user',
    strategy: 'fetch',
    store: {
      actionCreator: refreshUser
    }
  }
];

const App = () => {
  const [globalState, dispatch] = useReducer(reducer, {});

  // Create config object for DependencyProvider
  const config = {
    options: {
      store: {
        dispatch,
        getState: () => globalState
      }
    },
    dependencies
  };

  return (
    <StoreContext.Provider value={[globalState, dispatch]}>
      <DependencyProvider config={config}>
        {/* Wrap the app with DependencyProvider for `useDependency` to work */}
        <div className="App">
          <User />
        </div>
      </DependencyProvider>
    </StoreContext.Provider>
  );
};

export default App;
