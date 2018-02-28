import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import ISnippetGroupAction from 'actions/interfaces/ISnippetGroupAction';
import StoreStateType from 'types/StateTypes/StoreStateType';
import * as SnippetGroupActions from 'actions/SnippetGroupActions';
import * as toastr from 'toastr';
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';
import { SnippetJsonTemplate } from 'templates/snippetJsonTemplate';
import { PackageJsonTemplate } from 'templates/packageJsonTemplate';
import SnippetGroupList from './snippetGroupList';

class SnippetGroupMain extends React.Component<ThisPropsType, ThisStateType> {
  constructor(props: ThisPropsType) {
    super(props as any);
    this.state = {
      SnippetGroupArray: this.props.SnippetGroupArray
    };
  }

  render() {
    return (
      <div className="container my-3">
        <h4>CRMCORE - Customers</h4>
        <Link to="/snippetGroup" className="btn btn-outline-primary btn-sm my-3" >Add </Link>
        <input type="button" onClick={this.generateSnippetFiles} value="Generate" className="btn btn-outline-success btn-sm float-right" />
        <SnippetGroupList
          SnippetGroupArray={this.state.SnippetGroupArray}
          onSnippetGroupDelete={this.onSnippetGroupDelete}
        />
      </div>
    );
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    this.props.actions.getAllSnippetGroup();
  }

  componentWillReceiveProps(nextProps: StateToPropsType) {
    this.setState({ SnippetGroupArray: nextProps.SnippetGroupArray });
  }

  componentDidUpdate() {
    //
  }

  // Build in delete function, remove it if not needed.
  onSnippetGroupDelete = (SnippetGroup: SnippetGroupModel) => {
    this.props.actions.deleteSnippetGroup(SnippetGroup)
      .then(() => {
        toastr.success('SnippetGroup deleted.');
      });
  }

  generateSnippetFiles = () => {
    let zip = new JSZip();
    let snippetPackageJsonFileBlock = ''; // string of package.json file's contributes block
    this.state.SnippetGroupArray.map(sl => {
      let snippetBlocks = ''; // string of all snippets in current snippet group
      sl.Snippets.map(s => {
        snippetBlocks += SnippetJsonTemplate
          .replace('__SnippetName__', s.SnippetName)
          .replace('__SnippetPrefix__', s.SnippetPrefix)
          .replace('__SnippetBody__', s.SnippetBody)
          .replace('__SnippetDescription__', s.SnippetDescription);
      });

      snippetPackageJsonFileBlock += PackageJsonTemplate
        .replace('__SnippetGroupLanguage__', sl.SnippetGroupLanguage)
        .replace('__SnippetGroupName__', sl.SnippetGroupName);

      // Add curve bracket and remove the last comma from snippetBlocks string.
      snippetBlocks = `{${snippetBlocks.slice(0, -1)}}`;

      let snippetGroup = new Blob([snippetBlocks], { type: 'text/json;charset=utf-8' });
      zip.folder('snippets').file(`CaneChairSnippets_${sl.SnippetGroupName}_.json`, snippetGroup);
    });

    snippetPackageJsonFileBlock = `{${snippetPackageJsonFileBlock.slice(0, -1)}}`; // Remove last comma
    let snippetPackageJsonFile = new Blob([snippetPackageJsonFileBlock], { type: 'text/json;charset=utf-8' });
    zip.file(`packageJsonContributes.json`, snippetPackageJsonFile);

    zip.generateAsync({ type: 'blob' })
      .then((b) => {
        FileSaver.saveAs(b, 'snippets.zip');
      });
  }
}

function mapStateToProps(storeState: StoreStateType, ownProps: OwnProps): StateToPropsType {
  return {
    SnippetGroupArray: storeState.SnippetGroupArray
  };
}

function mapDispatchToProps(dispatch: Dispatch<ISnippetGroupAction>): DispatchToPropsType {
  return {
    actions: bindActionCreators(SnippetGroupActions, dispatch)
  };
}

type ThisStateType = {
  SnippetGroupArray: SnippetGroupModel[]
};

type StateToPropsType = {
  SnippetGroupArray: SnippetGroupModel[];
};

type DispatchToPropsType = {
  actions: typeof SnippetGroupActions;
};

type RCProps = RouteComponentProps<{ id: number }>;

type OwnProps = {
} & RCProps;

type ThisPropsType = StateToPropsType & DispatchToPropsType & OwnProps;

export default withRouter(connect<StateToPropsType, DispatchToPropsType, OwnProps>(mapStateToProps, mapDispatchToProps)(SnippetGroupMain));
