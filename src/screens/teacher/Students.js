import React, { Fragment } from "react"
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
import { Icon, SearchBar, Button } from "react-native-elements"
import { MAIN_PADDING, floatButton } from "../../consts"
import { Dropdown } from "react-native-material-dropdown"

export class Students extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: "",
			students: [],
			page: 1,
			nextUrl: "",
			orderByColumn: "",
			orderByMethod: "asc",
			sortIcon: "arrow-downward"
		}
		this.sortOptions = [
			{ value: "balance", label: strings("teacher.students.balance") },
			{
				value: "new_lesson_number",
				label: strings("teacher.students.lesson_number")
			}
		]
		this.updateSearch = this.updateSearch.bind(this)
		this._dropdownChange = this._dropdownChange.bind(this)
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			"willFocus",
			payload => {
				this._getStudents(false)
			}
		)
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove()
	}

	_constructAPIUrl = (extra = "") => {
		if (extra) extra = "&" + extra
		if (this.state.orderByColumn) {
			extra += `&order_by=${this.state.orderByColumn} ${
				this.state.orderByMethod
			}`
		}
		if (!extra.includes("is_active")) extra += "&is_active=true"
		if (this.state.search) extra += `&name=${this.state.search}`
		return (
			"/teacher/students?limit=10&is_approved=true&page=" +
			this.state.page +
			extra
		)
	}

	_getStudents = async (append = true) => {
		resp = await this.props.fetchService.fetch(this._constructAPIUrl(), {
			method: "GET"
		})
		let newValue = resp.json["data"]
		if (append) {
			newValue = [...this.state.students, ...newValue]
		}
		this.setState({
			students: newValue,
			nextUrl: resp.json["next_url"]
		})
	}

	updateSearch = search => {
		this.setState({ search }, () => {
			this._getStudents(false)
		})
	}
	renderItem = ({ item, index }) => {
		const greenColor = "rgb(24, 199, 20)"
		let balanceStyle = { color: "red" }
		let imageBalanceStyle
		if (item.balance >= 0) {
			balanceStyle = { color: greenColor }
			imageBalanceStyle = { borderColor: greenColor }
		}
		return (
			<Row
				key={`item${item.student_id}`}
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
				<UserWithPic
					name={item.user.name}
					extra={
						<View style={{ alignItems: "flex-start" }}>
							<Text>
								{strings("teacher.students.lesson_num")}:{" "}
								{item.new_lesson_number}
							</Text>
							<Text style={balanceStyle}>
								{strings("teacher.students.balance")}:{" "}
								{item.balance}₪
							</Text>
						</View>
					}
					nameStyle={styles.nameStyle}
					width={54}
					height={54}
					style={styles.userWithPic}
					imageContainerStyle={{
						...styles.imageContainerStyle,
						...imageBalanceStyle
					}}
				/>
			</Row>
		)
	}

	endReached = () => {
		if (!this.state.nextUrl) return
		this.setState(
			{
				page: this.state.page + 1
			},
			() => {
				this._getStudents()
			}
		)
	}

	_dropdownChange = (value, index, data) => {
		this.setState(
			{
				orderByColumn: value
			},
			() => {
				this._getStudents(false)
			}
		)
	}

	_changeOrderMethod = () => {
		this.setState(
			{
				orderByMethod:
					this.state.orderByMethod == "desc" ? "asc" : "desc",
				sortIcon:
					this.state.sortIcon == "arrow-upward"
						? "arrow-downward"
						: "arrow-upward"
			},
			() => {
				this._getStudents(false)
			}
		)
	}
	render() {
		return (
			<View style={styles.container}>
				<View testID="StudentsView" style={styles.students}>
					<PageTitle
						style={styles.title}
						title={strings("tabs.students")}
						leftSide={
							<View style={{ flexDirection: "row" }}>
								<TouchableHighlight
									onPress={this._changeOrderMethod}
									style={styles.sortButton}
									underlayColor="lightgray"
								>
									<Icon
										type="material"
										name={this.state.sortIcon}
									/>
								</TouchableHighlight>

								<Dropdown
									containerStyle={styles.dropdown}
									label={strings("sort_by")}
									data={this.sortOptions}
									onChangeText={this._dropdownChange}
									dropdownMargins={{ min: 0, max: 20 }}
									dropdownOffset={{ top: 0, left: 0 }}
									pickerStyle={{ marginTop: 60 }}
								/>
							</View>
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
						cancelButtonTitle={""}
					/>

					<FlatList
						data={this.state.students}
						renderItem={this.renderItem}
						onEndReached={this.endReached}
						keyExtractor={item => `item${item.student_id}`}
					/>
				</View>
				<TouchableHighlight
					underlayColor="#ffffff00"
					onPress={() => {
						this.props.navigation.navigate("NewStudent")
					}}
				>
					<View testID="newStudentButton" style={floatButton}>
						<Text style={styles.buttonText}>
							{strings("teacher.students.add")}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		maxHeight: 60
	},
	students: {
		flex: 1,
		paddingRight: MAIN_PADDING,
		paddingLeft: MAIN_PADDING,
		marginTop: 20
	},
	title: { marginBottom: 0 },
	row: {
		marginTop: 24
	},
	nameStyle: {},
	arrow: {
		flex: 1,
		marginRight: "auto"
	},
	userWithPic: { marginLeft: 10 },
	imageContainerStyle: {
		padding: 2,
		borderWidth: 2,
		borderRadius: 37,
		maxHeight: 62,
		marginTop: 4
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
	},
	dropdown: {
		alignSelf: "flex-end",
		width: 120,
		marginTop: 4
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 20
	},
	sortButton: {
		marginRight: 6,
		marginTop: 6
	}
})

function mapStateToProps(state) {
	return {
		fetchService: state.fetchService
	}
}

export default connect(mapStateToProps)(Students)