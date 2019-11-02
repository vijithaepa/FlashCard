import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants'
import DeckList from "./components/DeckList";
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { darkGreen, lightGreen, lightPurp, purple, white } from './util/colors'
import NewDeck from "./components/NewDeck";
import Deck from './components/Deck'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'
import NewCard from "./components/NewCard";

export default function App() {
    return (
        <Provider store={createStore(reducer)}>
            <FlashcardStatusBar backgroundColor={lightGreen}/>
            <MainNavigation/>
        </Provider>
    );
}

function FlashcardStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor,  height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs = createBottomTabNavigator({
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({focused, horizontal, tintColor}) => <Ionicons name='ios-list' size={30}
                                                                            color={tintColor}/>
            }
        },
        AddDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({focused, horizontal, tintColor}) => <Ionicons name='ios-add' size={30}
                                                                            color={tintColor}/>
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? white : darkGreen,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? darkGreen : white,
                shadowColor: 'rgba(0,0,0,0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1,
            }
        }
    }
)

const TabsView = createAppContainer(Tabs)

const MainNavigation = createAppContainer(createStackNavigator({
    Home: {
        screen: TabsView,
        navigationOptions: {
            headerBackTitle: 'Back To Decks',
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: darkGreen
            },
            headerBackTitle: 'Back To Card',
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: darkGreen
            }
        }
    }
}))



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
