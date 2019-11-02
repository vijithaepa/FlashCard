import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";
import { purple, white } from "../util/colors";

class NewCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    onSubmit = () => {
        const {question, answer} = this.state

        // Save to DB

        // Update Redux

        // Navigate to Card

        // Clean local notification

    }

    onChangeQuestion = (text) => {
        this.setState(() => ({
            question: text
        }))
    }

    onChangeAnswer = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }

    render() {
        const {question, answer} = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeQuestion(text)}
                    value={question}
                    placeholder=' Question'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeAnswer(text)}
                    value={answer}
                    placeholder=' Answer'
                />

                <TouchableOpacity
                    disabled={question.length < 1 || answer.length < 1}
                    style={[styles.iosSubmitBtn, {backgroundColor: question.length < 1 || answer.length < 1 ? 'gray' : purple}]}
                    onPress={this.onSubmit}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>
                <View style={{ height: 260 }}/>
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
        marginTop: 40,
        // marginLeft: 40,
        borderColor: 'gray',
        borderWidth: 1,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },

    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 80,
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

export default NewCard
