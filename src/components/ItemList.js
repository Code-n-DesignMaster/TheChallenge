import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items');
    }

    renderItems = data => {
        return data.map((item) => (
            <li key={item.id}>
                {item.label}
            </li>
        ));
    };

    showError = () => {
        return <h3>{this.props.error}</h3>;
    };

    showList = () => {
        return this.props.loading ? <h2>Loading</h2> : this.renderItems(this.props.items);
    };

    render() {
        return (
            <ul>
                {this.props.error ? this.showError() : this.showList()}
            </ul>
        );
    }
}

ItemList.propTypes = {
    // from connect
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items.state,
        loading: state.items.loading,
        error: state.items.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
