import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Store from 'store/store';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import ISnippetLanguageAction from 'actions/interfaces/ISnippetLanguageAction';
import * as SnippetLanguageActions from 'actions/SnippetLanguageActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import CCTextField from 'components/CommonComponent/CCTextField';
import * as toastr from 'toastr';
const UUID = require('uuid/v4');

class SnippetLanguageDetail extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: StateToPropsType) {
    super(props as any);
    this.state = {
      SnippetLanguageArray: this.props.SnippetLanguageArray,
      currentSnippetLanguage: this.props.currentSnippetLanguage,
      errors: [],
      isNewSnippetLanguage: this.props.isNewSnippetLanguage,
      isFormSaving: false,
      textFields: {
        id: (this.props.currentSnippetLanguage.id !== undefined) ? this.props.currentSnippetLanguage.id : '',
        SnippetLanguageName: (this.props.currentSnippetLanguage.SnippetLanguageName !== undefined) ? this.props.currentSnippetLanguage.SnippetLanguageName : '',
        SnippetLanguageDescription: (this.props.currentSnippetLanguage.SnippetLanguageDescription !== undefined) ? this.props.currentSnippetLanguage.SnippetLanguageDescription : ''
      },
      textFieldsErrors: {}
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push('/SnippetLanguages'); }} value={'<= Go Back'} />
            <input
              type="submit"
              className="btn btn-outline-success btn-sm mx-1 float-right"
              value={this.state.isNewSnippetLanguage ? 'Add' : 'Update'}
            />
          </div>
          <h4 className="my-3">SnippetLanguage</h4>
          <div className="">
            <div className="form-row">
              <div className="col">
                <CCTextField
                  fieldName="id"
                  label="SnippetLanguage ID"
                  value={this.state.textFields.id}
                  onChange={this.onTextFieldChange}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetLanguageName"
                  label="SnippetLanguage Name"
                  value={this.state.textFields.SnippetLanguageName}
                  isRequired={true}
                  isRequiredErrorMessage="SnippetLanguage Name is required...."
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length > 1 ? false : 'SnippetLanguage name cannot less than 2 letters.'}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetLanguageDescription"
                  label="Description"
                  value={this.state.textFields.SnippetLanguageDescription}
                  isRequired={false}
                  isRequiredErrorMessage=""
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length < 300 ? false : 'Description should less than 300 characters.'}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  componentWillMount() {
    // Store.dispatch(SnippetLanguageActions.getAllSnippetLanguages());
  }

  componentDidMount() {
    // if the component is loaded through browser url instead of <Link>, reload all data
    if (this.state.SnippetLanguageArray.length === 0) {
      Store.dispatch(SnippetLanguageActions.getAllSnippetLanguage());
    }
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    console.log(`nextProps:`);
    console.log(nextProps);
    // Set current selected SnippetLanguage to state
    if (nextProps.currentSnippetLanguage !== undefined) {
      this.setState({
        currentSnippetLanguage: Object.assign({}, nextProps.currentSnippetLanguage),
        textFields: {
          id: nextProps.currentSnippetLanguage.id ? nextProps.currentSnippetLanguage.id : '',
          SnippetLanguageName: nextProps.currentSnippetLanguage.SnippetLanguageName ? nextProps.currentSnippetLanguage.SnippetLanguageName : '',
          SnippetLanguageDescription: nextProps.currentSnippetLanguage.SnippetLanguageDescription ? nextProps.currentSnippetLanguage.SnippetLanguageDescription : ''
        }
      });
    }
    this.setState({ SnippetLanguageArray: nextProps.SnippetLanguageArray });
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
    const SnippetLanguage: SnippetLanguageModel = new SnippetLanguageModel();
    SnippetLanguage.id = this.state.textFields.id ? this.state.textFields.id : UUID();
    SnippetLanguage.SnippetLanguageName = this.state.textFields.SnippetLanguageName;
    SnippetLanguage.SnippetLanguageDescription = this.state.textFields.SnippetLanguageDescription;

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ isFormSaving: true });

    if (this.state.isNewSnippetLanguage) {
      this.props.actions.addNewSnippetLanguage(SnippetLanguage)
        .then((res: any) => {
          this.redirectToSnippetLanguagesComponent();
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      this.props.actions.updateSnippetLanguage(SnippetLanguage)
        .then(() => {
          this.redirectToSnippetLanguagesComponent();
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    }
  }

  redirectToSnippetLanguagesComponent() {
    this.setState({ isFormSaving: false });
    toastr.success(this.state.isNewSnippetLanguage ? 'New SnippetLanguage added.' : 'SnippetLanguage updated.');
    this.props.history.push('/SnippetLanguages');
  }

  catchError(error: string) {
    this.setState({ isFormSaving: false });
    toastr.error(error);
  }

  isFormValid() {
    const textFields = this.state.textFields;
    const textFieldsErrors = this.state.textFieldsErrors;
    const errorMessages = Object.keys(textFieldsErrors).filter((k) => textFieldsErrors[k]);

    if (!textFields.SnippetLanguageName) {
      return false;
    }

    if (errorMessages.length) {
      return false;
    }

    return true;
  }
}

function getSnippetLanguageById(SnippetLanguages: SnippetLanguageModel[], SnippetLanguageId: string) {
  const SnippetLanguage = SnippetLanguages.filter((s: SnippetLanguageModel) => s.id === SnippetLanguageId);
  if (SnippetLanguage) { return SnippetLanguage[0]; }
  return new SnippetLanguageModel();
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetLanguageId = ownProps.match.params.SnippetLanguageId;
  let currentSnippetLanguage = new SnippetLanguageModel();
  let isNewSnippetLanguage = SnippetLanguageId === undefined;

  if (SnippetLanguageId && storeState.SnippetLanguageArray.length > 0) {
    currentSnippetLanguage = getSnippetLanguageById(storeState.SnippetLanguageArray, SnippetLanguageId);
    isNewSnippetLanguage = false;
  }

  return {
    SnippetLanguageArray: storeState.SnippetLanguageArray,
    currentSnippetLanguage: currentSnippetLanguage,
    isNewSnippetLanguage: isNewSnippetLanguage
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetLanguageAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetLanguageActions, dispatch)
  };
}

type ThisStateType = {
  SnippetLanguageArray: Array<SnippetLanguageModel>;
  currentSnippetLanguage: SnippetLanguageModel;
  errors: string[],
  isNewSnippetLanguage: boolean,
  isFormSaving: boolean;
  textFields: {
    id: string;
    SnippetLanguageName: string;
    SnippetLanguageDescription: string;
  },
  textFieldsErrors: {}
};

type StateToPropsType = {
  SnippetLanguageArray: Array<SnippetLanguageModel>;
  currentSnippetLanguage: SnippetLanguageModel;
  errors?: Object;
  isNewSnippetLanguage: boolean;
  isFormSaving?: boolean;
};

type DispatchToPropsType = {
  actions: typeof SnippetLanguageActions;
};

type RCProps = RouteComponentProps<{ SnippetLanguageId: string }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetLanguageDetail));
