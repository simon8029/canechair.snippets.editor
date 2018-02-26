import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Store from 'store/store';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import ISnippetAction from 'actions/interfaces/ISnippetAction';
import * as SnippetActions from 'actions/SnippetActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import CCTextField from 'components/CommonComponent/CCTextField';
import * as toastr from 'toastr';
const UUID = require('uuid/v4');

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
      textFieldsErrors: {}
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push('/Snippets'); }} value={'<= Go Back'} />
            <h4 className="my-3">Snippet</h4>
          </div>
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
              <input
                type="submit"
                className="btn btn-outline-success form-control mx-1"
                value={this.state.isNewSnippet ? 'Add' : 'Update'}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  componentWillMount() {
    // Store.dispatch(SnippetActions.getAllSnippets());
  }

  componentDidMount() {
    // if the component is loaded through browser url instead of <Link>, reload all data
    if (this.state.SnippetArray.length === 0) {
      Store.dispatch(SnippetActions.getAllSnippet());
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
        }
      });
    }
    this.setState({ SnippetArray: nextProps.SnippetArray });
  }

  componentDidUpdate() {
    //

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

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ isFormSaving: true });

    if (this.state.isNewSnippet) {
      this.props.actions.addNewSnippet(Snippet)
        .then((res: any) => {
          this.redirectToSnippetsComponent();
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      this.props.actions.updateSnippet(Snippet)
        .then(() => {
          this.redirectToSnippetsComponent();
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

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetId = ownProps.match.params.SnippetId;
  let currentSnippet = new SnippetModel();
  let isNewSnippet = SnippetId === undefined;

  if (SnippetId && storeState.SnippetArray.length > 0) {
    currentSnippet = getSnippetById(storeState.SnippetArray, SnippetId);
    isNewSnippet = false;
  }

  return {
    SnippetArray: storeState.SnippetArray,
    currentSnippet: currentSnippet,
    isNewSnippet: isNewSnippet
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetActions, dispatch)
  };
}

type ThisStateType = {
  SnippetArray: Array<SnippetModel>;
  currentSnippet: SnippetModel;
  errors: string[],
  isNewSnippet: boolean,
  isFormSaving: boolean;
  textFields: {
    id: string;
    SnippetName: string;
    SnippetDescription: string;
  },
  textFieldsErrors: {}
};

type StateToPropsType = {
  SnippetArray: Array<SnippetModel>;
  currentSnippet: SnippetModel;
  errors?: Object;
  isNewSnippet: boolean;
  isFormSaving?: boolean;
};

type DispatchToPropsType = {
  actions: typeof SnippetActions;
};

type RCProps = RouteComponentProps<{ SnippetId: string }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetDetail));
