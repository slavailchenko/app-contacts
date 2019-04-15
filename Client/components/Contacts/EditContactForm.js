import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class EditContactForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: props.contact._id,
            firstName: props.contact.firstName,
            lastName: props.contact.lastName,
            phone: props.contact.phone,
            validationErrors: []
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        // this.onFieldChange = this.onFieldChange.bind(this);
        this.onSave = this.onSave.bind(this);

    }
    
    onFirstNameChange(event) {
        const firstName = event.target.value.trim();

        this.validateField(firstName);

        this.setState({ firstName: firstName });
    }

    onLastNameChange(event) {
        const lastName = event.target.value.trim();

        this.validateField(lastName);

        this.setState({ lastName: lastName });
    }

    onPhoneChange(event) {
        const phone = event.target.value.trim();

        this.validateField(phone);

        this.setState({ phone: phone });     
    }

    
    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { _id, firstName, lastName, phone } = this.state;
            
            if (this.validateField(firstName) 
                && this.validateField(lastName)
                && this.validateField(phone)) {
                this.props.onSaveContact({
                    _id: this.state._id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phone: this.state.phone
                });
            }
        }
    }
    
    validateField(field) {
        const message = `Field is required`;

        if (field === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }

    addValidationError(message) {        
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);
            
            return {
                validationErrors: validationErrors
            };
        });      
    }

   
    render() {

        const validationErrorSummary = this.state.validationErrors.map(error => 
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> Edit contact</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove mr-2 fa-2x text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="firstName">FirstName</label>
                        <input type="text" className="form-control" name="firstName" autoFocus onChange={this.onFirstNameChange} value={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">LastName</label>
                        <input type="text" className="form-control" name="lastName" autoFocus onChange={this.onLastNameChange} value={this.state.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" name="phone" onChange={this.onPhoneChange} value={this.state.phone} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditContactForm.propTypes = {
    contact: PropTypes.object,
    onCloseModal: PropTypes.func,
    onSaveContact: PropTypes.func
};

export default EditContactForm;