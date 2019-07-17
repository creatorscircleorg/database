import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

//TODO: add content

class Glossary extends React.Component {
    render() {
        return (
            <div>
                <br />
                <Link to="/">
                    <Button variant="outline-danger">
                        Back
                    </Button>
                </Link>
                <h1>Glossary</h1>
            </div>
        )
    }
}

export default Glossary;