import * as React from 'react';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

const SnippetList = (props: SnippetListProps) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'SnippetName',
      Cell: (d: any) => <span className="SnippetName">{d.value}</span>
    },
    {
      Header: '',
      id: 'btn_details',
      Cell: (d: any) => <Link to={`/Snippet/${d.original.id}`} className="btn btn-outline-success btn-sm mx-1" > Details</Link>,
      filterable: false,
      maxWidth: 75
    },
    {
      Header: '',
      id: 'btn_delete',
      Cell: (d: any) => <input type="button" className="btn btn-outline-danger btn-sm mx-1" onClick={() => { props.onSnippetDelete(d.original); }} value="Delete" />,
      filterable: false,
      maxWidth: 75
    }
  ];

  return (

    <div>
      {/* List of Snippets */}
      <ReactTable
        data={props.SnippetArray}
        columns={columns}
        defaultPageSize={10}
        minRows={3}
        filterable
        defaultFilterMethod={(filter, row) => String(row[filter.id]).includes(filter.value)}
      />
    </div>
  );
};

type SnippetListProps = {
  SnippetArray: SnippetModel[];
  onSnippetDelete: (Snippet: SnippetModel) => void;
};

export default SnippetList;
