import React, { Component } from 'react';
import Header from './Header';
import ContactsManager from './Contacts/ContactsManager';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            title: 'Contacts book'
        };
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5">
                    <ContactsManager />
                </div>
            </div>
        );
    }
}