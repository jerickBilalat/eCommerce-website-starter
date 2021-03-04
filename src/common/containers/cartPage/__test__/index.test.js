/* eslint-disable import/named */
import '@testing-library/jest-dom';
import * as React from 'react';
import { customRender, screen } from '../../../../utils/tests/ui-test-utils';
import Component from '../index';

describe('cart container', () => {
  it('just an example how we can test connected componets but usually we cover these types of components on an e2e tests', () => {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => null);
    customRender(<Component.component />);
    expect(screen.getByText(/cart totals/i)).toBeInTheDocument();
    window.scrollTo.mockRestore();
  });
});
