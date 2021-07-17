import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'
import Header from '../../components/Header'
import ProviderMock from '../../__mocks__/ProviderMock'

describe('Header Component', () => {
    test('Header logo image', () => {
        const tree = mount(
            <ProviderMock>
                <Header />
            </ProviderMock>
        )
        expect(tree.find('.header__img')).toHaveLength(1)
    })

    test('Header snapshot', () => {
        const tree = create(
            <ProviderMock>
                <Header />
            </ProviderMock>
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})
