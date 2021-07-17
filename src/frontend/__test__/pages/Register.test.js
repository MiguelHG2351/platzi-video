import React from 'react'
import { mount } from 'enzyme'
import Register from '../../pages/Register'
import ProviderMock from '../../__mocks__/ProviderMock'

describe('Register', () => {
    test('should render', () => {
        const preventDefault = jest.fn()
        const wrapper = mount(
            <ProviderMock>
                <Register />
            </ProviderMock>
        )
        wrapper.find('form').simulate('submit', { preventDefault })
        expect(preventDefault).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })
})
