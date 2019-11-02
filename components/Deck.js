import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Constants from "expo-constants";
import { purple, red, white } from "../util/colors";

class Deck extends Component {

    addCard = (title) => {
        this.props.navigation.navigate('NewCard', {title: title})
    }

    startQuiz = () => {

    }

    removeDeck = () => {

    }

    render() {
        const {deck} = this.props
        return (
            <View style={styles.container}>

                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.text}>{deck.questions.length} Cards</Text>

                    <View>
                        <TouchableOpacity style={styles.btn} onPress={()=>this.addCard(deck.title)}>
                            <Text style={styles.btnText}>Add Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={()=>this.startQuiz()}>
                            <Text style={styles.btnText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                <View>
                    <TouchableOpacity  onPress={()=>this.removeDeck()}>
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
    btn: {
        backgroundColor: purple,
        padding: 10,
        margin: 10,
        borderRadius: 7,
        width: 240,
        height: 55,
    },
    btnText: {
        fontSize: 20,
        color: white,
        textAlign: 'center',
        paddingTop: 5
    },
    removeBtn : {
        color: 'red',
        fontSize: 20,
        fontWeight: '600',
        padding: 10,
        margin: 20,
        width: 160,
        height: 45,
    }
})

function mapStatToProps(state, {navigation}) {
    const {title} = navigation.state.params
    return {deck: state[title]}
}

export default connect(mapStatToProps)(Deck)
