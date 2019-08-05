import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import {Link} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { isLabeledStatement } from '@babel/types';
import { array } from 'prop-types';

const all_locations = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", 
"Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
"Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", 
"North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington D.C.", 
"West Virginia", "Wisconsin", "Wyoming", "Nationwide", "Global"];

const us_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", 
"Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
"Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", 
"North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington D.C.", 
"West Virginia", "Wisconsin", "Wyoming"];

let focus_areas_list = [];

function find_focus_areas(data) {
    for (let i = 0; i < data.length; i++) {
        let cur = data[i].focus_area; //unabridged list of focus areas
        let cur_array = cur.split(", "); //converted into array of focus areas
        for (let j = 0; j < cur_array.length; j++) {
            let cur_item = cur_array[j]; //individual focus area within cur_array
            if (!focus_areas_list.includes(cur_item)) {
                focus_areas_list.push(cur_item);
            }
        }
    }

}

class App extends React.Component {

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTableCell: {
                head: {
                    fontWeight: "bold",
                },
                root: {
                    fontFamily: "Helvetica Neue",
                }
            },
            MuiIconButton: {
                colorInherit: {
                    color: "#105EA8",
                }
            },
            MuiSvgIcon: {
                fontSizeSmall: {
                    color: "#FFFFFF",
                    backgroundColor: "#FFFFFF",
                }
            },
        }
    })

  render() {
    const data = require('./datafile.json');

    find_focus_areas(data);

    const columns = [
        {
            name: "title",
            label: "Opportunity",
            options: {
                filter: false, 
                sort: false,
                hint: "Program name and hyperlink",
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
                filterType: 'multiselect',
                sort: false,
                hint: "Programmatic format of opportunity"
            }
        },
        {
            name: "focus_area",
            label: "Focus Area",
            options: {
                filter: true,
                sort: false,
                //sort focus areas tags in alphabetical order
                customBodyRender: (value, tableMeta, updateValue) => {
                    let values_arr = value.split(", ");
                    values_arr = values_arr.sort(function(a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });
                    return (
                        values_arr.toString()
                    );
                },
                filterOptions: {
                    names: focus_areas_list,
                    logic(focus_areas, filter) {
                        let focus_areas_array = focus_areas.split(", ");

                        for (let i = 0; i < filter.length; i++) {
                            let filter_val = filter[i];
                            for (let j = 0; j < focus_areas_array.length; j++) {
                                if (filter_val == focus_areas_array[j]) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                },
                filterType: 'multiselect',
                hint: "Issue area through which a program hopes to create impact"
            }
        },
        {
            name: "deadline",
            label: "Application Deadline",
            options: {
                filter: false, 
                sort: true,
                hint: "Date applications are due"
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
                    logic(grade, filter) {
                        for (let i = 0; i < filter.length; i++) {
                            let val = filter[i];
                            if (!grade.includes(val)) {
                                return true;
                            }
                        }
                        return false;
                    }
                },
                filterType: "multiselect",
                hint: "Grade level to which this opportunity is open"
            }
        },
        {
            name: "location",
            label: "Location",
            options: {
                filter: true, 
                filterType: "multiselect",
                sort: false,
                hint: "Geographic region in which program is based",
                filterOptions: {
                    names: all_locations,
                    logic(location, filter) {
                        if (location.length == 0) {
                            return true;
                        }

                        let hasIntlItem = false; //has at least one international item
                        let hasUSItem = false; //has at least one domestic item
                        let location_arr = location.split(", ");
                        for (let i = 0; i < location_arr.length; i++) {
                            let cur_loc = location_arr[i];
                            if (!all_locations.includes(cur_loc)) {
                                hasIntlItem = true;
                            }
                            if (us_states.includes(cur_loc)) {
                                hasUSItem = true;
                            }
                        }

                        for (let i = 0; i < filter.length; i++) {
                            let filter_val = filter[i];
                           if (location.includes(filter_val) 
                                || (filter_val == "Global" && hasIntlItem)
                                || (filter_val == "Nationwide" && hasUSItem)) {
                               return false;
                           }
                        }
                        return true;
                    }
                }
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: false, 
                sort: false,
                hint: "Summary of opportunity",
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 25],
        isRowSelectable: (dataIndex) => {
            return false;
        },
        onRowsDelete: (rowsDeleted) => {
            return;
        },
        //data: array, colIndex: number, order: string)
        //TODO: sort in alphabetical order within opportunity type
        customSort: (data, colIndex, order) => {
            return array;
        }
    };

    return (
        <div>
            <MuiThemeProvider theme={
                this.getMuiTheme()
            }>
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