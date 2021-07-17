import { setFavorite, loginRequest } from '../../actions'
import movieMock from '../../__mocks__/movieMock'

describe('Actions', () => {
    test('setFavorite', () => {
        const payload = movieMock
        const expectAction = {
            type: 'SET_FAVORITE',
            payload,
        }
        expect(setFavorite(payload)).toEqual(expectAction)
    })

    test('Login', () => {
        const payload = {
            id: 1,
            name: 'test',
            email: 'test@test.com',
            password: 'test',
        }
        const expectAction = {
            type: 'LOGIN_REQUEST',
            payload,
        }

        expect(loginRequest(payload)).toEqual(expectAction)
    })
})
