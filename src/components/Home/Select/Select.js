import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectChangeA, selectChangeB } from '../../../actions/pocketsActions';
import PropTypes from 'prop-types';

class Select extends Component {

    //loop through list of existing pockets
    selectPocket = (pockets) => {
        return pockets.map(pocket => {
            return (<option key={pocket.title} value={pocket.title}>{pocket.title}</option>)
        })
    }

    onChange =(val, otherPocket, pockets) => {
        if (this.props.select === 'A') {
            this.props.selectChangeA(val, otherPocket, pockets)
        }else{
            this.props.selectChangeB(val, otherPocket, pockets)
        }
    }

    render() {
        const {assignedPocket, otherPocket, pockets} = this.props;
        
        if(!assignedPocket){
            return null;
        }
        
        return (
            <div data-test="selectComponent">
                <select 
                    className="selectTag"
                    value={assignedPocket.title} 
                    onChange={(e) => { this.onChange(e.target.value, otherPocket, pockets) }} 
                >
                    {this.selectPocket(pockets)}
                </select>
            </div>
        )
    }
}

Select.propTypes = {
    select: PropTypes.string,
    pockets : PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        balance: PropTypes.number,
        symbol: PropTypes.string,
    })),
    assignedPocket: PropTypes.shape({
        title: PropTypes.string,
        balance: PropTypes.number,
        symbol: PropTypes.string,
    }),
    otherPocket: PropTypes.shape({
        title: PropTypes.string,
        balance: PropTypes.number,
        symbol: PropTypes.string,
    }),
    selectChangeA: PropTypes.func,
    selectChangeB: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        pockets: state.pockets.pockets
    }
};


export default connect(mapStateToProps, { selectChangeA, selectChangeB })(Select);