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

        // console.log("Decks ", ready, decks)
        Object.keys(decks).map(title => {
            console.log('Title ', title, decks[title])
        })
        return (
            <View style={styles.container}>

                {Object.keys(decks).map(deckTitle => {
                    return (
                        <View key={deckTitle}>
                            <Text>{deckTitle}</Text>
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
    }
})
