class RoleSchema {
	static addRole() {
		return {
			type: "object",
			properties: {
				role: { type: 'string'},
				status: { type: 'string', default : "Active" }
			},
			required: ['role']
		};
	}
}

export default RoleSchema;