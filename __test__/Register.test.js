/**
 * ************************************
 * @file  Register.test.js
 * @description React testing for Register component using Jest/Enzyme
 * ************************************
 */


import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Typography from '@material-ui/core/Typography';
import Register from '../client/components_refactored/Register'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

configure({ adapter: new Adapter() });

describe('Register React units tests', () => {
  describe('components', () => {
    let wrapper;
	const clickRegister = jest.fn();

    beforeAll(() => {
      wrapper = shallow(<Register/>);
    });
	it('Renders an h1 heading with the title of Register', () => {
		expect(wrapper.find(Typography)).toHaveLength(1);
		expect(wrapper.find(Typography).text()).toEqual("Register"); 
	  });	

	it('Renders a name, email,and password input field', () => {
		expect(wrapper.find(TextField)).toHaveLength(3);
		expect(wrapper.find('#email')).toHaveLength(1);
		expect(wrapper.find('#email')).toHaveLength(1);
		expect(wrapper.find('#password')).toHaveLength(1);
	  });
	
    it('Renders a button with text of Register', () => {
	  expect(wrapper.find(Button)).toHaveLength(1);
	  expect(wrapper.find(Button).text()).toEqual("Register"); 
	  expect(wrapper.find(Button).props().type).toEqual("submit"); 
	  expect(wrapper.find(Button).props('style').color).toBe('primary');
    });

	it('Register button invokes a function on click', () => {
		const wrapBtn = shallow(<Button onClick={clickRegister}/>)
		expect(wrapBtn.simulate('click'));
		expect(clickRegister.mock.calls.length).toBe(1)
	  });

  });
});