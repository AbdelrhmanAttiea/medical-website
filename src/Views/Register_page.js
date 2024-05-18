import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Import Firebase Firestore and Authentication

const DoctorRegistrationForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [qualification, setQualification] = useState('');
    const [category, setCategory] = useState('General');
    const [education, setEducation] = useState('MBBS');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get the currently authenticated user
        const user = auth.currentUser;
        
        if (user) {
            // Check if the user already has a document in the "doctors" subcollection
            const userDocRef = db.collection('users').doc(user.uid).collection('doctors');
            const docSnapshot = await userDocRef.get();
            
            if (docSnapshot.empty) {
                // If the user doesn't have a document, proceed to create one
                try {
                    await userDocRef.add({
                        phoneNumber,
                        specialization,
                        qualification,
                        category,
                        education,
                        gender,
                        location,
                        address
                    });
                    console.log('Doctor registration data added successfully!');
                } catch (error) {
                    console.error('Error adding doctor registration data:', error);
                }
            } else {
                // If the user already has a document, don't allow submitting another one
                console.log('User already has a doctor registration document');
            }
        }
    };

    return (
        <div className="body">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <h5 className="card-header bg-primary text-white text-center">Doctor Registration Form</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            id="phone" 
                                            placeholder="Enter phone number" 
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="specialization">Specialization</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="specialization" 
                                            placeholder="Enter specialization" 
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="qualification">Qualification</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="qualification" 
                                            placeholder="Enter qualification" 
                                            value={qualification}
                                            onChange={(e) => setQualification(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select 
                                            className="form-control" 
                                            id="category" 
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="General">General</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="education">Education</label>
                                        <select 
                                            className="form-control" 
                                            id="education" 
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                        >
                                            <option value="MBBS">MBBS</option>
                                            <option value="MD">MD</option>
                                            <option value="MS">MS</option>
                                            <option value="DM">DM</option>
                                            <option value="MCh">MCh</option>
                                            <option value="DNB">DNB</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="gender" 
                                                id="male" 
                                                value="male" 
                                                checked={gender === 'male'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required 
                                            />
                                            <label className="form-check-label" htmlFor="male">
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="gender" 
                                                id="female" 
                                                value="female" 
                                                checked={gender === 'female'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required 
                                            />
                                            <label className="form-check-label" htmlFor="female">
                                                Female
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="gender" 
                                                id="other" 
                                                value="other" 
                                                checked={gender === 'other'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required 
                                            />
                                            <label className="form-check-label" htmlFor="other">
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="location" 
                                            placeholder="Enter location" 
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea 
                                            className="form-control" 
                                            id="address" 
                                            rows="3" 
                                            placeholder="Enter address" 
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorRegistrationForm;
