import React, { Component } from 'react';
import Modal from 'react-modal';
import AddContactForm from './AddContactForm';
import EditContactForm from './EditContactForm';
import ContactsTable from './ContactsTable';
import SearchPanel from './SearchPanel';

const ContactService = require('../../services/contacts.service');

class ContactsManager extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            contacts: [],
            selectedContact: null,
            isAddContactModalOpen: false,
            isEditContactModalOpen: false
        };

        
        this.handleOnAddContact = this.handleOnAddContact.bind(this);
        this.handleOnEditContact = this.handleOnEditContact.bind(this);
        this.handleOnDeleteContact = this.handleOnDeleteContact.bind(this);
        this.handleOnFindContacts = this.handleOnFindContacts.bind(this);
        
        this.handleOpenAddContactModal = this.handleOpenAddContactModal.bind(this);
        this.handleOnCloseAddContactModal = this.handleOnCloseAddContactModal.bind(this);

        this.handleOpenEditContactModal = this.handleOpenEditContactModal.bind(this);
        this.handleOnCloseEditContactModal = this.handleOnCloseEditContactModal.bind(this);
    }


    componentDidMount() {

        Modal.setAppElement('body');
        this.listContacts();
    }


    listContacts() {
        ContactService
            .listContacts()
            .then(contacts => {
                this.setState({contacts});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnDeleteContact(contactId) {

        if (contactId < 1) {
            throw Error('Cannot remove contact. Invalid contact id specified');
        }
        
        const confirmation = confirm('Are you sure you wish to remove contact?');

        if (confirmation) {
            ContactService
                .removeContact(contactId)
                .then(() => {
                    ContactService
                        .listContacts()
                        .then(contacts => {
                            this.setState({contacts});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            return;
                        });
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }


    handleOnFindContacts(lastName) {
        
        if (!lastName || lastName === '') {
            this.listContacts();
            return;
        }
        
        ContactService
            .findContactsByLastName(lastName)
            .then(contacts => {
                if (!contacts) {
                    contacts = [];
                }
                this.setState({contacts});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnAddContact(contact) {

        this.setState({ isAddContactModalOpen: false });

        const { firstName, lastName, phone } = contact;

        ContactService
            .addContact(firstName, lastName, phone)
            .then(newContact => {             
                ContactService
                    .listContacts()
                    .then(contacts => {
                        contacts.forEach(item => item.id === newContact.id ? item.isNew = 'true' : item.isNew = undefined);                
                        this.setState({contacts});
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddContactModal() {
        this.setState({isAddContactModalOpen: false});
    }


    handleOpenAddContactModal() {
        this.setState({isAddContactModalOpen: true});
    }


    handleOnCloseEditContactModal() {
        this.setState({isEditContactModalOpen: false});
    }


    handleOpenEditContactModal(contactId) {

        if (!contactId || contactId < 1) {
            throw Error('Cannot edit contact. Invalid contact id specified.');
        }

        ContactService
            .findContact(contactId)
            .then(contact => {
                this.setState({selectedContact: contact});
                this.setState({isEditContactModalOpen: true});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnEditContact (contact) {
        this.setState({ isEditContactModalOpen: false });
        
        const {firstName, lastName, phone } = contact;

        ContactService
            .updateContact(contact)
            .then(() => {                
                ContactService
                    .listContacts()
                    .then(contacts => {
                        contacts.forEach(item => item.id === contact._id ? item.isNew = 'true' : item.isNew = undefined);                
                        this.setState({contacts});
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddContactModalOpen} onRequestClose={this.handleOnCloseAddContactModal}>
                    <AddContactForm onSaveContact={this.handleOnAddContact} onCloseModal={this.handleOnCloseAddContactModal} />
                </Modal>
                <Modal isOpen={this.state.isEditContactModalOpen} onRequestClose={this.handleOnCloseEditContactModal}>
                    <EditContactForm onSaveContact={this.handleOnEditContact} onCloseModal={this.handleOnCloseEditContactModal} contact={this.state.selectedContact} />
                </Modal>
                <div className="mb-3">
                    <SearchPanel openAddContactModal={this.handleOpenAddContactModal} onFindContacts={this.handleOnFindContacts} />
                </div>
                <ContactsTable contacts={this.state.contacts} onDeleteContact={this.handleOnDeleteContact} onOpenEditContactModal={this.handleOpenEditContactModal} />
            </div>
        );
    }
}

export default ContactsManager;