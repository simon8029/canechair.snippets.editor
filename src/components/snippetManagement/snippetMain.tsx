import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import ISnippetAction from 'actions/interfaces/ISnippetAction';
import * as SnippetActions from 'actions/SnippetActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import SnippetList from 'components/snippetManagement/snippetList';
import * as toastr from 'toastr';

class SnippetMain extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: ThisPropsType) {
    super(props as any);
    this.state = {
      SnippetArray: this.props.SnippetArray
    };
  }

  render() {
    return (
      <div className="container my-3">
        <h4>Snippets</h4>
        <Link to="/snippet" className="btn btn-outline-primary btn-sm my-3" >Add Snippet</Link>
        <SnippetList
          SnippetArray={this.state.SnippetArray}
          onSnippetDelete={this.onSnippetDelete}
        />
      </div>
    );
  }

  componentWillMount() {
    this.props.actions.getAllSnippet();
  }

  componentDidMount() {
    //
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    this.setState({ SnippetArray: nextProps.SnippetArray });
  }

  componentDidUpdate() {
    //
  }

  // Build in delete function, remove it if not needed.
  onSnippetDelete = (Snippet: SnippetModel) => {
    this.props.actions.deleteSnippet(Snippet)
      .then(() => {
        toastr.success('Snippet deleted.');
      });
  }
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  return {
    SnippetArray: storeState.SnippetArray
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetActions, dispatch)
  };
}

type ThisStateType = {
  SnippetArray: SnippetModel[]
};

type StateToPropsType = {
  SnippetArray: SnippetModel[];
};

type DispatchToPropsType = {
  actions: typeof SnippetActions;
};

type RCProps = RouteComponentProps<{ id: number }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetMain));
