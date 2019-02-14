import React from "react"
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	FlatList
} from "react-native"
import { connect } from "react-redux"
import { strings } from "../../i18n"
import Row from "../../components/Row"
import PageTitle from "../../components/PageTitle"
import UserWithPic from "../../components/UserWithPic"
import { Icon, SearchBar } from "react-native-elements"
import FlatButton from "../../components/FlatButton"

export class Students extends React.Component {
	static navigationOptions = () => {
		return {
			title: "students",
			tabBarLabel: strings("tabs.students"),
			tabBarAccessibilityLabel: strings("tabs.students"),
			tabBarTestID: "StudentsTab"
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			search: ""
		}
		this.updateSearch = this.updateSearch.bind(this)
	}

	updateSearch = search => {
		this.setState({ search })
	}

	render() {
		return (
			<View style={styles.container}>
				<View testID="StudentsView" style={styles.students}>
					<PageTitle
						style={styles.title}
						title={strings("tabs.students")}
						leftSide={
							<TouchableHighlight>
								<FlatButton
									testID="addStudentButton"
									title={strings("teacher.students.add")}
								/>
							</TouchableHighlight>
						}
					/>

					<SearchBar
						placeholder={strings("teacher.students.search")}
						onChangeText={this.updateSearch}
						value={this.state.search}
						platform="ios"
						containerStyle={styles.searchBarContainer}
						inputContainerStyle={styles.inputContainerStyle}
						cancelButtonTitle={strings("teacher.students.cancel")}
						inputStyle={styles.search}
						textAlign="right"
					/>
					<FlatList
						data={[
							{ title: "Title Text", key: "item1" },
							{ title: "Title Text", key: "item2" },
							{ title: "Title Text", key: "item3" },
							{ title: "Title Text", key: "item4" }
						]}
						renderItem={({ item }) => (
							<Row
								style={styles.row}
								leftSide={
									<Icon
										style={styles.arrow}
										name="ios-arrow-back"
										type="ionicon"
										color="#000"
									/>
								}
							>
								<Icon
									name="error"
									type="ionicons"
									color="rgb(24,199,20)"
								/>
								<UserWithPic
									name="רונן רוזנטל"
									extra={`${strings(
										"teacher.students.lesson_num"
									)}: 13`}
									nameStyle={styles.nameStyle}
									width={54}
									height={54}
									style={styles.userWithPic}
									imageContainerStyle={
										styles.imageContainerStyle
									}
								/>
							</Row>
						)}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	students: {
		flex: 1,
		paddingRight: 30,
		paddingLeft: 20,
		marginTop: 20
	},
	title: { marginBottom: 0 },
	row: {
		marginTop: 24
	},
	nameStyle: {
		marginTop: 6
	},
	arrow: {
		flex: 1,
		marginRight: "auto"
	},
	userWithPic: { marginLeft: 10 },
	imageContainerStyle: {
		padding: 2,
		borderColor: "rgb(24,199,20)",
		borderWidth: 2,
		borderRadius: 37
	},
	searchBarContainer: {
		backgroundColor: "transparent",
		paddingBottom: 0,
		paddingTop: 0,
		marginTop: 20
	},
	inputContainerStyle: {
		borderRadius: 30,
		paddingLeft: 8,
		width: "100%",
		marginLeft: 0,
		marginRight: 0
	},
	search: {
		alignItems: "flex-start",
		paddingLeft: 6,
		fontSize: 14,
		marginLeft: 0
	}
})

export default connect()(Students)
