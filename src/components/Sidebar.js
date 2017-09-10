import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = props => {
    
    let societies = props.societies.map( society => {
        return <Link key={society.uuid} to={"/society/"+society.uuid} className="navlink"><i className="fa fa-group"></i> {society.name}</Link>;
    });
    
    return (
        <div id="sidebar-content">
            <Link to="/" className="navlink"><i className="fa fa-home"></i> Home</Link>
            <Link to="/contributions" className="navlink"><i className="fa fa-list-alt"></i> Contributions</Link>
            <Link to="/logged-activities" className="navlink"><i className="fa fa-list-alt"></i> Logged activities</Link>
            <Link to="/stats" className="navlink"><i className="fa fa-area-chart"></i> Stats</Link>
            <span className="navlink-title">Societies</span>
            {societies}
        </div>
    );
}

export default Sidebar;
