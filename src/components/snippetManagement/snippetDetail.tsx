import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import ISnippetGroupAction from 'actions/interfaces/ISnippetGroupAction';
import * as SnippetGroupActions from 'actions/SnippetGroupActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import CCTextField from 'components/CommonComponent/CCTextField';
import * as toastr from 'toastr';
const UUID = require('uuid/v4');
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
        SnippetPrefix: (this.props.currentSnippet.SnippetPrefix !== undefined) ? this.props.currentSnippet.SnippetPrefix : '',
        SnippetDescription: (this.props.currentSnippet.SnippetDescription !== undefined) ? this.props.currentSnippet.SnippetDescription : ''
      },
      textFieldsErrors: {},
      SnippetBody: this.props.SnippetBody,
      SnippetGroupArray: this.props.SnippetGroupArray,
      CurrentSnippetGroup: this.props.CurrentSnippetGroup
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push(`/SnippetGroup/${this.state.CurrentSnippetGroup.id}`); }} value={'<= Go Back'} />
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
                  label="Name"
                  value={this.state.textFields.SnippetName}
                  isRequired={true}
                  isRequiredErrorMessage="Snippet Name is required...."
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length > 2 ? false : 'Snippet name cannot less than 3 letters.'}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetPrefix"
                  label="Prefix"
                  value={this.state.textFields.SnippetPrefix}
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
    if (this.state.SnippetGroupArray.length === 0) {
      this.props.actions.getAllSnippetGroup();
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
          SnippetPrefix: nextProps.currentSnippet.SnippetPrefix ? nextProps.currentSnippet.SnippetPrefix : '',
          SnippetDescription: nextProps.currentSnippet.SnippetDescription ? nextProps.currentSnippet.SnippetDescription : ''
        },
        SnippetBody: nextProps.currentSnippet.SnippetBody,
        CurrentSnippetGroup: nextProps.CurrentSnippetGroup
      });
    }
  }

  componentDidUpdate() {
    //

  }

  onDDLSnippetGroupChange = (selectedOption: any) => {
    this.setState({ CurrentSnippetGroup: selectedOption.value });
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
    Snippet.SnippetPrefix = this.state.textFields.SnippetPrefix;
    Snippet.SnippetDescription = this.state.textFields.SnippetDescription;
    Snippet.SnippetBody = this.state.SnippetBody;

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ isFormSaving: true });

    let newSnippetGroup = Object.assign({}, this.state.CurrentSnippetGroup);

    if (this.state.isNewSnippet) {
      newSnippetGroup.Snippets.push(Snippet);
      this.props.actions.updateSnippetGroup(newSnippetGroup)
        .then((res: any) => {
          this.redirectToSnippetsComponent();
          toastr.success('New Snippet Added.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      Object.assign(newSnippetGroup.Snippets.filter(s => s.id === this.state.currentSnippet.id)[0], Snippet);
      this.props.actions.updateSnippetGroup(newSnippetGroup)
        .then(() => {
          this.setState({ CurrentSnippetGroup: newSnippetGroup });
          toastr.success('Snippet updated.');
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    }
  }

  redirectToSnippetsComponent() {
    this.setState({ isFormSaving: false });
    this.props.history.push(`/SnippetGroup/${this.state.CurrentSnippetGroup.id}`);
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

function getSnippetById(SnippetGroups: SnippetGroupModel[], SnippetGroupId: string, SnippetId: string) {
  const Snippet = SnippetGroups
    .filter((sl: SnippetGroupModel) => sl.id === SnippetGroupId)[0]
    .Snippets.filter((s: SnippetModel) => s.id === SnippetId);
  if (Snippet) { return Snippet[0]; }
  return new SnippetModel();
}

// function getOptionsForDDLSnippetGroup(snippetGroups: SnippetGroupModel[]) {
//   return snippetGroups.map(l => {
//     return { label: l.SnippetGroupName, value: l.SnippetGroupName };
//   });
// }

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetGroupId = ownProps.match.params.SnippetGroupId;
  const SnippetId = ownProps.match.params.SnippetId;
  let isNewSnippet = SnippetId === undefined;
  let currentSnippet = new SnippetModel();
  let currentSnippetGroup = ownProps.location.state.currentSnippetGroup;
  let snippetBody = '';

  if (SnippetId && storeState.SnippetGroupArray.length > 0) {
    currentSnippet = getSnippetById(storeState.SnippetGroupArray, SnippetGroupId, SnippetId);
    isNewSnippet = false;
    snippetBody = currentSnippet.SnippetBody;
    currentSnippetGroup = currentSnippetGroup;
  }

  return {
    SnippetGroupArray: storeState.SnippetGroupArray,
    currentSnippet: currentSnippet,
    isNewSnippet: isNewSnippet,
    SnippetBody: snippetBody,
    CurrentSnippetGroup: currentSnippetGroup
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetGroupAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetGroupActions, dispatch)
  };
}

type ThisStateType = {
  SnippetGroupArray: SnippetGroupModel[];
  currentSnippet: SnippetModel;
  errors: string[],
  isNewSnippet: boolean,
  isFormSaving: boolean;
  textFields: {
    id: string;
    SnippetName: string;
    SnippetDescription: string;
    SnippetPrefix: string;
  },
  textFieldsErrors: {},
  SnippetBody: string,
  CurrentSnippetGroup: SnippetGroupModel
};

type StateToPropsType = {
  SnippetGroupArray: SnippetGroupModel[];
  CurrentSnippetGroup: SnippetGroupModel
  currentSnippet: SnippetModel;
  errors?: Object;
  isNewSnippet: boolean;
  isFormSaving?: boolean;
  SnippetBody: string;
};

type DispatchToPropsType = {
  actions: typeof SnippetGroupActions;
};

type RCProps = RouteComponentProps<{ SnippetGroupId: string, SnippetId: string }>;

type OwnProps = {
  currentSnippetGroup: SnippetGroupModel;
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetDetail));
