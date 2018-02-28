import * as React from 'react';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

const SnippetGroupList = (props: SnippetGroupListProps) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'SnippetGroupName',
      Cell: (d: any) => <span className="SnippetGroupName">{d.value}</span>
    },
    {
      Header: '',
      id: 'btn_details',
      Cell: (d: any) => <Link to={`/SnippetGroup/${d.original.id}`} className="btn btn-outline-success btn-sm mx-1" > Details</Link>,
      filterable: false,
      maxWidth: 75
    },
    {
      Header: '',
      id: 'btn_delete',
      Cell: (d: any) => <input type="button" className="btn btn-outline-danger btn-sm mx-1" onClick={() => { props.onSnippetGroupDelete(d.original); }} value="Delete" />,
      filterable: false,
      maxWidth: 75
    }
  ];

  return (

    <div>
      {/* List of SnippetGroups */}
      <ReactTable
        data={props.SnippetGroupArray}
        columns={columns}
        defaultPageSize={10}
        minRows={3}
        filterable
        defaultFilterMethod={(filter, row) => String(row[filter.id]).includes(filter.value)}
      />
    </div>
  );
};

type SnippetGroupListProps = {
  SnippetGroupArray: SnippetGroupModel[];
  onSnippetGroupDelete: (SnippetGroup: SnippetGroupModel) => void;
};

export default SnippetGroupList;
