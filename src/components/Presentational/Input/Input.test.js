import {shallow} from 'enzyme';
import { expect } from 'chai';
import Input from './Input';
import React from 'react';
import "../../../setupTests"

const checkError = (wrapper, str)=>{
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: str } });
  return wrapper.state().error;
}

describe('Input component', () => {
    test('should be error in text type (no numbers and no special characters)', () => {
      const wrapper = shallow(<Input 
        isSpecialCharactersAllowed={false}
        input={{ type:"text"}}
        label={{}}
        />);
      expect(checkError(wrapper, '$')).equal("Special characters not allowed");
      expect(checkError(wrapper, '5')).equal("Numbers not allowed");
    });
    test('should not be error in email type', () => {
      const wrapper = shallow(<Input 
        isSpecialCharactersAllowed={false}
        input={{ type:"email"}}
        label={{}}
        />);
      expect(checkError(wrapper, '@')).equal("");
    });
  });
