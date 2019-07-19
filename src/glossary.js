import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class Glossary extends React.Component {
    render() {
        return (
            <div>
                <br />
                <Link to="/">
                    <Button variant = "outline-success" size = "lg">
                        Back
                    </Button>
                </Link>
                <br />
                <h1>Glossary</h1>
            </div>
        )
    }
}

export default Glossary;