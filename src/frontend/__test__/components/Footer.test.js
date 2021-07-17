import React from 'react'
import { mount } from 'enzyme'
import Footer from '../../components/Footer'
import { create } from 'react-test-renderer'

describe('<Footer>', () => {
    const wrapper = mount(<Footer />)
    test('Render Footer component', () => {
        expect(wrapper.length).toEqual(1)
    })

    test('Footer have 3 anchors', () => {
        expect(wrapper.find('a').length).toEqual(3)
    })

    test('Footer snapshot', () => {
        const tree = create(<Footer />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
