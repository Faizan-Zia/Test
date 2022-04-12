import { useEffect, useState, useContext } from 'react';
import { getDataFromApi } from './getDataFromApi';
import { DependencyProviderContext } from './DependencyProvider';

// This is where we define the actual logic in a custom hook
export const useDependencyHook = content => {
  const { dependencies, options } = useContext(DependencyProviderContext);
  const { store } = options;
  // This flag is required for setting correct action creator and for useEffect hook dependencies
  const isStoreSet = typeof store !== 'undefined';
  /**
   * We maintain the props state in this pattern
   * { user: null } or { user: { USER_DATA } }
   */
  let [props, setProps] = useState({
    [content]: null
  });
  if (isStoreSet) {
    props = store.getState();
    setProps = store.dispatch;
  }

  // Returns the resolver function for current `content`
  // It is set to getDataFromApi always for our case
  const getResolver = strategy => {
    switch (strategy) {
      case 'fetch':
        return getDataFromApi;
      case 'cache':
        // TO DO
        return () => {};
      default:
        return getDataFromApi;
    }
  };

  useEffect(() => {
    const dependency = dependencies.filter(d => d.content === content)[0];
    // Check if the requested `content` is registered in dependencies config
    if (!dependency) {
      throw new Error(`Did you forget to register dependency for ${content}?`);
    }

    const { strategy, store: storeOptions } = dependency;
    if (strategy && strategy !== 'fetch') {
      // Nothing to do if strategy is not set to fetch
      return;
    }

    // A helper to set the data in React state
    // Note the shape of prop state mentioned above
    const setPropsData = data => {
      const actionCreator = isStoreSet
        ? storeOptions.actionCreator
        : data => ({
            [content]: data
          });
      setProps(actionCreator(data));
    };

    // Get the resolver function
    const resolver = getResolver(strategy);

    // Run the resolver to receive response
    const response = resolver(content);

    // Process a `Promise` if needed
    if (typeof response.then === 'function') {
      response.then(data => {
        // Set the props state once resolved
        setPropsData(data);
      });
    } else {
      // If response is not a Promise, simply set the props state
      // Later we will see how it can be useful
      setPropsData(response);
    }
  }, [content, dependencies, isStoreSet]);

  // Output of useDependencyHook hook is the prop state for requested `content`
  return { [content]: props[content] };
};
