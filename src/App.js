import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    const data = require('./data_2.json');

    const columns = [
        {
            name: "title",
            label: "Opportunity",
            options: {
                filter: true, 
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    let opp_link;
                    for (let index = 0; index < data.length; index++) {
                        let cur_item = data[index];
                        if (cur_item.title == value) {
                            opp_link = cur_item.website;
                            break;
                        }
                    }
                    return (
                        <a href={opp_link}>{value}</a>
                    );
                }
            },
        },
        {
            name: "opp_type",
            label: "Opportunity Type",
            options: {
                filter: true, 
                sort: true
            }
        },
        {
            name: "deadline",
            label: "Application Deadline",
            options: {
                filter: true, 
                sort: true
            }
        },
        {
            name: "grade_level",
            label: "Grade Level",
            options: {
                filter: true, 
                sort: true, 
                hint: "Grade levels this opportunity is open to"
            }
        },
        {
            name: "program_dates",
            label: "Program Length",
            options: {
                filter: true, 
                sort: true
            }
        },
        {
            name: "location_language",
            label: "Location",
            options: {
                filter: true, 
                sort: true
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: false, 
                sort: false
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        resizableColumns: true,
        selectableRows: 'none',
        isRowSelectable: (dataIndex) => {
            return false;
        },
        onRowsDelete: (rowsDeleted) => {
            return;
        }
    };

    return (
        <div>
            <br />
            <h2>Opportunities Database</h2> 
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
  }
}

export default App;