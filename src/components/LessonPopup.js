import React, { Fragment } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { strings } from "../i18n"
import Hours from "./Hours"
import moment from "moment"
import { fullButton, NAME_LENGTH, DATE_FORMAT } from "../consts"
import { getUserImage } from "../actions/utils"
import UserPic from "./UserPic"

export default class LessonPopup extends React.Component {
	constructor(props) {
		super(props)
		this.navigateToProfile = this.navigateToProfile.bind(this)
		this.navigateToLesson = this.navigateToLesson.bind(this)
	}

	navigateToLesson = () => {
		this.props.onPress(this.props.item)
		this.props.navigation.navigate("Lesson", {
			lesson: this.props.item
		})
	}

	navigateToProfile = () => {
		this.props.onPress(this.props.item)
		this.props.navigation.navigate("StudentProfile", {
			student: this.props.item.student
		})
	}

	render() {
		const { item } = this.props
		if (!item) return null
		let meetup = strings("not_set")
		if (item.meetup_place) meetup = item.meetup_place.name
		let dropoff = strings("not_set")
		if (item.dropoff_place) dropoff = item.dropoff_place.name
		let approved
		if (!item.is_approved) {
			approved = (
				<Text style={styles.approved}>{strings("not_approved")}</Text>
			)
		}

		let studentInfo
		if (!item.student) {
			studentInfo = (
				<Text style={{ ...styles.title, alignSelf: "center" }}>
					{strings("teacher.no_student_applied")}
				</Text>
			)
		} else {
			const name = item.student.user.name.slice(0, NAME_LENGTH)
			const number = `${strings("teacher.home.lesson_number")} ${
				item.lesson_number
			}`
			studentInfo = (
				<TouchableOpacity
					style={styles.userRow}
					onPress={this.navigateToProfile}
				>
					<Fragment>
						<View style={styles.imageView}>
							<UserPic
								user={item.student.user}
								width={styles.image.width}
								height={styles.image.height}
							/>
						</View>
						<View style={styles.userInfo}>
							<Text style={styles.title}>{name}</Text>
							<Text style={styles.lessonNumber}>{number}</Text>
							<Text style={styles.lessonNumber}>
								{strings("lesson_price")}: {item.price}₪
							</Text>
						</View>
					</Fragment>
				</TouchableOpacity>
			)
		}
		return (
			<Modal
				isVisible={this.props.visible}
				onBackdropPress={() => this.props.onPress(item)}
				animationIn="pulse"
				animationOut="fadeOut"
			>
				<View style={styles.popup} testID={this.props.testID}>
					{studentInfo}
					{approved}
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.titles}>
								{strings("teacher.new_lesson.date")}
							</Text>
							<Text style={styles.texts}>
								{moment
									.utc(item.date)
									.local()
									.format(DATE_FORMAT)}
							</Text>
						</View>
						<View style={{ ...styles.column, marginLeft: 2 }}>
							<Text style={styles.titles}>
								{strings("teacher.new_lesson.hour")}
							</Text>
							<Hours
								style={styles.texts}
								duration={item.duration}
								date={item.date}
							/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.titles}>
								{strings("teacher.new_lesson.meetup")}
							</Text>
							<Text style={styles.texts}>{meetup}</Text>
						</View>
						<View style={{ ...styles.column, marginLeft: 2 }}>
							<Text style={styles.titles}>
								{strings("teacher.new_lesson.dropoff")}
							</Text>
							<Text style={styles.texts}>{dropoff}</Text>
						</View>
					</View>
					<TouchableOpacity
						underlayColor="#ffffff00"
						onPress={this.navigateToLesson}
						style={styles.button}
					>
						<View testID="editLessonButton">
							<Text style={styles.buttonText}>
								{strings("edit_lesson")}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	popup: {
		flex: 1,
		maxHeight: 340,
		backgroundColor: "#fff",
		padding: 26,
		alignSelf: "center",
		width: 320,
		alignContent: "center",
		borderRadius: 4
	},
	userRow: {
		flexDirection: "row",
		alignSelf: "center",
		alignItems: "center",
		width: 180
	},
	imageView: {
		flex: 1,
		width: 48,
		alignSelf: "flex-start",
		justifyContent: "flex-start",
		marginTop: 24
	},
	image: { width: 48, height: 48 },
	userInfo: {
		flexDirection: "column",
		flex: 2,
		marginLeft: "auto",
		justifyContent: "flex-start",
		marginTop: -6,
		marginRight: -24
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		alignSelf: "flex-start",
		marginTop: 16,
		maxHeight: 20
	},
	lessonNumber: {
		marginTop: 4,
		alignSelf: "flex-start",
		color: "gray"
	},
	approved: { alignSelf: "center", marginTop: 8, color: "red" },
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
		maxHeight: 60
	},
	column: {
		flexDirection: "column",
		justifyContent: "flex-start",
		width: 160
	},
	titles: {
		fontWeight: "bold",
		fontSize: 14,
		color: "gray",
		alignSelf: "flex-start"
	},
	texts: { fontSize: 18, marginTop: 6, alignSelf: "flex-start" },
	button: { ...fullButton, width: 320 },
	buttonText: {
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20
	}
})
