import React, { Component } from "react"
import { Provider } from "react-redux"
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer
} from "react-navigation"
import NormalUser from "./screens/normal_user"
import Teacher from "./screens/teacher"
import Student from "./screens/student"
import UserLoading from "./screens/UserLoading"
import SignIn from "./screens/auth/SignIn"
import SignUp from "./screens/auth/SignUp"
import AuthLoading from "./screens/auth/AuthLoading"
import configureStore from "./Store"

const store = configureStore()

const App = createSwitchNavigator(
	{
		Teacher: Teacher,
		Student: Student,
		NormalUser: NormalUser,
		UserLoading: UserLoading
	},
	{
		initialRouteName: "UserLoading"
	}
)
const AuthStack = createStackNavigator(
	{ SignIn: SignIn, SignUp: SignUp },
	{ initialRouteName: "SignIn" }
)
const Page = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoading,
			App: App,
			Auth: AuthStack
		},
		{
			initialRouteName: "AuthLoading"
		}
	)
)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Page />
			</Provider>
		)
	}
}
