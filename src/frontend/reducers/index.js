function reducer(state, action) {
    switch (action.type) {
        case 'SET_FAVORITE': {
            const exist = state.myList.find(
                (item) => item.id === action.payload.id
            )
            if (exist) {
                return { ...state }
            }

            return {
                ...state,
                myList: [...state.myList, action.payload],
            }
        }
        case 'DELETE_FAVORITE': {
            return {
                ...state,
                myList: state.myList.filter(
                    (items) => items.id !== action.payload
                ),
            }
        }
        case 'LOGIN_REQUEST': {
            return {
                ...state,
                user: action.payload,
            }
        }
        case 'LOGOUT_REQUEST': {
            return {
                ...state,
                user: action.payload,
            }
        }
        case 'REGISTER_REQUEST': {
            return {
                ...state,
                user: action.payload,
            }
        }
        case 'GET_VIDEO_SOURCE': {
            const payload = Number(action.payload)

            return {
                ...state,
                playing:
                    state.trends.find((item) => item.id === payload) ||
                    state.originals.find((item) => item.id === payload) ||
                    null,
            }
        }
        default: {
            return state
        }
    }
}

export default reducer
