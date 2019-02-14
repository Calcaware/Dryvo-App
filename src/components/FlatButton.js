import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default class Row extends React.Component {
	render() {
		return (
			<View
				style={{ ...styles.button, ...this.props.style }}
				testID={this.props.testID}
			>
				<Text style={styles.text}>{this.props.title}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "rgb(12,116,244)",
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		width: 140,
		borderRadius: 24
	},
	text: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14
	}
})
