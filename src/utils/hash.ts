import bcrypt from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = bcrypt.hash(password, salt)

    return hashedPassword
}

export const comparePassword = async (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword)
} 