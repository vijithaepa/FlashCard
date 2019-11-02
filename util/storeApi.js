import { AsyncStorage } from 'react-native'
import { FLASHCARD_DECKS_KEY, setDefaultDecks } from "./InitialData";


export function getDecks() {
    // clearDecks()
    return AsyncStorage.getItem(FLASHCARD_DECKS_KEY)
        .then(formatDecksResults)
}

export function getDeck(id) {
    return AsyncStorage.getItem(FLASHCARD_DECKS_KEY)
        .then(JSON.parse(result))
        .then((result) => {
            return result.filter(deck => {
                return deck.title === id
            })
        })
}

export function saveDeckTitle(title) {
    const result = AsyncStorage.getItem(FLASHCARD_DECKS_KEY)
        .then((result) => {

            result = Object.assign(JSON.parse(result), {
                [title]: {
                    title: title,
                    questions: []
                }
            });

            // const gg = JSON.parse(result)
            // gg[title] = {
            //     title: title,
            //     questions: []
            // }
            return AsyncStorage.mergeItem(FLASHCARD_DECKS_KEY, JSON.stringify(result))

        })
}

export function addCardToDeck(title, {question, answer}) {
    AsyncStorage.getItem(FLASHCARD_DECKS_KEY)
        .then(decks => (JSON.parse(decks)))
        .then((decks) => {
            Object.keys(decks).map(id => {
                if (id === title) {
                    decks[id].questions.push({
                        question,
                        answer
                    })
                }
            })
            return AsyncStorage.mergeItem(FLASHCARD_DECKS_KEY, JSON.stringify(decks))
        })
}

export function removeDeck(title) {
    AsyncStorage.getItem(FLASHCARD_DECKS_KEY)
        // .then(decks => (JSON.parse(decks)))
        .then(decks => {
            const data = JSON.parse(decks)
            data[title] = undefined
            delete data[title]

            AsyncStorage.setItem(FLASHCARD_DECKS_KEY, JSON.stringify(data))
        })
}

export function clearDecks() {
    AsyncStorage.removeItem(FLASHCARD_DECKS_KEY)
        .then(() => {
            console.log('removed')
        })
}


export function formatDecksResults(results) {
    return results === null || results.length === 0
        ? setDefaultDecks()
        : JSON.parse(results)
}
