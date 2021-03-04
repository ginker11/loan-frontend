import {hydraDataProvider as baseHydraDataProvider, fetchHydra as baseFetchHydra, useIntrospection} from "@api-platform/admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import { Route, Redirect } from 'react-router-dom';

const getHeaders = () => localStorage.getItem("token") ? {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  } : {};
  
  const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
  
  const fetchHydra = (url, options = {}) => baseFetchHydra(url, { ...options, 
                                                          headers: getHeaders
                                                      });
  
  const RedirectToLogin = () => {
      const introspect = useIntrospection();
      if (localStorage.getItem("token")) {
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
              localStorage.removeItem("token");
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