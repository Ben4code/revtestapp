import React, { Component } from 'react'
import Pocket from './Pockets/Pocket';
import { connect } from 'react-redux';
import { getPockets, pocketClicked, clearError } from '../../actions/pocketsActions';
import ExchangeRate from './ExchangeRate/ExchangeRates'
import ImageBg from '../../assets/img/Currency.png';
import './Home.css';






class Home extends Component {

    componentDidMount() {
        this.props.getPockets();
    }

    showPocket = (pockets) => {
        const { pocketClicked } = this.props;
        return pockets.map(pocket => {
            return (
                <div key={pocket.title} onClick={() => { pocketClicked(pocket, pockets) }}>
                    <Pocket pocket={pocket} />
                </div>
            )
        })
    }

    showError = (error) => {
        setTimeout(() => {
            this.props.clearError();
        }, 2000);
        return <p className="error">{error}</p>
    }

    render() {

        const { pockets, showRates, error } = this.props;

        return (
            <div data-test="homeComponent" className="home " style={{ backgroundImage: `url(${ImageBg})` }}>
                <div className="home__content">
                    <div className="home__content-text">
                        {this.props.error ? this.showError(error) : null}
                        <h1>Welcom to Xchange</h1>
                        <p>Now you can manage and exchange funds within your existing pockets easily with a click of a button.</p>
                        <div>
                            <h3>My Pockets</h3>
                            <div> You have {pockets.length} pockets.</div>  
                            
                            {
                                !showRates
                                ?
                                <div className="pockets">
                                    {this.showPocket(pockets)}
                                </div>
                                :
                                <ExchangeRate />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        pockets: state.pockets.pockets,
        showRates: state.pockets.showRates,
        error: state.errors.error
    }
};

export default connect(mapStateToProps, { getPockets, pocketClicked, clearError })(Home);