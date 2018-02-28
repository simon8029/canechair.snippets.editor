import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import * as SnippetGroupActions from 'actions/SnippetGroupActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import * as toastr from 'toastr';
import { ISnippetGroupAction } from 'actions/interfaces/ISnippetGroupAction';

class SnippetList extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      SnippetGroupArray: props.SnippetGroupArray,
      currentSnippetGroup: props.currentSnippetGroup,
      isLoading: false
    };
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    //
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    // this.setState({ TableArray: nextProps.TableArray });
    this.setState({ SnippetGroupArray: nextProps.SnippetGroupArray, currentSnippetGroup: nextProps.currentSnippetGroup });
  }

  componentDidUpdate() {
    //
  }

  onSnippetDelete = (Snippet: SnippetModel) => {
    // remove snippet from current SnippetGroup
    var newSnippetGroup = Object.assign({}, this.state.currentSnippetGroup);
    newSnippetGroup.Snippets = newSnippetGroup.Snippets.filter(s => s.id !== Snippet.id);

    // update current SnippetGroup to store
    this.props.actions.updateSnippetGroup(newSnippetGroup)
      .then(() => {
        this.setState({ currentSnippetGroup: newSnippetGroup });
        toastr.success('Snippet deleted.');
      });
  }

  render() {
    const columns = [
      {
        Header: 'Id',
        accessor: 'id', // String-based value accessors!
        minWidth: 200
      },
      {
        Header: 'Name',
        accessor: 'SnippetName',
        Cell: (d: any) => <span className="SnippetName">{d.value}</span>
      },
      {
        Header: '', // Custom header components!
        id: 'btn_details',
        Cell: (d: any) =>
          <Link to={{ pathname: `/SnippetGroup/${this.state.currentSnippetGroup.id}/Snippet/${d.original.id}`, state: { currentSnippetGroup: this.state.currentSnippetGroup } }} className="btn btn-outline-success btn-sm mx-1" > Details</Link>,
        filterable: false,
        maxWidth: 75
      },
      {
        Header: '', // Custom header components!
        id: 'btn_delete',
        Cell: (d: any) => <input type="button" className="btn btn-outline-danger btn-sm mx-1" onClick={() => { this.onSnippetDelete(d.original); }} value="Delete" />,
        filterable: false,
        maxWidth: 75
      }
    ];
    return (
      < div >
        {
          (this.state.currentSnippetGroup !== undefined &&
            this.state.currentSnippetGroup.Snippets !== undefined &&
            this.state.currentSnippetGroup.Snippets.length > 0
          )
            ?
            <ReactTable
              data={this.state.currentSnippetGroup.Snippets}
              columns={columns}
              defaultPageSize={6}
              minRows={3}
            />
            : 'NO DATA.'
        }
      </div >
    );
  }
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  return {
    SnippetGroupArray: storeState.SnippetGroupArray,
    currentSnippetGroup: ownProps.currentSnippetGroup,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetGroupAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetGroupActions, dispatch)
  };
}

type OwnProps = {
  currentSnippetGroup: SnippetGroupModel;
};

type StateToPropsType = {
  SnippetGroupArray: SnippetGroupModel[];
  currentSnippetGroup: SnippetGroupModel;
};

type ThisStateType = {
  SnippetGroupArray: SnippetGroupModel[];
  currentSnippetGroup: SnippetGroupModel;
  isLoading: boolean;
};

type DispatchToPropsType = {
  actions: typeof SnippetGroupActions;
};

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetList);
