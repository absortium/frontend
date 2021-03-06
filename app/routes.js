// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { Redirect } from "react-router";
const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    
    return [
        {
            path: '/exchange/:from_currency-:to_currency',
            name: 'exchange',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/ExchangePage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }
    ];
}
