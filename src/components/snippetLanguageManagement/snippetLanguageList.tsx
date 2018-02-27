import * as React from 'react';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

const SnippetLanguageList = (props: SnippetLanguageListProps) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'SnippetLanguageName',
      Cell: (d: any) => <span className="SnippetLanguageName">{d.value}</span>
    },
    {
      Header: '',
      id: 'btn_details',
      Cell: (d: any) => <Link to={`/SnippetLanguage/${d.original.id}`} className="btn btn-outline-success btn-sm mx-1" > Details</Link>,
      filterable: false,
      maxWidth: 75
    },
    {
      Header: '',
      id: 'btn_delete',
      Cell: (d: any) => <input type="button" className="btn btn-outline-danger btn-sm mx-1" onClick={() => { props.onSnippetLanguageDelete(d.original); }} value="Delete" />,
      filterable: false,
      maxWidth: 75
    }
  ];

  return (

    <div>
      {/* List of SnippetLanguages */}
      <ReactTable
        data={props.SnippetLanguageArray}
        columns={columns}
        defaultPageSize={10}
        minRows={3}
        filterable
        defaultFilterMethod={(filter, row) => String(row[filter.id]).includes(filter.value)}
      />
    </div>
  );
};

type SnippetLanguageListProps = {
  SnippetLanguageArray: SnippetLanguageModel[];
  onSnippetLanguageDelete: (SnippetLanguage: SnippetLanguageModel) => void;
};

export default SnippetLanguageList;
