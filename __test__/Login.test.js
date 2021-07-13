import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Typography from '@material-ui/core/Typography';
import Login from '../client/components_refactored/Login'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

configure({ adapter: new Adapter() });

describe('Login React units tests', () => {
  describe('components', () => {
    let wrapper;
	const clickLogin = jest.fn();

    beforeAll(() => {
      wrapper = shallow(<Login/>);
    });
	it('Renders an h1 heading with the title of Log In', () => {
		expect(wrapper.find(Typography)).toHaveLength(1);
		expect(wrapper.find(Typography).text()).toEqual("Log In"); 
	  });	

	it('Renders both an email and password input field', () => {
		expect(wrapper.find(TextField)).toHaveLength(2);
		expect(wrapper.find('#email')).toHaveLength(1);
		expect(wrapper.find('#password')).toHaveLength(1);
	  });
	
    it('Renders a button with text of Log In', () => {
	  expect(wrapper.find(Button)).toHaveLength(1);
	  expect(wrapper.find(Button).text()).toEqual("Log In"); 
	  expect(wrapper.find(Button).props().type).toEqual("submit"); 
	  expect(wrapper.find(Button).props('style').color).toBe('primary');
    });

	it('Login button invokes a function on click', () => {
		const wrapBtn = shallow(<Button onClick={clickLogin}/>)
		expect(wrapBtn.simulate('click'));
		expect(clickLogin.mock.calls.length).toBe(1)
	  });

  });
});
