import EmployeeTable from '@/app/pages/Employees/page';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockedEmployees = [
    {
        id: '1',
        employeeName: 'Mohammad Shihabudeen',
        jobTitle: 'Software Engineer',
        salary: '$100,000',
        hireDate: '2020-01-15',
        contract: 'Permanent',
        profile: '/assets/profile.svg',
    },
    {
        id: '2',
        employeeName: 'Mohanprasath',
        jobTitle: 'Software Engineer',
        salary: '$100,000',
        hireDate: '2020-01-15',
        contract: 'Permanent',
        profile: '/assets/profile.svg',
    },
];


const mockStore = configureStore([]);

describe('EmployeeTable', () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({
            employees: {
                employees: mockedEmployees,
            },
        });
    });
    it('renders EmployeeTable component with headers', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );
        expect(screen.getByText("Employee's name")).toBeInTheDocument();
        expect(screen.getByText("Job Title")).toBeInTheDocument();
        expect(screen.getByText("Salary")).toBeInTheDocument();
        expect(screen.getByText("Hire date")).toBeInTheDocument();
        expect(screen.getByText("Contract")).toBeInTheDocument();
    });
    it('filters employees based on search input', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );
        const searchInput = screen.getByPlaceholderText('Enter the name of the employee...');
        fireEvent.change(searchInput, { target: { value: 'moham' } });
        expect(screen.getByText('Mohammad Shihabudeen')).toBeInTheDocument();
        fireEvent.change(searchInput, { target: { value: '' } });
        expect(screen.getByText('Mohammad Shihabudeen')).toBeInTheDocument();
        expect(screen.getByText('Mohanprasath')).toBeInTheDocument();
    });
});
