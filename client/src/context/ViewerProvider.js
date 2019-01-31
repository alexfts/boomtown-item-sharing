import { Query } from 'react-apollo';
import React, { Fragment } from 'react';

import { VIEWER_QUERY } from '../apollo/queries';

export const ViewerContext = React.createContext();

export const ViewerProvider = ({ children }) => {
  /**
   * @TODO: Create the ViewerContext provider to supply information about
   * the currently logged-in user throughout the application.
   *
   * Replace the <Fragment /> component with an Apollo <Query /> component
   * with a <ViewerContext.Provider /> nested inside that wrap the children.
   */
  console.log('VIEWER CONTEXT', ViewerContext);
  return (
    <Query query={VIEWER_QUERY}>
      {({ data, loading }) => {
        const viewer = data && data.viewer ? data.viewer : null;
        return (
          <ViewerContext.Provider value={{ viewer, loading }}>
            {children}
          </ViewerContext.Provider>
        );
      }}
    </Query>
  );
  //return <Fragment>{children}</Fragment>;
};
