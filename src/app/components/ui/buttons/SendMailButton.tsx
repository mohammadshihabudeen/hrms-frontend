import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface SendMailButtonProps {
    email: string;
    employeeName: string;
}

const SendMailButton: React.FC<SendMailButtonProps> = ({ email, employeeName }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/register/check', {
                    params: { email }
                });
                setIsRegistered(response.data.registered);
            } catch (error) {
                console.error('Error checking registration status', error);
            }
        };

        checkRegistrationStatus();
    }, [email]);

    const handleSendMail = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/register/mail', { email, employeeName });
            alert('Email sent successfully');
        } catch (error) {
            console.error('Error sending email', error);
            alert('Failed to send email');
        }
    };

    return (
        <button
            onClick={handleSendMail}
            className={`px-4 py-2 rounded ${isRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'} text-white`}
            disabled={isRegistered}
        >
            {isRegistered ? 'Already Registered' : 'Send Mail'}
        </button>
    );
};

export default SendMailButton;
