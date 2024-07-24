import { EmployeeDetailCard } from '@/app/components/ui/cards/EmployeeDetailCard';
import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth'; // Ensure to import the correct type
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PersonelDetailCard } from '../components/ui/cards/PersonelDetailCard';

const mockStore = configureStore([]);

describe('Detail Cards', () => {
  let store: any;
  const session: Session = {
    user: {
      id: '1',
      role: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      image: 'https://example.com/admin.png',
    },
    expires: '2024-07-23T00:00:00.000Z', // Ensure this matches the Session type
  };

  const personelDetailProps = {
    name: 'Personal Details',
    icon: <span>Edit</span>,
    sicon: <span>Save</span>,
    isEditing: false,
    selectedEmployee: {
      profile: '/profile.jpg',
      email: 'test@example.com',
      employeeName: 'John Doe',
      employeeId: '1',
    },
    details: [
      { name: 'employeeName', icon: <span>Name Icon</span>, value: 'John Doe' },
    ],
    handleInputChange: jest.fn(),
  };

  const employeeDetailProps = {
    name: 'Employee Details',
    icon: <span>Edit</span>,
    sicon: <span>Save</span>,
    isEditing: false,
    details: [
      { label: 'Job Title', name: 'jobTitle', icon: <span>Job Icon</span>, value: 'Developer', className: '', options: ['Developer', 'Manager'] },
    ],
    handleInputChange: jest.fn(),
  };

  beforeEach(() => {
    store = mockStore({
      session: { isAdminAuthorized: true },
    });
  });

  it('should render PersonelDetailCard with given props', () => {
    render(
      <Provider store={store}>
        <SessionProvider session={session}>
          <PersonelDetailCard {...personelDetailProps}/>
        </SessionProvider>
      </Provider>
    );

    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render EmployeeDetailCard with given props', () => {
    render(
      <Provider store={store}>
        <SessionProvider session={session}>
          <EmployeeDetailCard {...employeeDetailProps}/>
        </SessionProvider>
      </Provider>
    );

    expect(screen.getByText('Employee Details')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('should render edit and save icons in PersonelDetailCard when isAdminAuthorized is true', () => {
    render(
      <Provider store={store}>
        <SessionProvider session={session}>
          <PersonelDetailCard {...personelDetailProps} />
        </SessionProvider>
      </Provider>
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should render edit and save icons in EmployeeDetailCard when isAdminAuthorized is true', () => {
    render(
      <Provider store={store}>
        <SessionProvider session={session}>
          <EmployeeDetailCard {...employeeDetailProps} />
        </SessionProvider>
      </Provider>
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
