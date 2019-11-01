import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { getDecks } from "../util/storeApi";
import { AppLoading } from "expo";
import { connect } from 'react-redux'
import { receiveDecks } from "../actions";

class DeckList extends Component {

    state = {
        decks: null,
        ready: false,
        updated: false
    }

    componentDidMount() {
        getDecks()
            .then((result) => this.props.dispatch(receiveDecks(result)))
            .then(() => this.setState(() => ({
                    ready: true
                }))
            )
    }

    loadDecks = () => {
        this.setState(() => ({
            decks: null
        }))
    }




    render() {

        const {ready} = this.state
        const {decks} = this.props
        // console.log('decks ', decks)
        if (ready === false) {
            return (
                <AppLoading/>
            )
        }

        const deckArray = Object.keys(decks).map(title=> (decks[title]))

        return (
            <View style={styles.container}>
                <FlatList contentContainerStyle={{width: '100%'}}
                    data={deckArray}
                    renderItem={(deck) => {
                        return <DeckSummary title={deck.item.title} cards={deck.item.questions.length}/>
                    }}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}

function DeckSummary({ title, cards }) {
    return (
        <View key={title} style={styles.deck} >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{cards} Cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
        width: '100%'
    },
    deck: {
        width: '100%',
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
})

function mapStateToProp(state) {

    return {
        decks: state
    }
}

export default connect(mapStateToProp)(DeckList)
