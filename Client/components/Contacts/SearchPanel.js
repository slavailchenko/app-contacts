import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastName: ''
        };

        this.onSearchLastNameChanged = this.onSearchLastNameChanged.bind(this);
    }

    onSearchLastNameChanged(event) {
        const lastName = event.target.value;
        this.setState({lastName});
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddContactModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Search for contact by LastName ..." value={this.state.lastName} onChange={this.onSearchLastNameChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindContacts(this.state.lastName)} >
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>        
            </div>
        );
    }
}

SearchPanel.propTypes = {
    openAddContactModal: PropTypes.func,
    onFindContacts: PropTypes.func
};

export default SearchPanel;