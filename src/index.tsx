import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Store, { history } from 'store/store';
import App from 'components/App';
// import SnippetMain from 'components/snippetManagement/snippetMain';
import SnippetDetail from 'components/snippetManagement/snippetDetail';
import SnippetLanguageMain from 'components/snippetLanguageManagement/snippetLanguageMain';
import SnippetLanguageDetail from 'components/snippetLanguageManagement/snippetLanguageDetail';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/snippets" component={SnippetMain} />
        <Route exact path="/snippet" component={SnippetDetail} />
        <Route exact path="/snippet/:SnippetId" component={SnippetDetail} /> */}
        <Route exact path="/snippetLanguages" component={SnippetLanguageMain} />
        <Route exact path="/snippetLanguage" component={SnippetLanguageDetail} />
        <Route exact path="/snippetLanguage/:SnippetLanguageId" component={SnippetLanguageDetail} />
        <Route exact path="/snippetLanguage/:SnippetLanguageId/snippet" component={SnippetDetail} />
        <Route exact path="/snippetLanguage/:SnippetLanguageId/snippet/:SnippetId" component={SnippetDetail} />
      </Switch>
    </ConnectedRouter >
  </Provider>,
  document.getElementById('root') as HTMLElement
);
