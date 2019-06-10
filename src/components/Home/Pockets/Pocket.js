import React from 'react'
import PropTypes from 'prop-types';

export default function Pocket({pocket}) {
    
    if(!pocket){
        return null;
    }
    return (
        <div data-test="pocketComponent" className="pocket">
            <div className="pocket__title">
                <h5 data-test="pocketTitle">{pocket.title}</h5>
            </div>
            <div className="pocket__balance">
                <p data-test="pocketBalance">{pocket.symbol}{Number(pocket.balance).toFixed(2)}</p>
            </div>
        </div>
    )
}

Pocket.propTypes = {
    pocket: PropTypes.shape({
        title: PropTypes.string,
        balance: PropTypes.number,
        symbol: PropTypes.string,
    }),
}