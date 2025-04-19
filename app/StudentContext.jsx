import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseConfig';
import { useAuth } from './AuthContext';

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [studentDetails, setStudentDetails] = useState(null);
    const { currentUser } = useAuth();

    // Load student details when user logs in
    useEffect(() => {
        if (currentUser) {
            loadStudentDetails();
        }
    }, [currentUser]);

    const loadStudentDetails = async () => {
        try {
            if (!currentUser) return;

            // Get the first entry's student details for this user
            const { data, error } = await supabase
                .from('Tree Data')
                .select('Student_Name, Student_Roll_No, Student_Group')
                .eq('User_Email', currentUser.email)
                .order('Created_At', { ascending: true })
                .limit(1)
                .single();

            if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
                throw error;
            }

            if (data) {
                setStudentDetails({
                    studentName: data.Student_Name,
                    studentRollNo: data.Student_Roll_No,
                    studentGroup: data.Student_Group
                });
            }
        } catch (error) {
            console.error('Error loading student details:', error);
        }
    };

    const updateStudentDetails = async (details) => {
        try {
            if (!currentUser) return;

            // Save to context
            setStudentDetails(details);
            
            // Save to database
            const { error } = await supabase
                .from('Tree Data')
                .upsert([{
                    User_Email: currentUser.email,
                    Student_Name: details.studentName,
                    Student_Roll_No: details.studentRollNo,
                    Student_Group: details.studentGroup
                }]);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating student details:', error);
            throw error;
        }
    };

    return (
        <StudentContext.Provider value={{ 
            studentDetails, 
            updateStudentDetails,
            loadStudentDetails 
        }}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudent() {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within a StudentProvider');
    }
    return context;
} 