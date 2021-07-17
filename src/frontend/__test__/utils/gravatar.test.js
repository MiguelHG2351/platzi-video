import gravatar from '../../utils/gravatar'

test(`gravatar()`, () => {
    const email = 'miguelhernandezgaitan13@gmail.com'
    const size = 80
    // const defaultImg =
    //     'https://s.gravatar.com/avatar/c6e17f2ae2a215e87ff9e878a4e63cd9'
    const expected =
        'https://gravatar.com/avatar/ad9a13bd91c52048caeadff1ecd50aa9'
    const actual = gravatar(email, size)
    expect(actual).toBe(expected)
})
