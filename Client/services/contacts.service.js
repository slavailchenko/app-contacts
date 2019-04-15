import * as axios from 'axios';

const baseApiUrl = 'http://localhost:8081/api/v1';

export const addContact = (firstName, lastName, phone) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/contacts`, { 
                'firstName': firstName,
                'lastName': lastName,
                'phone': phone
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });

    });

};

export const findContact = (id) => {
    
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/contacts/${id}`)
            .then(res => {
                resolve(res.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};


export const findContactsByLastName = (lastName) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/contacts?lastName=${lastName}`)
            .then(res => {
                resolve(res.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

export const listContacts = () => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/contacts`)
            .then(res => {
                resolve(res.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

export const removeContact = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/contacts/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

export const updateContact = (contact) => { 

    console.log(contact);

    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/contacts/${contact._id}`, {
                'firstName': contact.firstName,
                'lastName': contact.lastName,
                'phone': contact.phone
            })
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};

