import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import DeckList from "./components/DeckList";
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { purple, white } from './util/colors'
import NewDeck from "./components/NewDeck";
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'

export default function App() {
    return (
        <Provider store={createStore(reducer)}>
            <TabsView/>
        </Provider>
    );
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
            activeTintColor: Platform.OS === 'ios' ? white : purple,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? purple : white,
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

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
