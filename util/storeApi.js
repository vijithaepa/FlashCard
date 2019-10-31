import { AsyncStorage } from 'react-native'
import { setDefaultDecks } from "./InitialData";


export function getDecks() {

    return AsyncStorage.getItem('decks')
        .then(formatDecksResults)
}

export function getDeck(id) {
    return AsyncStorage.getItem('decks')
        .then(JSON.parse(result))
        .then((result) => {
            return result.filter(deck => {
                return deck.title === id
            })
        })
}

export function saveDeckTitle(title) {

}

export function addCardToDeck(title, card) {

}

export function clearDecks() {
    AsyncStorage.removeItem('decks')
        .then(()=> {
            console.log('removed')
        })
}


export function formatDecksResults(results) {
    return results === null || results.length === 0
        ? setDefaultDecks()
        : JSON.parse(results)
}
