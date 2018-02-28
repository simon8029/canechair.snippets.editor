import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Store from 'store/store';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import ISnippetGroupAction from 'actions/interfaces/ISnippetGroupAction';
import * as SnippetGroupActions from 'actions/SnippetGroupActions';
import SnippetList from 'components/snippetManagement/snippetList';
import StoreStateType from 'types/StateTypes/StoreStateType';
import CCTextField from 'components/CommonComponent/CCTextField';
import * as toastr from 'toastr';
const UUID = require('uuid/v4');

class SnippetGroupDetail extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: StateToPropsType) {
    super(props as any);
    this.state = {
      SnippetGroupArray: this.props.SnippetGroupArray,
      currentSnippetGroup: this.props.currentSnippetGroup,
      errors: [],
      isNewSnippetGroup: this.props.isNewSnippetGroup,
      isFormSaving: false,
      textFields: {
        id: (this.props.currentSnippetGroup.id !== undefined) ? this.props.currentSnippetGroup.id : '',
        SnippetGroupName: (this.props.currentSnippetGroup.SnippetGroupName !== undefined) ? this.props.currentSnippetGroup.SnippetGroupName : '',
        SnippetGroupLanguage: (this.props.currentSnippetGroup.SnippetGroupLanguage !== undefined) ? this.props.currentSnippetGroup.SnippetGroupLanguage : '',
        SnippetGroupDescription: (this.props.currentSnippetGroup.SnippetGroupDescription !== undefined) ? this.props.currentSnippetGroup.SnippetGroupDescription : ''
      },
      textFieldsErrors: {}
    };
  }

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.onFormSubmit}>
          <div id="" className="">
            <input type="button" className="btn btn-outline-warning btn-sm" onClick={() => { this.props.history.push('/SnippetGroups'); }} value={'<= Go Back'} />
            <input
              type="submit"
              className="btn btn-outline-success btn-sm mx-1 float-right"
              value={this.state.isNewSnippetGroup ? 'Add' : 'Update'}
            />
          </div>
          <h4 className="my-3">Customer - </h4>
          <div className="">
            <div className="form-row">
              <div className="col">
                <CCTextField
                  fieldName="id"
                  label="ID"
                  value={this.state.textFields.id}
                  onChange={this.onTextFieldChange}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetGroupName"
                  label="Name"
                  value={this.state.textFields.SnippetGroupName}
                  isRequired={true}
                  isRequiredErrorMessage="SnippetGroup Name is required...."
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length > 1 ? false : 'SnippetGroup name cannot less than 2 letters.'}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetGroupLanguage"
                  label="Language"
                  value={this.state.textFields.SnippetGroupLanguage}
                  isRequired={true}
                  isRequiredErrorMessage="SnippetGroup Language is required...."
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length > 1 ? false : 'SnippetGroup language cannot less than 2 letters.'}
                />
              </div>
              <div className="col">
                <CCTextField
                  fieldName="SnippetGroupDescription"
                  label="Description"
                  value={this.state.textFields.SnippetGroupDescription}
                  isRequired={false}
                  isRequiredErrorMessage=""
                  onChange={this.onTextFieldChange}
                  validate={(value) => value.length < 300 ? false : 'Description should less than 300 characters.'}
                />
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div>
          <Link to={{ pathname: `/SnippetGroup/${this.state.currentSnippetGroup.id}/snippet`, state: { currentSnippetGroup: this.state.currentSnippetGroup } }} > Add </Link>
        </div>
        <SnippetList currentSnippetGroup={this.state.currentSnippetGroup} />
      </div>
    );
  }

  componentWillMount() {
    // Store.dispatch(SnippetGroupActions.getAllSnippetGroups());
  }

  componentDidMount() {
    // if the component is loaded through browser url instead of <Link>, reload all data
    if (this.state.SnippetGroupArray.length === 0) {
      Store.dispatch(SnippetGroupActions.getAllSnippetGroup());
    }
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    // Set current selected SnippetGroup to state
    if (nextProps.currentSnippetGroup !== undefined) {
      this.setState({
        currentSnippetGroup: Object.assign({}, nextProps.currentSnippetGroup),
        textFields: {
          id: nextProps.currentSnippetGroup.id ? nextProps.currentSnippetGroup.id : '',
          SnippetGroupName: nextProps.currentSnippetGroup.SnippetGroupName ? nextProps.currentSnippetGroup.SnippetGroupName : '',
          SnippetGroupLanguage: nextProps.currentSnippetGroup.SnippetGroupLanguage ? nextProps.currentSnippetGroup.SnippetGroupLanguage : '',
          SnippetGroupDescription: nextProps.currentSnippetGroup.SnippetGroupDescription ? nextProps.currentSnippetGroup.SnippetGroupDescription : ''
        }
      });
    }
    this.setState({ SnippetGroupArray: nextProps.SnippetGroupArray });
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
    const SnippetGroup: SnippetGroupModel = new SnippetGroupModel();
    SnippetGroup.id = this.state.textFields.id ? this.state.textFields.id : UUID();
    SnippetGroup.SnippetGroupName = this.state.textFields.SnippetGroupName;
    SnippetGroup.SnippetGroupLanguage = this.state.textFields.SnippetGroupLanguage;
    SnippetGroup.SnippetGroupDescription = this.state.textFields.SnippetGroupDescription;

    if (!this.isFormValid()) {
      return;
    }

    this.setState({ isFormSaving: true });

    if (this.state.isNewSnippetGroup) {
      this.props.actions.addNewSnippetGroup(SnippetGroup)
        .then((res: any) => {
          this.redirectToSnippetGroupsComponent();
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    } else {
      this.props.actions.updateSnippetGroup(SnippetGroup)
        .then(() => {
          this.redirectToSnippetGroupsComponent();
        })
        .catch((error: string) => {
          this.catchError(error);
        });
    }
  }

  redirectToSnippetGroupsComponent() {
    this.setState({ isFormSaving: false });
    toastr.success(this.state.isNewSnippetGroup ? 'New SnippetGroup added.' : 'SnippetGroup updated.');
    this.props.history.push('/SnippetGroups');
  }

  catchError(error: string) {
    this.setState({ isFormSaving: false });
    toastr.error(error);
  }

  isFormValid() {
    const textFields = this.state.textFields;
    const textFieldsErrors = this.state.textFieldsErrors;
    const errorMessages = Object.keys(textFieldsErrors).filter((k) => textFieldsErrors[k]);

    if (!textFields.SnippetGroupName) {
      return false;
    }

    if (errorMessages.length) {
      return false;
    }

    return true;
  }
}

function getSnippetGroupById(SnippetGroups: SnippetGroupModel[], SnippetGroupId: string) {
  const SnippetGroup = SnippetGroups.filter((s: SnippetGroupModel) => s.id === SnippetGroupId);
  if (SnippetGroup) { return SnippetGroup[0]; }
  return new SnippetGroupModel();
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  const SnippetGroupId = ownProps.match.params.SnippetGroupId;
  let currentSnippetGroup = new SnippetGroupModel();
  let isNewSnippetGroup = SnippetGroupId === undefined;

  if (SnippetGroupId && storeState.SnippetGroupArray.length > 0) {
    currentSnippetGroup = getSnippetGroupById(storeState.SnippetGroupArray, SnippetGroupId);
    isNewSnippetGroup = false;
  }

  return {
    SnippetGroupArray: storeState.SnippetGroupArray,
    currentSnippetGroup: currentSnippetGroup,
    isNewSnippetGroup: isNewSnippetGroup
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetGroupAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetGroupActions, dispatch)
  };
}

type ThisStateType = {
  SnippetGroupArray: Array<SnippetGroupModel>;
  currentSnippetGroup: SnippetGroupModel;
  errors: string[],
  isNewSnippetGroup: boolean,
  isFormSaving: boolean;
  textFields: {
    id: string;
    SnippetGroupName: string;
    SnippetGroupLanguage: string;
    SnippetGroupDescription: string;
  },
  textFieldsErrors: {}
};

type StateToPropsType = {
  SnippetGroupArray: Array<SnippetGroupModel>;
  currentSnippetGroup: SnippetGroupModel;
  errors?: Object;
  isNewSnippetGroup: boolean;
  isFormSaving?: boolean;
};

type DispatchToPropsType = {
  actions: typeof SnippetGroupActions;
};

type RCProps = RouteComponentProps<{ SnippetGroupId: string }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetGroupDetail));
