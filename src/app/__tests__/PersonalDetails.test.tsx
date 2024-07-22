// PersonelDetailCard.test.tsx
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { RootState } from '../../app/store/store'; // Adjust the path as necessary
import { PersonelDetailCard } from '../components/ui/cards/PersonelDetailCard';

// Mock data
const mockEmployee = {
    profile: '/profile.jpg',
    email: 'test@example.com',
    employeeName: 'John Doe',
    maritalStatus: 'Single',
    degree: 'Bachelor of Engineering',
    location: 'Chennai',
    dob: '10.03.1999',
    country: 'India',
    phone: '9876543210',
};

const mockDetails = [
    { name: 'employeeName', icon: <div>Icon</div>, value: mockEmployee.employeeName },
    { name: 'maritalStatus', icon: <div>Icon</div>, value: mockEmployee.maritalStatus },
    { name: 'degree', icon: <div>Icon</div>, value: mockEmployee.degree },
    { name: 'location', icon: <div>Icon</div>, value: mockEmployee.location },
    { name: 'dob', icon: <div>Icon</div>, value: mockEmployee.dob },
    { name: 'country', icon: <div>Icon</div>, value: mockEmployee.country },
    { name: 'phone', icon: <div>Icon</div>, value: mockEmployee.phone },
    { name: 'email', icon: <div>Icon</div>, value: mockEmployee.email },
];

const mockHandleInputChange = jest.fn();

// Mock store setup
const setupStore = (isAdminAuthorized = true) => {
    const store = configureStore({
        reducer: {
            // You need to specify the reducers used by your component
            session: (state = { isAdminAuthorized }, action) => state,
            employees: (state = { employees: [mockEmployee] }, action) => state,
            // Include other reducers as needed
        },
    });

    return store;
};

// Helper function to render component with mocked store
const renderComponent = (store: EnhancedStore<RootState>, isEditing = false) => {
    return render(
        <Provider store={stores}>
            <SessionProvider>
                <PersonelDetailCard
                    name="Personal Details"
                    icon={<div>Edit Icon</div>}
                    sicon={<div>Save Icon</div>}
                    isEditing={isEditing}
                    selectedEmployee={mockEmployee}
                    details={mockDetails}
                    handleInputChange={mockHandleInputChange}
                />
            </SessionProvider>
        </Provider>
    );
};

// Tests
test('renders personal details correctly', () => {
    const store = setupStore();
    renderComponent(stores);

    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText(mockEmployee.employeeName)).toBeInTheDocument();
    expect(screen.getByText(mockEmployee.maritalStatus)).toBeInTheDocument();
    expect(screen.getByText(mockEmployee.degree)).toBeInTheDocument();
});

test('renders edit and save icons when isAdminAuthorized is true and isEditing is true', () => {
    const store = setupStore();
    renderComponent(store, true);

    expect(screen.getByText('Edit Icon')).toBeInTheDocument();
    expect(screen.getByText('Save Icon')).toBeInTheDocument();
});

test('calls handleInputChange when input changes in editing mode', () => {
    const store = setupStore();
    renderComponent(store, true);

    const input = screen.getByDisplayValue(mockEmployee.employeeName);
    fireEvent.change(input, { target: { value: 'New Name' } });

    expect(mockHandleInputChange).toHaveBeenCalled();
});

test('does not render edit icon when isAdminAuthorized is false', () => {
    const store = setupStore(false);
    renderComponent(store);

    expect(screen.queryByText('Edit Icon')).not.toBeInTheDocument();
});
