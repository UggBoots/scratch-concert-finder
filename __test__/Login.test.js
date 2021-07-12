import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Login from '../client/components_refactored/Login'
import Button from '@material-ui/core/Button';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.


// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('Login units tests', () => {
  describe('components', () => {
    let wrapper;
    const props = {
      label: 'Mega',
      text: 'Markets',
    };

    beforeAll(() => {
      wrapper = shallow(<Login {...props} />);
    });

	
    it('Renders a button with text of Log In', () => {
	  expect(wrapper.find(Button)).toHaveLength(1)
	  expect(wrapper.find(Button).text()).toEqual("Log In") 
	  
    });
  });

  describe('MarketDisplay', () => {
    // TODO: Test the following:
    // 1. A MarketDisplay should display all of its text props inside a
    // LabeledText component
    // 2. It should also contain a div with two buttons
    // 3. The functions passed down should be invoked on click
    // 4. MarketDisplay should render a div with a class of `marketBox`, and the
    // interior div wrapping the two buttons should have a class of `flex`

  });

  describe('MarketsDisplay', () => {
    // TODO: Test the following:
    //   1. A MarketsDisplay should have an h4 element to display the 'Markets'
    //   title
    //   2. A single MarketDisplay is rendered for each market in the
    //   marketList prop
    //   3. The percentage prop should be a string calculated to two decimals.
    //   Test for zero, a whole number, and a fractional value. (Right now this
    //   is implemented incorrectly, so follow TDD here)
  });
});