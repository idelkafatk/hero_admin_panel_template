// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'Все'
// }
//
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload.heroes,
//                 heroesLoadingStatus: 'idle',
//             }
//         case 'ACTIVE_FILTER':
//             return {
//                 ...state,
//                 activeFilter: action.payload
//             }
//
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETING':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter((item) => item.id !== action.payload.id),
//                 heroesLoadingStatus: 'deleting'
//             }
//         case 'HEROES_ADDING':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload.hero],
//             }
//         default: return state
//     }
// }
//
// export default reducer;