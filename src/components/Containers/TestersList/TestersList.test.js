import {shallow} from 'enzyme';
import { expect } from 'chai';
import TestersList from './TestersList';
import React from 'react';
import "../../../setupTests"

describe('TestersList component', () => {
    const wrapper = shallow(<TestersList goToHome={null}  serverResponse={[]}/>);
    const mockObject =  {firstName: "Melisa", lastName: "Kadosh", country: "Israel", device: "iPhone 6",bugs: [{id: 1,title: "button misplaced"},{id: 4,title: "incorrect home page"}]}
    const mockSortArray = [['aaaa', 'ggg', 'pppp'], ['tttt', 'eeee', 'mmmm'], ['wwww', 'iii', 'oooo']]

    test('should change from object to array', () => {
      expect(JSON.stringify(wrapper.instance().changeToArray(mockObject)))
      .equal(JSON.stringify(["Melisa" , "Kadosh" , "Israel" , "button misplaced, incorrect home page"]))
    });
    
    test('should be sorted alphabetic', () => {
        expect(JSON.stringify(wrapper.instance().sortArray(0,mockSortArray)))
        .equal(JSON.stringify([['aaaa', 'ggg', 'pppp'], ['tttt', 'eeee', 'mmmm'], ['wwww', 'iii', 'oooo']]))
         expect(JSON.stringify(wrapper.instance().sortArray(1,mockSortArray)))
        .equal(JSON.stringify([['tttt', 'eeee', 'mmmm'], ['aaaa', 'ggg', 'pppp'], ['wwww', 'iii', 'oooo']]))
        expect(JSON.stringify(wrapper.instance().sortArray(2,mockSortArray)))
        .equal(JSON.stringify([['tttt', 'eeee', 'mmmm'], ['wwww', 'iii', 'oooo'],  ['aaaa', 'ggg', 'pppp']]))
      });
  });
