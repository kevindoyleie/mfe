import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from "./App";

// Mount function to start the app
const mount = (el, { onNavigate, defaultHostory, initialPath }) => {
  const history = defaultHostory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = history.location;
      if (pathname !== nextPathName) {
        history.push(nextPathName);
      }
    }
  };
};

// if we are in dev and isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHostory: createBrowserHistory() });
  }
}


// We are running through container
// and we should export the mount function

export { mount };