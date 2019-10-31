import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { getDecks } from "../util/storeApi";
import { AppLoading } from "expo";

export default class DeckList extends Component {

    state = {
        decks: null,
        ready: false
    }

    componentDidMount() {
        getDecks()
        // .then((result) => JSON.stringify(result))
            .then((result) => {
                this.setState(() => ({
                    decks: result,
                    ready: true
                }))

            })
    }

    render() {
        const {decks, ready} = this.state

        if (ready === false) {
            return (
                <AppLoading/>
            )
        }

        return (
            <View style={styles.container}>

                {Object.keys(decks).map(deckTitle => {
                    const cards = decks[deckTitle].questions.length
                    return (
                        <View key={deckTitle} style={styles.deck}>
                            <Text style={styles.title}>{deckTitle}</Text>
                            <Text style={styles.text}>{cards} Cards</Text>
                        </View>
                    )
                })}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    deck: {
        width: '60%',
        marginTop: 20,
        marginBottom:20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800',
        paddingTop: 20,
        paddingBottom: 20
    },
    text: {
        textAlign: 'center'
    },
    hline: {
        width: '100%'
    }
})
