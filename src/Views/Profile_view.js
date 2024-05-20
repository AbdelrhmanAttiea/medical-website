import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { auth } from '../firebase';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const ProfileView = () => {
  const { userId } = useParams(); // Extract userId from URL parameters
  const [userData, setUserData] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('address');

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if userId exists
      if (!userId) return;

      // Reference to the user document using the userId from URL parameters
      const userRef = db.collection('users').doc(userId);

      try {
        // Get the user document
        const userDoc = await userRef.get();

        // Check if the user document exists
        if (userDoc.exists) {
          // Extract user data from the document
          const userData = userDoc.data();
          setUserData(userData);

          // Reference to the 'doctors' subcollection inside the user document
          const doctorsRef = userRef.collection('doctors');

          // Fetch addresses from the 'doctors' subcollection
          const addressesSnapshot = await doctorsRef.get();

          // Initialize an array to store addresses data
          const addressesData = [];

          // Iterate over each document in the 'doctors' subcollection
          addressesSnapshot.forEach(doc => {
            // Extract address data and include the document ID
            addressesData.push({ id: doc.id, ...doc.data() });
          });

          // Set the fetched addresses data in state
          setUserAddresses(addressesData);
        } else {
          // User document does not exist
          console.log('User document does not exist');
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]); // Add userId to dependency array

  const handleFriendRequest = async () => {
    await db.collection('friendRequests').add({
      senderId: auth.currentUser.uid,
      receiverId: userId,
      status: 'pending',
      createdAt: new Date(),
    });
    alert('Friend request sent!');
  };

  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

    const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    await db.collection('comments').add({ 
      userId,
      comment: newComment,
      timestamp: db.FieldValue.serverTimestamp(),
    });

    setComments('');
  };
  return (
    <>
    <div className="profile-view">
      <div className="flex flex-col h-screen profile">
        {/* User Info Section */}
        <div className="flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden w-96">
            <div className="p-8">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                  className="rounded-full h-24 w-24 border-2 border-blue-500"
                  src={userData?.image}
                  alt="Profile"
                />
              </div>

              {/* Profile Name and Title */}
              <div className="text-center mt-4">
                <h1 className="text-xl font-semibold">{userData?.name}</h1>
                <p className="text-gray-600">{userData?.specialization}</p>
              </div>

              {/* Buttons */}
              <div className="mt-8 text-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2" onClick={handleFriendRequest}>
                  Send Friend Request
                </button>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             <Link to={`/chat/${userData.userId}`}>
                Send Message
                  </Link>
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 mt-20 ml-40">
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('address')}
              className={`inline-block p-4 ${
                activeTab === 'address'
                  ? 'text-blue-600 bg-gray-100 rounded-b-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              Address
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('qualification')}
              className={`inline-block p-4 ${
                activeTab === 'qualification'
                  ? 'text-blue-600 bg-gray-100 rounded-b-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              Qualification
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('education')}
              className={`inline-block p-4 ${
                activeTab === 'education'
                  ? 'text-blue-600 bg-gray-100 rounded-b-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              Education
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('phone')}
              className={`inline-block p-4 ${
                activeTab === 'phone'
                  ? 'text-blue-600 bg-gray-100 rounded-b-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              Phone
            </a>
          </li>
          <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
          </li>
        </ul>

        {/* Render data based on active tab */}
        {activeTab === 'address' && (
          <div className="tab">
            {/* Data for Address tab */}
            <ul>
              {userAddresses.map(address => (
                <li key={address.id}>{address.address}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Add rendering logic for other tabs */}
      </div>
    </div>
	    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment}>
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
    </>
  );
};

export default ProfileView;
