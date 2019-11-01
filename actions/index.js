export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const REMOVE_DECK = 'REMOVE_DECK'
// export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeckTitle(title) {

    return {
        type: ADD_DECK_TITLE,
        title
    }

}

export function deleteDeck(title) {

    return {
        type: REMOVE_DECK,
        title
    }

}

export function addCard(title, card) {

    return {
        type: ADD_CARD,
        title,
        card
    }

}
