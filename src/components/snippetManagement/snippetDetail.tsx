import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import ISnippetAction from 'actions/interfaces/ISnippetAction';
import * as SnippetActions from 'actions/SnippetActions';
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
      SnippetArray: this.props.SnippetArray,
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
      SnippetLanguage: this.props.SnippetLanguage
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push('/Snippets'); }} value={'<= Go Back'} />
            <input
              type="submit"
              className="btn btn-outline-success btn-sm mx-1 float-right"
              value={this.state.isNewSnippet ? 'Add' : 'Update'}
            />
          </div>
          <h4 className="my-3">Snippet</h4>
          <div className="">
            <div className="form-row">
              <div className="col">
                <CCTextField
                  fieldName="id"
                  label="Snippet ID"
                  value={this.state.textFields.id}
                  onChange={this.onTextFieldChange}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetName"
                  label="Snippet Name"
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
                  value={this.state.SnippetLanguage}
                  onChange={this.onDDLSnippetLanguageChange}
                  options={getOptionsForDDLSnippetLanguage(this.props.SnippetLanguages)}
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
    if (this.state.SnippetArray.length === 0) {
      this.props.actions.getAllSnippet();
    }
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    console.log(`nextProps:`);
    console.log(nextProps);
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
        SnippetLanguage: nextProps.currentSnippet.SnippetLanguage
      });
    }
  }

  componentDidUpdate() {
    //

  }

  onDDLSnippetLanguageChange = (selectedOption: any) => {
    this.setState({ SnippetLanguage: selectedOption.value });
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

    if (this.state.isNewSnippet) {
      this.props.actions.addNewSnippet(Snippet)
        .then((res: any) => {
          this.redirectToSnippetsComponent();
          toastr.success('New Snippet Added.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      this.props.actions.updateSnippet(Snippet)
        .then(() => {
          toastr.success('Snippet updated.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    }
  }

  redirectToSnippetsComponent() {
    this.setState({ isFormSaving: false });
    toastr.success(this.state.isNewSnippet ? 'New Snippet added.' : 'Snippet updated.');
    this.props.history.push('/Snippets');
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

function getSnippetById(Snippets: SnippetModel[], SnippetId: string) {
  const Snippet = Snippets.filter((s: SnippetModel) => s.id === SnippetId);
  if (Snippet) { return Snippet[0]; }
  return new SnippetModel();
}

function getOptionsForDDLSnippetLanguage(snippetLanguages: SnippetLanguageModel[]) {
  return snippetLanguages.map(l => {
    return { label: l.SnippetLanguageName, value: l.SnippetLanguageName };
  });
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetId = ownProps.match.params.SnippetId;
  let currentSnippet = new SnippetModel();
  let snippetLanguage = new SnippetLanguageModel();
  let isNewSnippet = SnippetId === undefined;
  let snippetBody = '';

  if (SnippetId && storeState.SnippetArray.length > 0) {
    currentSnippet = getSnippetById(storeState.SnippetArray, SnippetId);
    isNewSnippet = false;
    snippetBody = currentSnippet.SnippetBody;
    snippetLanguage = currentSnippet.SnippetLanguage;

  }

  return {
    SnippetArray: storeState.SnippetArray,
    currentSnippet: currentSnippet,
    isNewSnippet: isNewSnippet,
    SnippetBody: snippetBody,
    SnippetLanguages: storeState.SnippetLanguageArray,
    SnippetLanguage: snippetLanguage
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetActions, dispatch)
  };
}

type ThisStateType = {
  SnippetArray: SnippetModel[];
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
  SnippetLanguage: SnippetLanguageModel
};

type StateToPropsType = {
  SnippetArray: SnippetModel[];
  currentSnippet: SnippetModel;
  errors?: Object;
  isNewSnippet: boolean;
  isFormSaving?: boolean;
  SnippetBody: string;
  SnippetLanguages: SnippetLanguageModel[];
  SnippetLanguage: SnippetLanguageModel
};

type DispatchToPropsType = {
  actions: typeof SnippetActions;
};

type RCProps = RouteComponentProps<{ SnippetId: string }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetDetail));
