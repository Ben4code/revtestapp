import React from 'react'
import PropTypes from 'prop-types';


export default function Index(props) {
    
    const {buttonTitle, classGroup} = props;
    
    if(!buttonTitle){
        return null;
    }

    return (
        <div data-test="buttonComponent">
            <button data-test="buttonRender" className={classGroup}>{buttonTitle}</button>
        </div>
    )
}

Index.propTypes = {
    buttonTitle: PropTypes.string,
    classGroup : PropTypes.array
}