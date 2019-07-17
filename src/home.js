import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

//TODO: stylize (bootstrap) + ./css sheet

//TODO: deploy to gh-pages

const titleStyle = {
    top: '10%',
    //font??
}

const subtitleStyle = {
    top: '20%',
    fontSize: '20px',
    //font??
}

const databaseStyle = {
    top: '50%',
}

const glossaryStyle = {
    bottom: '10%',
}

function ViewDatabase() {
    return (
        <Link to="/database">
            <Button variant = "outline-danger">
                Database
            </Button>
        </Link>
    )
}

function ViewGlossary() {
    return (
        <Link to="/glossary">
            <Button variant = "outline-danger">
                Glossary
            </Button>
        </Link>
    )
}

class Home extends React.Component {
    state = {
    }

    render() {
        return (
            <div>
                <h1 style={titleStyle}>
                    Creators Circle
                </h1>
                <h2 style={subtitleStyle}>
                    An Opportunities Database for High School Students
                </h2>
                <br />
                <div style={databaseStyle}>
                    <ViewDatabase />
                </div>
                <br />
                <div style={glossaryStyle}>
                    <ViewGlossary />
                </div>
            </div>
        )
    }
}


export default Home;