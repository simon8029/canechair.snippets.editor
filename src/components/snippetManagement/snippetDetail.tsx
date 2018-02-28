import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import ISnippetLanguageAction from 'actions/interfaces/ISnippetLanguageAction';
import * as SnippetLanguageActions from 'actions/SnippetLanguageActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import CCTextField from 'components/CommonComponent/CCTextField';
import * as toastr from 'toastr';
const UUID = require('uuid/v4');
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SnippetDetail extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: StateToPropsType) {
    super(props as any);
    this.state = {
      currentSnippet: this.props.currentSnippet,
      errors: [],
      isNewSnippet: this.props.isNewSnippet,
      isFormSaving: false,
      textFields: {
        id: (this.props.currentSnippet.id !== undefined) ? this.props.currentSnippet.id : '',
        SnippetName: (this.props.currentSnippet.SnippetName !== undefined) ? this.props.currentSnippet.SnippetName : '',
        SnippetDescription: (this.props.currentSnippet.SnippetDescription !== undefined) ? this.props.currentSnippet.SnippetDescription : ''
      },
      textFieldsErrors: {},
      SnippetBody: this.props.SnippetBody,
      SnippetLanguageArray: this.props.SnippetLanguageArray,
      CurrentSnippetLanguage: this.props.CurrentSnippetLanguage
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push(`/SnippetLanguage/${this.state.CurrentSnippetLanguage.id}`); }} value={'<= Go Back'} />
            <input
              type="submit"
              className="btn btn-outline-success btn-sm mx-1 float-right"
              value={this.state.isNewSnippet ? 'Add' : 'Update'}
            />
          </div>
          <h4 className="my-3">Customer Profession</h4>
          <div className="">
            <div className="form-row">
              <div className="col">
                <CCTextField
                  fieldName="id"
                  label="profession ID"
                  value={this.state.textFields.id}
                  onChange={this.onTextFieldChange}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetName"
                  label="profession Name"
                  value={this.state.textFields.SnippetName}
                  isRequired={true}
                  isRequiredErrorMessage="Snippet Name is required...."
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length > 2 ? false : 'Snippet name cannot less than 3 letters.'}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetDescription"
                  label="Description"
                  value={this.state.textFields.SnippetDescription}
                  isRequired={false}
                  isRequiredErrorMessage=""
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length < 300 ? false : 'Description should less than 300 characters.'}
                />
              </div>
              <div className="col">
                <Select
                  name="ddlSnippetLanguage"
                  value={this.state.CurrentSnippetLanguage}
                  onChange={this.onDDLSnippetLanguageChange}
                  options={getOptionsForDDLSnippetLanguage(this.props.SnippetLanguageArray)}
                />
              </div>
            </div>
          </div>
          <hr />
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            width="100%"
            onChange={this.onSnippetBodyEditorContentChange}
            name="TemplateEditor"
            value={this.state.SnippetBody}
            highlightActiveLine={false}
            editorProps={{ $blockScrolling: true }}
          />
        </form>
      </div>
    );
  }

  componentWillMount() {
    // Store.dispatch(SnippetActions.getAllSnippets());
  }

  componentDidMount() {
    if (this.state.SnippetLanguageArray.length === 0) {
      this.props.actions.getAllSnippetLanguage();
    }
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    // Set current selected Snippet to state
    if (nextProps.currentSnippet !== undefined) {
      this.setState({
        currentSnippet: Object.assign({}, nextProps.currentSnippet),
        textFields: {
          id: nextProps.currentSnippet.id ? nextProps.currentSnippet.id : '',
          SnippetName: nextProps.currentSnippet.SnippetName ? nextProps.currentSnippet.SnippetName : '',
          SnippetDescription: nextProps.currentSnippet.SnippetDescription ? nextProps.currentSnippet.SnippetDescription : ''
        },
        SnippetBody: nextProps.currentSnippet.SnippetBody,
        CurrentSnippetLanguage: nextProps.CurrentSnippetLanguage
      });
    }
  }

  componentDidUpdate() {
    //

  }

  onDDLSnippetLanguageChange = (selectedOption: any) => {
    this.setState({ CurrentSnippetLanguage: selectedOption.value });
  }

  onSnippetBodyEditorContentChange = (content: string) => {
    this.setState({ SnippetBody: content });
  }

  onTextFieldChange = (fieldName: string, value: string, error: string | boolean) => {
    const textFields = this.state.textFields;
    const textFieldsErrors = this.state.textFieldsErrors;

    textFields[fieldName] = value;
    textFieldsErrors[fieldName] = error;

    this.setState({ textFields, textFieldsErrors });
  }

  onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Snippet: SnippetModel = new SnippetModel();
    Snippet.id = this.state.textFields.id ? this.state.textFields.id : UUID();
    Snippet.SnippetName = this.state.textFields.SnippetName;
    Snippet.SnippetDescription = this.state.textFields.SnippetDescription;
    Snippet.SnippetBody = this.state.SnippetBody;

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ isFormSaving: true });

    let newSnippetLanguage = Object.assign({}, this.state.CurrentSnippetLanguage);

    if (this.state.isNewSnippet) {
      newSnippetLanguage.Snippets.push(Snippet);
      this.props.actions.updateSnippetLanguage(newSnippetLanguage)
        .then((res: any) => {
          this.redirectToSnippetsComponent();
          toastr.success('New Snippet Added.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      Object.assign(newSnippetLanguage.Snippets.filter(s => s.id === this.state.currentSnippet.id)[0], Snippet);
      this.props.actions.updateSnippetLanguage(newSnippetLanguage)
        .then(() => {
          this.setState({ CurrentSnippetLanguage: newSnippetLanguage });
          toastr.success('Snippet updated.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    }
  }

  redirectToSnippetsComponent() {
    this.setState({ isFormSaving: false });
    this.props.history.push(`/SnippetLanguage/${this.state.CurrentSnippetLanguage.id}`);
  }

  catchError(error: string) {
    this.setState({ isFormSaving: false });
    toastr.error(error);
  }

  isFormValid() {
    const textFields = this.state.textFields;
    const textFieldsErrors = this.state.textFieldsErrors;
    const errorMessages = Object.keys(textFieldsErrors).filter((k) => textFieldsErrors[k]);

    if (!textFields.SnippetName) {
      return false;
    }

    if (errorMessages.length) {
      return false;
    }

    return true;
  }
}

function getSnippetById(SnippetLanguages: SnippetLanguageModel[], SnippetLanguageId: string, SnippetId: string) {
  const Snippet = SnippetLanguages
    .filter((sl: SnippetLanguageModel) => sl.id === SnippetLanguageId)[0]
    .Snippets.filter((s: SnippetModel) => s.id === SnippetId);
  if (Snippet) { return Snippet[0]; }
  return new SnippetModel();
}

function getOptionsForDDLSnippetLanguage(snippetLanguages: SnippetLanguageModel[]) {
  return snippetLanguages.map(l => {
    return { label: l.SnippetLanguageName, value: l.SnippetLanguageName };
  });
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetLanguageId = ownProps.match.params.SnippetLanguageId;
  const SnippetId = ownProps.match.params.SnippetId;
  let isNewSnippet = SnippetId === undefined;
  let currentSnippet = new SnippetModel();
  let currentSnippetLanguage = ownProps.location.state.currentSnippetLanguage;
  let snippetBody = '';

  if (SnippetId && storeState.SnippetLanguageArray.length > 0) {
    currentSnippet = getSnippetById(storeState.SnippetLanguageArray, SnippetLanguageId, SnippetId);
    isNewSnippet = false;
    snippetBody = currentSnippet.SnippetBody;
    currentSnippetLanguage = currentSnippetLanguage;

  }

  return {
    SnippetLanguageArray: storeState.SnippetLanguageArray,
    currentSnippet: currentSnippet,
    isNewSnippet: isNewSnippet,
    SnippetBody: snippetBody,
    CurrentSnippetLanguage: currentSnippetLanguage
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetLanguageAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetLanguageActions, dispatch)
  };
}

type ThisStateType = {
  SnippetLanguageArray: SnippetLanguageModel[];
  currentSnippet: SnippetModel;
  errors: string[],
  isNewSnippet: boolean,
  isFormSaving: boolean;
  textFields: {
    id: string;
    SnippetName: string;
    SnippetDescription: string;
  },
  textFieldsErrors: {},
  SnippetBody: string,
  CurrentSnippetLanguage: SnippetLanguageModel
};

type StateToPropsType = {
  SnippetLanguageArray: SnippetLanguageModel[];
  CurrentSnippetLanguage: SnippetLanguageModel
  currentSnippet: SnippetModel;
  errors?: Object;
  isNewSnippet: boolean;
  isFormSaving?: boolean;
  SnippetBody: string;
};

type DispatchToPropsType = {
  actions: typeof SnippetLanguageActions;
};

type RCProps = RouteComponentProps<{ SnippetLanguageId: string, SnippetId: string }>;

type OwnProps = {
  currentSnippetLanguage: SnippetLanguageModel;
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetDetail));
