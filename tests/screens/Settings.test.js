import React from "react"

import renderer from "react-test-renderer"
import { Settings } from "../../src/screens/Settings"

const navigation = { navigate: jest.fn(), getParam: param => topics }
const user = { name: "test", area: "test", phone: "05501111", price: 1000 }
const student = {
	...user,
	student_id: 1,
	balance: 900,
	my_teacher: { user: {} }
}
const teacher = { ...user, teacher_id: 5, lesson_duration: 40 }
jest.useFakeTimers()
describe("Settings", () => {
	test("view renders correctly for student", () => {
		const tree = renderer
			.create(<Settings user={student} navigation={navigation} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	test("view renders correctly for teacher", () => {
		const tree = renderer
			.create(<Settings user={teacher} navigation={navigation} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
