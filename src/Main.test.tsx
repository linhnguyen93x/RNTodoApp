import Main from 'Main'
import * as React from 'react'
import 'react-native'
import * as renderer from 'react-test-renderer'

describe('Main snapshot', () => {
  it('renders',  () => {
    const tree = renderer.create(<Main />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
