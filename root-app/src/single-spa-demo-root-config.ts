import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { InputRoutesConfigObject } from "single-spa-layout/dist/types/isomorphic/constructRoutes";
// import microfrontendLayout from "./microfrontend-layout.html";

const JSON_LAYOUT: InputRoutesConfigObject = {
  containerEl: '#wrapper',
  base: '/',
  "routes": [
    {
      "type": "route",
      default: true,
      "routes": [
        {
          "type": "h1", "routes": [{
            "type": "#text",
            "value": "learn-single-spa : Root Application"
          }]
        }
      ]
    }
  ]
};

const routes = constructRoutes(JSON_LAYOUT);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });


// To register navigation application, 
// which will be shown in each page.
registerApplication({
  name: 'navigation-application',
  app: () => System.import('@mfe/navigation'),
  activeWhen: '/',
})

applications.forEach(registerApplication);
layoutEngine.activate();
start();
