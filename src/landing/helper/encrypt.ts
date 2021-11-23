import bcrypt from 'bcryptjs'

const salt = '$2a$10$Au1.d7zYv8D84uU/LEgozO'

export const encrypt = (plain: string) => bcrypt.hashSync(plain, salt)
