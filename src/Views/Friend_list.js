import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase'; // Adjust the path as per your file structure
import '../css/Friends.css';

const Friend_list = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('users')
      .doc(auth.currentUser.uid)
      .collection('friends')
      .onSnapshot(snapshot => {
        const friendsData = snapshot.docs.map(doc => doc.data());
        setFriends(friendsData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div class="bg-gray-100 h-screen flex items-center justify-center friends ">
      <div className="max-w-md w-full bg-white rounded p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Friend List</h1>
        <div>
          <ul>
            {friends.map((friend, index) => (
              <li key={index} className="flex items-center justify-between p-4 bg-gray-200 rounded mb-4">
                <div className="flex items-center space-x-4">
                  <img src={friend.image} alt={`Friend ${index + 1}`} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">{friend.name}</p>
                    {/* Additional information about the friend */}
                    {/* For example: <p className="text-gray-500">{friend.additionalInfo}</p> */}
                  </div>
                </div>
                {/* Option to message the friend */}
                <button className="text-white bg-blue-500 px-4 py-2 rounded-full">Message</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Friend_list;
