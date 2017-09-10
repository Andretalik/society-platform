import React from 'react';

const SocietyInfo = (props) => {
    return (
        <div id="bottom-right">
            <div id="points-indicator">
                <span className="number">{props.score}</span>
                <span className="label">Society points</span>
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

export default SocietyInfo;
