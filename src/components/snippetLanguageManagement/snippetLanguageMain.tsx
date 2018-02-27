import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import ISnippetLanguageAction from 'actions/interfaces/ISnippetLanguageAction';
import * as SnippetLanguageActions from 'actions/SnippetLanguageActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import * as toastr from 'toastr';
import SnippetLanguageList from './snippetLanguageList';

class SnippetLanguageMain extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: ThisPropsType) {
    super(props as any);
    this.state = {
      SnippetLanguageArray: this.props.SnippetLanguageArray
    };
  }

  render() {
    return (
      <div className="container my-3">
        <h4>CRMCORE - Customers</h4>
        <Link to="/snippetLanguage" className="btn btn-outline-primary btn-sm my-3" >Add </Link>
        <SnippetLanguageList
          SnippetLanguageArray={this.state.SnippetLanguageArray}
          onSnippetLanguageDelete={this.onSnippetLanguageDelete}
        />
      </div>
    );
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    this.props.actions.getAllSnippetLanguage();
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    this.setState({ SnippetLanguageArray: nextProps.SnippetLanguageArray });
  }

  componentDidUpdate() {
    //
  }

  // Build in delete function, remove it if not needed.
  onSnippetLanguageDelete = (SnippetLanguage: SnippetLanguageModel) => {
    this.props.actions.deleteSnippetLanguage(SnippetLanguage)
      .then(() => {
        toastr.success('SnippetLanguage deleted.');
      });
  }
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  return {
    SnippetLanguageArray: storeState.SnippetLanguageArray
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetLanguageAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetLanguageActions, dispatch)
  };
}

type ThisStateType = {
  SnippetLanguageArray: SnippetLanguageModel[]
};

type StateToPropsType = {
  SnippetLanguageArray: SnippetLanguageModel[];
};

type DispatchToPropsType = {
  actions: typeof SnippetLanguageActions;
};

type RCProps = RouteComponentProps<{ id: number }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetLanguageMain));
