import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items');
    }


    renderItems = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <li key={item.id}>
                        {item.label}
                        <ul>
                            {this.renderItems(item.children)}
                        </ul>
                    </li>
                )
            }
            return (
                <li key={item.id}>
                    {item.label}
                </li>
            );
        });
    };

    _sortItems = (list) => {
        let initArr = list.slice();
        const resultArr = [];

        for (let i = 0; i < initArr.length; i++) {
            initArr.forEach((item) => {
                if (item['parent_id'] === i + 1) {
                    if (!initArr[i].children) {
                        initArr[i].children = [];
                    }
                    initArr[i].children.push(item);
                }
            });
        }

        initArr.forEach((item) => {
            if (item['parent_id'] === 0) {
                resultArr.push(item);
            }
        });

        return resultArr;
    };

    showError = () => {
        return <h3>{this.props.error}</h3>;
    };

    showList = (list) => {
        return this.props.loading ? <h2>Loading</h2> : this.renderItems(list);
    };


    render() {
        const {items} = this.props;

        const sortItems = this._sortItems(items);

        return (
            <ul>
                <h1>Sorted list</h1>
                {this.props.error ? this.showError() : this.showList(sortItems)}
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
        loading: state.items.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
