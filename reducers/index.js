import { ADD_CARD, ADD_DECK_TITLE, RECEIVE_DECKS, REMOVE_DECK } from "../actions";

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
        case ADD_CARD:
            const {question, answer} = action.card
            const {title} = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: state[title].questions
                        .concat(
                            {
                                question,
                                answer
                            }
                        )
                }
            }
        case REMOVE_DECK:
            const newDecks = {}
            Object.keys(state)
                .filter(key => key !== action.title)
                .map((key) => {
                    Object.assign(newDecks, {[key]: state[key]})
                    return newDecks;
                });
            return newDecks

    }
}

export default decks
