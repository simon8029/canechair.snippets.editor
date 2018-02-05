import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Hello from './Hello';

enzyme.configure({ adapter: new Adapter() });

it('renders the correct text when no enthusiasm level is given', () => {
    const hello = enzyme.shallow(<Hello name="Simon" />);
    expect(hello.find('.greeting').text()).toEqual('Hello Simon!');
});

it('renders the correct text with an explicit enthusiasm of 1', () => {
    const hello = enzyme.shallow(<Hello name="Simon" enthusiasmLevel={1} />);
    expect(hello.find('.greeting').text()).toEqual('Hello Simon!');
});

it('renders the correct text with an explicit enthusiasm level of 5', () => {
    const hello = enzyme.shallow(<Hello name="Simon" enthusiasmLevel={5} />);
    expect(hello.find('.greeting').text()).toEqual('Hello Simon!!!!!');
});

it('throws when the enthusiasm level is 0', () => {
    expect(() => {
        enzyme.shallow(<Hello name="Simon" enthusiasmLevel={0} />);
    }).toThrow();
});

it('throws when the enthusiasm level is negative', () => {
    expect(() => {
        enzyme.shallow(<Hello name="Simon" enthusiasmLevel={-1} />);
    }).toThrow();
});