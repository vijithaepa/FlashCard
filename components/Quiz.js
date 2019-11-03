import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from "expo-constants";
import { darkGreen, red, white } from "../util/colors";
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from "../util/helper";

class Quiz extends Component {

    state = {
        correctAnswers: [],
        incorrectAnswers: [],
        currentIndex: 0,
        isAnswer: false
    }

    toggleQuiz = () => {
        this.setState((state) => ({
            isAnswer: !state.isAnswer
        }))
    }

    correctAnswer = (question) =>{
        this.setState((state) => {
            return {
                correctAnswers: state.correctAnswers.concat(question),
                currentIndex: state.currentIndex + 1,
                isAnswer: false
            }
        })

        // Clear notification to study
        clearLocalNotification()
            .then(setLocalNotification())
    }

    incorrectAnswer = (question) => {
        this.setState((state) => {
            return {
                incorrectAnswers: state.incorrectAnswers.concat(question),
                currentIndex: state.currentIndex + 1,
                isAnswer: false
            }
        })
    }

    restartQuiz = () => {
        this.setState(() =>{
            return {
                correctAnswers: [],
                incorrectAnswers: [],
                currentIndex: 0,
                isAnswer: false
            }
        })
    }
    backToDeck = (title) => {
        this.props.navigation.navigate('Deck', {title: title})
    }

    render() {
        const {deck, noOfQuestions} = this.props
        const index = this.state.currentIndex

        if (noOfQuestions === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sorry you cannot take a quiz.
                        Because there are no cards in the deck</Text>
                </View>
            )
        }
        if (index >= noOfQuestions) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Congratulations! You have answered all the questions</Text>
                    <Text style={styles.text}>You are correct on {this.state.correctAnswers.length} out
                        of {noOfQuestions}</Text>

                    <TouchableOpacity style={styles.correctBtn} onPress={() => this.restartQuiz()}>
                        <Text style={styles.btnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrectBtn} onPress={() => this.backToDeck(deck.title)}>
                        <Text style={styles.btnText}>Back to Dec</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const quiz = deck.questions[index]

        return (
            <View style={styles.container}>
                <Text style={styles.count}>Question {index + 1} of {noOfQuestions}</Text>
                <ScrollView style={styles.scrollView}>
                    <Text
                        style={styles.text}>{this.state.isAnswer ? quiz.answer : quiz.question}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.toggleBtn} onPress={() => this.toggleQuiz()}>
                    <Text style={styles.toggleBtnText}>{this.state.isAnswer ? 'Show Question' : 'Show Answer'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.correctBtn} onPress={() => this.correctAnswer(quiz.question)}>
                    <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrectBtn} onPress={() => this.incorrectAnswer(quiz.question)}>
                    <Text style={styles.btnText}>Incorrect</Text>
                </TouchableOpacity>
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
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        paddingTop: 40,
        paddingBottom: 10
    },
    correctBtn: {
        backgroundColor: darkGreen,
        padding: 10,
        margin: 10,
        borderRadius: 7,
        width: 240,
        height: 55,
    },
    incorrectBtn: {
        backgroundColor: red,
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
    toggleBtn: {
        marginBottom: 35
    },
    toggleBtnText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 30,
        fontWeight: '800',
    },
    scrollView: {
        height: 5000
    },
    count: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})

function mapStateToProps(state, {navigation}) {
    const {title} = navigation.state.params
    const deck = state[title]
    const count = deck && deck.questions ? deck.questions.length : 0
    return {
        deck: state[title],
        noOfQuestions: count
    }
}

export default connect(mapStateToProps)(Quiz)
