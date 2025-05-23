import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Papa from 'papaparse';  // Import PapaParse for CSV parsing
import ReactGA from 'react-ga';

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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
"September", "October", "November", "December"];

function initializeReactGA() {
    ReactGA.initialize('UA-146123946-1');
    ReactGA.pageview('/homepage');
}

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

function find_index_of_date(input, data, colIndex) {
    let index = 12;

    for (let i = 0; i < months.length; i++) {
        let cur_month = months[i];
        if (input.data[colIndex].includes(cur_month)) {
            index = i;
            break;
        }
    }

    return index;
}

let data_map;

function analyze_data(data) {
    data_map = new Map();
    for (let i = 0; i < data.length; i++) {
        let cur_elem = data[i];
        let cur_fa = cur_elem.focus_area;
        let cur_fa_arr = cur_fa.split(", ");

        for (let index = 0; index < cur_fa_arr.length; index++) {
            let cur_item = cur_fa_arr[index];
            if (data_map.has(cur_item)) {
                let original_num = data_map.get(cur_item);
                data_map.set(cur_item, original_num + 1);
            } else {
                data_map.set(cur_item, 1);
            }
        }
    }
}

let type_map;

function analyze_type(data) { //data analytics
    type_map = new Map();
    for (let i = 0; i < data.length; i++) {
        let cur_elem = data[i];
        if (cur_elem.opp_type == "Service Opportunity") {
            let cur_fa = cur_elem.focus_area;
            let cur_fa_arr = cur_fa.split(", ");
    
            for (let index = 0; index < cur_fa_arr.length; index++) {
                let cur_item = cur_fa_arr[index];
                if (type_map.has(cur_item)) {
                    let original_num = type_map.get(cur_item);
                    type_map.set(cur_item, original_num + 1);
                } else {
                    type_map.set(cur_item, 1);
                }
            }
        }
    }
}

class App extends React.Component {
    state = {
        data: [],
    };

    componentDidMount() {
        this.fetchAndUpdateData();
        initializeReactGA();
    }

    fetchAndUpdateData = () => {
        const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqoHrzvRfls6cfOX6CjFwuhcL9Ce8ivBhmOrZLikicHeYdfpzNUYR4a9JkVbY-YqCFisptbKK3iqLc/pub?output=csv";
        
        // Fetch the CSV file from Google Sheets
        fetch(csvUrl)
            .then(response => response.text())
            .then(csvData => {
                // Convert CSV to JSON using PapaParse
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        // Update the data in state
                        this.setState({ data: result.data });

                        // After updating the data, you can store it in your `datafile.json` if needed
                        // Here you would normally save it back to a file, but in a frontend app, it's handled in memory
                        // This part is only to demonstrate the conversion
                        console.log("Parsed JSON Data: ", result.data);
                    },
                    error: (error) => {
                        console.error("Error parsing CSV: ", error);
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching CSV: ", error);
            });
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTableCell: {
                head: {
                    fontWeight: "bold",
                },
                root: {
                    fontFamily: "Arial",
                },
                footer: {
                    position: "relative",
                    left: "0px",
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
            MuiTableFooter: {
                root: {
                   position: "fixed",
                   bottom: "0px",
                   backgroundColor: "white",
                   width: "100%",
                },
            },
            root: {
                fontFamilySansSerif: "Arial",
            }
        }
    })

  render() {
    const data = this.state.data;

    find_focus_areas(data);

    analyze_type(data);

    const columns = [
        {
            name: "title",
            label: "Opportunity",
            options: {
                setCellProps: () => ({ style: { maxWidth: "100px" }}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>},
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
                        <a href={opp_link} target="_blank">{value}</a>
                    );
                }
            },
        },
        {
            name: "opp_type",
            label: "Opportunity Type",
            options: {
                setCellProps: () => ({ style: { maxWidth: "100px" }}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>},
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
                setCellProps: () => ({ style: { maxWidth: "100px" }}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>},
                filter: true,
                sort: false,
                //sort focus areas tags in alphabetical order
                customBodyRender: (value, tableMeta, updateValue) => {
                    let values_arr = value.split(", ");
                    values_arr = values_arr.sort(function(a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });
                    let focus_areas_str = "";
                    for (let i = 0; i < values_arr.length; i++) {
                        if (i == 0) {
                            focus_areas_str += values_arr[i];
                        } else {
                            focus_areas_str += ", " + values_arr[i];
                        }
                    }

                    return (
                        focus_areas_str
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
            name: "grade_level",
            label: "Grade Level",
            options: {
                filter: true,
                filterType: "multiselect",
                filterOptions: {
                names: ["9", "10", "11", "12"],
                logic(gradeLevel, filter) {
                    if (filter.length === 0) return false;
                    const gradeStr = gradeLevel?.toString() || "";
                    return !filter.some(val => gradeStr.includes(val));
                }
                }
            }
            }
            ,
        {
            name: "location",
            label: "Location",
            options: {
                setCellProps: () => ({ style: { maxWidth: "100px" }}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>},
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

                            for (let j = 0; j < location_arr.length; j++) {
                                let cur_loc = location_arr[j];
                                if (cur_loc == filter_val) {
                                    return false;
                                }
                            }

                            if ((filter_val == "Global" && hasIntlItem)
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
                setCellProps: () => ({ style: { maxWidth: "300px"}}),
                customBodyRender: (data, type, row) => {return <div>{data}</div>},
                filter: false, 
                sort: false,
                hint: "Summary of opportunity",
            }
        },
    ];

    const options = {
        download: true,
        downloadOptions: {
            filename: 'CreatorsCircle Opportunities.csv',
            separator: ',',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            }
        },
        filterType: 'dropdown',
        selectableRows: 'none',
        rowsPerPage: 5,
        responsive: 'scrollFullHeight',
        rowsPerPageOptions: [5, 10, 15, 25],
        isRowSelectable: (dataIndex) => {
            return false;
        },
        onRowsDelete: (rowsDeleted) => {
            return;
        },
        customSort: (data, colIndex, order) => {
            if (colIndex == 3) { //application deadline

                return data.sort((a, b) => {
                    let a_index = find_index_of_date(a, data, colIndex);
                    let b_index = find_index_of_date(b, data, colIndex);
                    return ((a_index <= b_index) ? 1 : -1) * (order === 'desc' ? 1 : -1);
                });
            }
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
            <br />
            <br />
        </div>
    )
  }
}

export default App;
