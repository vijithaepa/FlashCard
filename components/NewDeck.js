import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { purple, white } from "../util/colors";
import { saveDeckTitle } from "../util/storeApi";
import { connect } from 'react-redux'
import { addDeckTitle } from "../actions";

class NewDeck extends Component {

    state = {
        title: ''
    }

    onChangeText = (text) => {
        this.setState(() => ({
            title: text
        }))
    }

    onSubmit = () => {

        const {title} = this.state
        // Save to DB
        saveDeckTitle(title)

        // Update Redux
        this.props.dispatch(addDeckTitle(title))

        // Navigate to Decks
        this.gotoDeckView(title)
    }

    gotoDeckView = (title) => {
        this.props.navigation.navigate('Deck', {title: title})
    }

    render() {
        const {title} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    What is the title of your new Deck?
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text)}
                    value={title}
                    placeholder=' Title'
                />
                <TouchableOpacity
                    disabled={title.length < 1}
                    style={[styles.iosSubmitBtn, {backgroundColor: title.length < 1 ? 'gray' : purple}]}
                    onPress={this.onSubmit}>
                    <Text style={styles.btnText}>Create Deck</Text>
                </TouchableOpacity>
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
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800',
        paddingTop: 20,
        paddingBottom: 20
    },
    textInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40,
        marginBottom: 100
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

export default connect()(NewDeck)
