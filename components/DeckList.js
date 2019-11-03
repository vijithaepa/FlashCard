import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants'
import { getDecks } from "../util/storeApi";
import { AppLoading } from "expo";
import { connect } from 'react-redux'
import { receiveDecks } from "../actions";

class DeckList extends Component {

    state = {
        ready: false,
    }

    componentDidMount() {
        getDecks()
            .then((result) => this.props.dispatch(receiveDecks(result)))
            .then(() => this.setState(() => ({
                    ready: true
                }))
            )
    }

    onPressDeck = (title) => {
        this.props.navigation.navigate('Deck', {title: title})
    }


    render() {

        const {ready} = this.state
        const {decks} = this.props
        if (ready === false) {
            return (
                <AppLoading/>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList contentContainerStyle={{width: '100%'}}
                          data={Object.keys(decks).map(title => (decks[title]))}
                          renderItem={(deck) => {
                              return <DeckSummary title={deck.item.title}
                                                  cards={deck.item.questions.length}
                                                  onPress={() => this.onPressDeck(deck.item.title)}/>
                          }}
                          keyExtractor={item => item.title}
                />
            </View>
        )
    }
}

function DeckSummary({title, cards, onPress}) {
    return (
        <View key={title} style={styles.decks}>
            <View style={styles.deck}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{cards} Cards</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    decks: {
        // width: 270
        paddingLeft: 70,
        paddingRight: 50
    },
    deck: {
        width: '70%',
        margin: 20,
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
