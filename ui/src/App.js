import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import ManagerPane from './Components/ManagerPane';
import PropTypes from 'prop-types';
import Feedback from './Components/Feedback';
import { UserContext } from './Components/UserContext';

const App = (props) => {
    const [page, setPageName] = useState("NotSet");
    const [managerView, setManagerView] = useState(false);
    const [employeeView, setEmployeeView] = useState(false);

    const handleClick = (name) => {
        setPageName(name);
        if (name === "employee") {
            setEmployeeView(true);
            setManagerView(false);
        }
        else if (name === "manager") {
            setManagerView(true);
            setEmployeeView(false);
        }
    };
    useEffect(() => {
        console.log("Effect" + page);
    });
    return (
        <UserContext.Provider value={page}>
            <div >
                <NavBar page={page} onClick={(name) => handleClick(name)} />
                {managerView ? <ManagerPane props={props} /> : null}
                {employeeView ? <Feedback /> : null}
            </div>

        </UserContext.Provider>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
