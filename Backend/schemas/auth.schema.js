import {z} from 'zod'

export const registerSchema = z.object({
    firstName: z.string({
        required_error: 'First name is required'
    }),
    lastName: z.string({
        required_error: 'Last name is required'
    }),
    roll: z.number({
        required_error: 'Roll number is required'
    }),
    departament: z.string({
        required_error: 'Department is required'
    }),
    job: z.string({
        required_error: 'Job is required'
    }),
    user: z.string({
        required_error: 'User is required'
    }),
    id: z.number({
        required_error: 'Id is required'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6,{message:'Password must be at least 6 characters long'})
})

export const loginSchema = z.object({
    user: z.string({
        required_error: 'User is required'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6,{message:'Password must be at least 6 characters long'})
})