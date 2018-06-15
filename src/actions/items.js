import { ITEMS_FETCH_DATA_SUCCESS, ITEMS_FETCH_DATA_FAIL, ITEMS_FETCH_DATA_REQUEST } from '../constants';

export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchDataFail(error) {
    return {
        type: ITEMS_FETCH_DATA_FAIL,
        error
    };
}


export function itemsFetchDataResponse() {
    return {
        type: ITEMS_FETCH_DATA_REQUEST,
    };
}

export function itemsFetchData(url) {
        return (dispatch) => {
            dispatch(itemsFetchDataResponse);
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }

                    return response;
                })
                .then((response) => response.json())
                .then((items) => dispatch(itemsFetchDataSuccess(items)))
                .catch((error) => dispatch(itemsFetchDataFail(error)));
        };
}

// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsFetchDataResponse);
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)));
//     };
// }