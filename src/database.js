import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables'; //TODO: consider other options (firebase, mongodb)
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

/*
TODO (technical):
    -) try to get rid of website column (button in the title box?) -> would also make description column wider
*/

/*
TODO (nontechnical):
    -) definitions for column titles
*/

class Database extends React.Component {
    render() {
        const columns = [
            {
                name: "title",
                label: "Title",
                options: {filter: true, sort: true}
            },
            {
                name: "grade_level",
                label: "Grade Level",
                options: {filter: true, sort: true, hint: "Grade levels this opportunity is open to"}
            },
            {
                name: "award_amount",
                label: "Scholarship or Award Amount (USD)",
                options: {filter: true, sort: true}
            },
            {
                name: "deadline",
                label: "Application Deadline",
                options: {filter: true, sort: true}
            },
            {
                name: "discipline",
                label: "Discipline",
                options: {filter: true, sort: true}
            },
            {
                name: "opp_type",
                label: "Opportunity Type",
                options: {filter: true, sort: true}
            },
            {
                name: "program_dates",
                label: "Program Dates/Length",
                options: {filter: true, sort: true}
            },
            {
                name: "program_cost",
                label: "Program Cost (USD)",
                options: {filter: true, sort: true}
            },
            {
                name: "location_language",
                label: "Location and Language",
                options: {filter: true, sort: true}
            },
            {
                name: "description",
                label: "Description",
                options: {filter: true, sort: true}
            },
            {
                name: "website",
                label: "Website",
                options: {filter: true, sort: true, hint: "Link to website"}
            }
        ];

        const data = require('./data_2.json');

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'false',
            print: 'false',
            download: 'false',
            //TODO: textLabels (User provided labels to localize text)
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
                    <Button variant="outline-danger">
                        Back
                    </Button>
                </Link>
                <h1>Opportunities Database</h1> 
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