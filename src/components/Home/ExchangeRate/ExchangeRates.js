import React, { Component } from 'react'
import DynamicNumber from 'react-dynamic-number';
import {connect} from 'react-redux';
import { setExchangeRate, exchangeClicked, goBack } from '../../../actions/pocketsActions';
import Select from '../Select/Select';
import Button from '../Button/button';

class Exchange extends Component {
    state = {
        primaryInput: '',
        secondaryInput: ''
    }
    componentDidMount() {
        this.props.setExchangeRate(this.props.rates, this.props.nextPocket.title);
        setInterval(()=>{
            this.props.setExchangeRate(this.props.rates, this.props.nextPocket.title);
        }, 10000)
        
    }

    input1Changed = (e, modelValue, viewValue) => {
        const multiply = this.calcRate(modelValue, this.props.exchangeRate[1]).toFixed(2);
        let val = Number(multiply)    
        this.setState({
            primaryInput: modelValue,
            secondaryInput: val
        })
    };

    input2Changed = (e, modelValue, viewValue) => {
        const multiply = this.calcRate(modelValue, this.props.exchangeRate[1]).toFixed(2);
        let val = Number(multiply)    
        this.setState({
            primaryInput: val,
            secondaryInput: modelValue
        })
    };

    //Calc exchange rate
    calcRate = (value, rate) => {
        let val = Number(value) * Number(rate).toFixed(2)
        return val;
    }

    //Exchanage money between pockets/
    exchange = () => {
        if(this.state.primaryInput <= this.props.selectedPocket.balance){
            let pocketA = this.props.selectedPocket;
            let pocketB = this.props.nextPocket;
            pocketA.balance = (this.props.selectedPocket.balance - this.state.primaryInput);
            pocketB.balance = (this.props.nextPocket.balance + this.state.secondaryInput);
            
            this.props.exchangeClicked(pocketA, pocketB);
            this.setState({
                primaryInput: '',
                secondaryInput: ''
            })
        }
    }

    render() {
        const {selectedPocket, nextPocket, exchangeRate} = this.props;
        return (
            <div >
                <div onClick={()=> this.props.goBack()}>
                    <Button buttonTitle="&larr; Back" classGroup={['btn']}/>
                </div>
                
                <form className="exchange" onSubmit={() => { console.log("submited") }}>
                    <div className="exchange__form">
                        <div className="exchange__select">
                            <Select select="A" assignedPocket={selectedPocket} otherPocket={nextPocket} />
                        </div>
                        <div className="exchange__input">
                            
                            <DynamicNumber placeholder="Debit pocket" onChange={this.input1Changed.bind(this)} value={this.state.primaryInput} separator={'.'} integer={15} fraction={2} thousand={true} />
                        </div>
                        <div className="balance"></div>
                        <span>balance: {selectedPocket.symbol}{ Number(selectedPocket.balance).toFixed(2)}</span>
                    </div>

                    <div className="exchange__form">
                        <div className="exchange__select">
                            <Select select="B" assignedPocket={nextPocket} otherPocket={selectedPocket}/>
                        </div>
                        <div className="exchange__input">
                            <DynamicNumber placeholder="Credit pocket" onChange={this.input2Changed.bind(this)} separator={'.'} integer={15} fraction={2} thousand={true}
                                value= {this.state.secondaryInput}/>
                        </div>
                        <div className="balance"></div>
                        <span>balance: {nextPocket.symbol}{Number(nextPocket.balance).toFixed(2)}</span>
                    </div>
                </form>

                {exchangeRate !== ''
                        ?
                        <div>
                            <p className="exchangeRate">
                                {`  
                                ${selectedPocket.symbol} 1 = 
                                ${nextPocket.symbol} 
                                ${exchangeRate[1].toFixed(4)}
                                `}
                            </p>
                        </div>
                        :
                        null
                    }
                {
                    this.state.secondaryInput > 0 && this.state.primaryInput > 0 && this.state.primaryInput <= selectedPocket.balance
                    ?
                    <div onClick={() => { this.exchange() }}>
                        <Button buttonTitle="Exchange" classGroup={['btn exchangeButton']} />
                    </div>
                    :
                    <Button buttonTitle="Exchange" classGroup={['btn disabled']} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pockets: state.pockets.pockets,
        rates: state.pockets.rates,
        selectedPocket: state.pockets.selectedPocket,
        nextPocket: state.pockets.nextPocket,
        showRates: state.pockets.showRates,
        exchangeRate: state.pockets.exchangeRate
    }
};


export default connect(mapStateToProps, { setExchangeRate, exchangeClicked, goBack })(Exchange);