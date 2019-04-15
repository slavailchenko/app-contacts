import React from 'react';
import PropTypes from 'prop-types';

const ContactsTable = (props) => {
    const contacts = props.contacts;

    const contactsRows = contacts.map(contact => {

        let classes = `small ${!!contact.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={contact._id} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit contact" className="p-2" onClick={() => props.onOpenEditContactModal(contact._id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Delete contact" className="p-2" onClick={() => props.onDeleteContact(contact._id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>                
                </td>
                    <td className="align-middle">{contact.firstName}</td>
                    <td className="align-middle">{contact.lastName}</td>
                    <td className="align-middle">{contact.phone}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">FirstName</th>
                        <th className="align-middle text-center">LastName</th>
                        <th className="align-middle text-center">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {contactsRows}
                </tbody>
            </table>
        </div>
    );
};

ContactsTable.propTypes = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
    onOpenEditContactModal: PropTypes.func
};

export default ContactsTable;