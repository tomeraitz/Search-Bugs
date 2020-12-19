import {shallow} from 'enzyme';
import { expect } from 'chai';
import SearchTester from './SearchTester';
import React from 'react';
import "../../../setupTests"

const checkError = (wrapper, str)=>{
  wrapper.instance().updateInput(str);
  wrapper.instance().fetchTesterData();
  return wrapper.state().error;
}

describe('SearchTester component', () => {
    const wrapper = shallow(<SearchTester />);
    test('should be error (under 2 and bigger then 12)', () => {
      expect(checkError(wrapper, 'a')).equal("The input must be bigger then two");
      expect(checkError(wrapper, 'Very Long String')).equal("The input must be smaller than twelve");
    });
  });
