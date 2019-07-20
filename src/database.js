import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class Database extends React.Component {
    render() {
        const data = require('./data_2.json');

        const columns = [
            {
                name: "title",
                label: "Title",
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
                name: "grade_level",
                label: "Grade Level",
                options: {
                    filter: true, 
                    sort: true, 
                    hint: "Grade levels this opportunity is open to"
                }
            },
            {
                name: "award_amount",
                label: "Scholarship Amount (USD)",
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
                name: "discipline",
                label: "Discipline",
                options: {
                    filter: true, 
                    sort: true
                }
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
                name: "program_dates",
                label: "Program Dates/Length",
                options: {
                    filter: true, 
                    sort: true
                }
            },
            {
                name: "program_cost",
                label: "Program Cost (USD)",
                options: {
                    filter: true, 
                    sort: true
                }
            },
            {
                name: "location_language",
                label: "Location and Language",
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
            /*
            {
                name: "website",
                label: "Website",
                options: {
                    filter: true, 
                    sort: true, 
                    display: "false",
                    hint: "Link to website"
                }
            }
            */
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
                <Link to="/">
                    <Button variant = "outline-success" size = "lg">
                        Back
                    </Button>
                </Link>
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

export default Database;