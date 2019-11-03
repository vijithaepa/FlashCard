import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Constants from "expo-constants";
import { red, white } from "../util/colors";
import { deleteDeck } from "../actions";
import { removeDeck } from "../util/storeApi";

class Deck extends Component {

    addCard = (title) => {
        this.props.navigation.navigate('NewCard', {title: title})
    }

    startQuiz = (title) => {
        this.props.navigation.navigate('Quiz', {title: title})
    }

    removeDeck = (title) => {
        // Save to DB
        removeDeck(title)

        // Update Redux
        this.props.dispatch(deleteDeck(title))

        // Navigate to Decks
        this.props.navigation.navigate('DeckList')

    }

    render() {
        const {deck} = this.props

        if (deck === undefined) {
            return <View></View>
        }

        return (
            <View style={styles.container}>

                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.text}>{deck.questions.length} Cards</Text>

                <View>
                    <TouchableOpacity style={styles.addCardBtn} onPress={() => this.addCard(deck.title)}>
                        <Text style={styles.addCardBtnText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.startQuizBtn} onPress={() => this.startQuiz(deck.title)}>
                        <Text style={styles.startQuizBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.removeDeck(deck.title)}>
                        <Text style={styles.removeBtn}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '600',
        paddingTop: 40,
        paddingBottom: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 160
    },
    addCardBtn: {
        backgroundColor: white,
        padding: 10,
        margin: 10,
        borderRadius: 7,
        width: 240,
        height: 55,
        borderColor: '#000',
        borderWidth: 1
    },
    startQuizBtn: {
        backgroundColor: '#000',
        padding: 10,
        margin: 10,
        borderRadius: 7,
        width: 240,
        height: 55,
    },
    addCardBtnText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        paddingTop: 5
    },
    startQuizBtnText: {
        fontSize: 20,
        color: white,
        textAlign: 'center',
        paddingTop: 5
    },
    removeBtn: {
        color: 'red',
        fontSize: 20,
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    }
})

function mapStatToProps(state, {navigation}) {
    const {title} = navigation.state.params
    return {deck: state[title]}
}

export default connect(mapStatToProps)(Deck)
