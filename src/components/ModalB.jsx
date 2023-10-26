import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalC from './ModalC';

function ModalB() {
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(true);
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (e, d) => {
        e.preventDefault();
        setSelectedContact(d);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        if (isChecked) {
            setData(data.filter(d => d.id % 2 === 0));
        } else {
            setReload(!reload);
        }
    }, [isChecked]);

    useEffect(() => {
        // Define the URL of the API you want to fetch data from
        const apiUrl = `https://contact.mediusware.com/api/country-contacts/United States/`; // Replace with your API URL

        // Make a GET request to the API
        fetch(apiUrl, { mode: "cors" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Set the fetched data to the state

                setData(data.results);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [reload]);


    return (
        <div>
            <div className={`modal${show ? ' show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Contact List</h5>
                            <Link to='/problem-2'><button type="button" className="btn-close"></button></Link>
                        </div>
                        <div className="modal-body overflow-scroll" style={{ height: '300px' }}>
                            <Link to='/problem-2/modal-a'><button className="btn mx-1 btn-a">All Contacts</button></Link>
                            <Link to='/problem-2/modal-b'><button className="btn btn-b mx-1"> US Contacts </button></Link>
                            <Link to='/problem-2'><button type="button" className="btn btn-c mx-1"> Close </button></Link>


                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((d, i) => (
                                            <tr key={i} onClick={(e) => handleShowModal(e, d)}>
                                                <td>{d.id}</td>
                                                <td>{d.country.name}</td>
                                                <td>{d.phone}</td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>
                            <ModalC show={showModal} handleClose={handleCloseModal} data={selectedContact} />


                        </div>
                        <div className="modal-footer d-flex justify-content-start">
                            <div className="form-check" >
                                <input type="checkbox" className="form-check-input" id="filterCheckbox" checked={isChecked} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="filterCheckbox"> Only Even </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalB;
