import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Store, { history } from 'store/store';
import App from './components/App';
// import SchemaMain from 'components/SchemaManagement/SchemaMain';
// import SchemaDetail from 'components/SchemaManagement/SchemaDetail';
// import TableDetail from 'components/TableManagement/TableDetail';
// import PropertyDetail from 'components/PropertyManagement/PropertyDetail';
// import TemplateManagementMain from 'components/TemplateManagement/TemplateManagementMain';
import 'styles/index.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/schemas" component={SchemaMain} />
        <Route exact path="/schema" component={SchemaDetail} />
        <Route exact path="/schema/:schemaId" component={SchemaDetail} />
        <Route exact path="/schema/:schemaId/table" component={TableDetail} />
        <Route exact path="/schema/:schemaId/table/:tableId" component={TableDetail} />
        <Route exact path="/schema/:schemaId/table/:tableId/property" component={PropertyDetail} />
        <Route exact path="/schema/:schemaId/table/:tableId/property/:propertyId" component={PropertyDetail} /> */}
        {/* <Route exact path="/template" component={TemplateManagementMain} /> */}
      </Switch>
    </ConnectedRouter >
  </Provider>,
  document.getElementById('root') as HTMLElement
);
