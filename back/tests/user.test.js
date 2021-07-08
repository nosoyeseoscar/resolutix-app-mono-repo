const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers, initialUsers, baseDataReset } = require('./helpers')
const mongoose = require('mongoose')
const { server } = require('../index')

describe('Creating a new user', () => {

    beforeEach(async () => {
        /* await User.deleteMany({})
        const passwordHash = await bcrypt.hash('pswd', 10)
        for (let i = 0; i < 2; i++) {
            const user = new User({
                userName: `TestUser${i}`,
                name: `This is a Test User ${i}`,
                passwordHash: passwordHash
            })
            initialUsers.concat(user)
            await user.save()
        } */
        await baseDataReset()
    })

    test('works as expected fresh username', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            userName: 'nuevo',
            name: 'nuevo usuario',
            password: 'nuevopsw'

        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await getUsers()

        expect(userAtEnd).toHaveLength(usersAtStart.length + 1)

        const userNames = userAtEnd.map(user => user.userName)
        expect(userNames).toContain(newUser.userName)
    })

    test('creation fail with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            userName: usersAtStart[0].userName,
            name: 'Other TestUser for testing',
            password: 'pswdTest'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        //console.log(result.body);
        expect(result.body.errors.userName.message).toContain('`userName` to be unique')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('Getting all Users', async () => {
        const usersAtStart = await getUsers()
        expect(usersAtStart).toHaveLength(initialUsers.length)
        for (i = 0; i < initialUsers.length; i++) {
            expect(initialUsers[i].userName).toBe(usersAtStart[i].userName)
        }

    })

})

//hook del test
afterAll(() => {
    mongoose.connection.close()
    server.close()
})