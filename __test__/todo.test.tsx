import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Header from '../components/Header';
import EventTypeList from '../components/EventTypeList';

describe('Basic components', () => {
    it('Should render the header with logo and Home link', () => {
        const { getByText } = render(<Header />);
        const image = screen.getByAltText('Svix Logo');

        expect(getByText('Home')).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('Should render the event type table with 2 buttons', () => {
        const listMock = [{
            name: 'test',
            description: 'Testing'
        }];

        render(<EventTypeList list={listMock} editRequest={() => {}} deleteRequest={() => {}}/>);
        
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeInTheDocument();
        expect(buttons[1]).toBeInTheDocument();
    });
});
