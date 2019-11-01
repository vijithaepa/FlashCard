import { ADD_DECK_TITLE, RECEIVE_DECKS, REMOVE_DECK } from "../actions";

function decks(state = {}, action) {

    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK_TITLE:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case REMOVE_DECK:
            const newDecks = Object.keys(state)
                .filter(key => key !== action.title)
                .reduce((obj, key) => {
                    obj[key] = raw[key];
                    return obj;
                }, {});
            console.log('New Decks ', newDecks)
            return {
                newDecks
            }
    }
}

export default decks
