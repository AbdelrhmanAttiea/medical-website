import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { db } from '../firebase'; // Assuming you have Firebase setup and db is the firestore instance
import { Link } from 'react-router-dom';
const Users = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const usersSnapshot = await db.collection('users').get();
        const doctorList = [];

        usersSnapshot.forEach(async userDoc => {
          const userData = userDoc.data();
          const { name, image } = userData;

          // Check if the user has a 'doctors' subcollection
          if (userData.doctors) {
            const doctorsSnapshot = await userDoc.ref.collection('doctors').get();

            doctorsSnapshot.forEach(doctorDoc => {
              const doctorData = doctorDoc.data();
              const { specialization } = doctorData;

              doctorList.push({
                name,
                image,
                specialization
              });
            });
          }
        });

        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
        </div>
		
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {doctors.map((doctor, index) => (
            <div key={index} className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={doctor.image} alt="doctor image" />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link  to={`/profile_view/${doctor.id}`} >{doctor.name}</Link>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">{doctor.specialization}</span>
                {/* Add other doctor details here */}
                <ul className="flex space-x-4 sm:mt-0">
                  {/* Social media icons */}
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      {/* Twitter icon */}
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      {/* Another social media icon */}
                    </a>
                  </li>
                  {/* Add more social media icons as needed */}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Users;
