import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const titleStyle = {
    position: 'absolute',
    top: '40%',
    left: '35%',
}

const subtitleStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '20px',
}

const databaseStyle = {
    position: 'absolute',
    top: '65%',
    left: '40%',
}

const glossaryStyle = {
    position: 'absolute',
    top: '65%',
    left: '60%',
}

function ViewDatabase() {
    return (
        <Link to="/database">
            <Button variant = "outline-success" size = "lg">
                Database
            </Button>
        </Link>
    )
}

function ViewGlossary() {
    return (
        <Link to="/glossary">
            <Button variant = "outline-success" size = "lg">
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
                    Creators Circle:
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