import { Button } from "react-native"
import React from "react"

import renderer from "react-test-renderer"

import { SignUp } from "../../src/screens/auth/SignUp"

const navigation = { navigate: jest.fn(), getParam: param => "student" }
describe("SignUp", () => {
	test("view renders correctly", () => {
		const tree = renderer
			.create(<SignUp navigation={navigation} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
