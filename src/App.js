import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { isLabeledStatement } from '@babel/types';

class App extends React.Component {
    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiButtonBase: {
                root: {
                    //backgroundColor: "#FF0000"
                }
            }
        }
    })


  render() {
    const data = require('./datafile.json');

    const location_names = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", 
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington, D.C.", 
    "West Virginia", "Wisconsin", "Wyoming", "USA", "International"];

    const columns = [
        {
            name: "title",
            label: "Opportunity",
            options: {
                filter: false, 
                sort: false,
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
                filter: false, 
                sort: false
            }
        },
        {
            name: "deadline",
            label: "Application Deadline",
            options: {
                filter: false, 
                sort: false
            }
        },
        {
            name: "grade_level",
            label: "Grade Level",
            options: {
                filter: true, 
                sort: false, 
                filterOptions: {
                    names: [9, 10, 11, 12],
                    logic(grade, filterVal) {
                        if (grade.includes(filterVal)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                filterType: "multiselect",
                hint: "Grade levels this opportunity is open to"
            }
        },
        {
            name: "program_dates",
            label: "Program Length",
            options: {
                filter: false, 
                sort: false
            }
        },
        {
            name: "location_language",
            label: "Location",
            options: {
                filter: true, 
                filterType: "multiselect",
                sort: false,
                filterOptions: {
                    names: location_names,
                    logic(location, filterVal) {
                        let isInternational = true;
                        let hasInternationalItem = false; //has at least one international item
                        let locationArray = location.split(", ");
                        for (let index = 0; index < locationArray.length; index++) {
                            if (location_names.includes(locationArray[index])) {
                                isInternational = false;
                            }
                            if (isInternational && locationArray[index].length != 0) {
                                hasInternationalItem = true;
                            }
                        }

                        if (location.includes(filterVal) 
                            || (filterVal == "International" && hasInternationalItem)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
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
        selectableRows: 'none',
        rowsPerPageOptions: [10, 20, 30, 40, 50],
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
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        </div>
    )
  }
}

export default App;