class AuthSchema {
  static loginSchema() {
    return {
      type: 'object',
      properties: {
        userName: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['userName', 'role', 'password']
    };
  }
}

export default AuthSchema;
