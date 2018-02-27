import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import * as SnippetLanguageActions from 'actions/SnippetLanguageActions';
import StoreStateType from 'types/StateTypes/StoreStateType';
import * as toastr from 'toastr';
import { ISnippetLanguageAction } from 'actions/interfaces/ISnippetLanguageAction';

class SnippetList extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      SnippetLanguageArray: props.SnippetLanguageArray,
      currentSnippetLanguage: props.currentSnippetLanguage,
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
    this.setState({ SnippetLanguageArray: nextProps.SnippetLanguageArray, currentSnippetLanguage: nextProps.currentSnippetLanguage });
  }

  componentDidUpdate() {
    //
  }

  onSnippetDelete = (Snippet: SnippetModel) => {
    // remove snippet from current SnippetLanguage
    var newSnippetLanguage = Object.assign({}, this.state.currentSnippetLanguage);
    newSnippetLanguage.Snippets = newSnippetLanguage.Snippets.filter(s => s.id !== Snippet.id);

    // update current SnippetLanguage to store
    this.props.actions.updateSnippetLanguage(newSnippetLanguage)
      .then(() => {
        this.setState({ currentSnippetLanguage: newSnippetLanguage });
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
          <Link to={{ pathname: `/SnippetLanguage/${this.state.currentSnippetLanguage.id}/Snippet/${d.original.id}`, state: { currentSnippetLanguage: this.state.currentSnippetLanguage } }} className="btn btn-outline-success btn-sm mx-1" > Details</Link>,
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
          (this.state.currentSnippetLanguage !== undefined &&
            this.state.currentSnippetLanguage.Snippets !== undefined &&
            this.state.currentSnippetLanguage.Snippets.length > 0
          )
            ?
            <ReactTable
              data={this.state.currentSnippetLanguage.Snippets}
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
    SnippetLanguageArray: storeState.SnippetLanguageArray,
    currentSnippetLanguage: ownProps.currentSnippetLanguage,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetLanguageAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetLanguageActions, dispatch)
  };
}

type OwnProps = {
  currentSnippetLanguage: SnippetLanguageModel;
};

type StateToPropsType = {
  SnippetLanguageArray: SnippetLanguageModel[];
  currentSnippetLanguage: SnippetLanguageModel;
};

type ThisStateType = {
  SnippetLanguageArray: SnippetLanguageModel[];
  currentSnippetLanguage: SnippetLanguageModel;
  isLoading: boolean;
};

type DispatchToPropsType = {
  actions: typeof SnippetLanguageActions;
};

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetList);
