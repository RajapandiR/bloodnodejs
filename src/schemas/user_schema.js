class UserSchema {
	static addUser() {
		return {
			type: "object",
			properties: {
				userName: { type: 'string'},
				fullName: { type: 'string'},
				email: { type: 'string'},
				password: { type: 'string'},
				phoneNo: { type: 'string'},
				role: { type: 'string'},
				status: {type: 'string', default: 'Active'}
			},
			required: ['userName', 'fullName', 'email', 'password', 'role']
		};
	}
}

export default UserSchema;