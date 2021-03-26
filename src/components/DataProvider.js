import {hydraDataProvider as baseHydraDataProvider, fetchHydra as baseFetchHydra, useIntrospection} from "@api-platform/admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, getToken, logout } from './authProvider';

const getHeaders = () => isLoggedIn() ? {
    Authorization: `Bearer ${getToken()}`
  } : {};

  const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
  
  const fetchHydra = (url, options = {}) => baseFetchHydra(url, { ...options, 
                                                          headers: getHeaders
                                                      });
  
  const RedirectToLogin = () => {
      const introspect = useIntrospection();
      if (isLoggedIn()) {
          introspect();
          return <></>;
      }
      return <Redirect to="/login" />;
  };
  
  const apiDocumentationParser = async (entrypoint) => {
      try {
          const { api } = await parseHydraDocumentation(entrypoint, {
              headers: getHeaders
          });
          return { api };
      } catch (result) {
          if (result.status === 401) {
              // Prevent infinite loop if the token is expired
              logout();
              return {
                  api: result.api,
                  customRoutes: [
                      <Route path="/" component={RedirectToLogin} />
                  ],
              };
          }
          throw result;
      }
  };
  
  export default baseHydraDataProvider(entrypoint, fetchHydra, apiDocumentationParser, true);