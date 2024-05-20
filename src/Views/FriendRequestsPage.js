// FriendRequestsPage.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';

const FriendRequestsPage = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('friendRequests')
      .where('receiverId', '==', auth.currentUser.uid)
      .where('status', '==', 'pending')
      .onSnapshot(snapshot => {
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFriendRequests(requests);
      });

    return () => unsubscribe();
  }, []);

  const handleAcceptRequest = async requestId => {
    const requestRef = db.collection('friendRequests').doc(requestId);
    const requestSnapshot = await requestRef.get();
    const requestData = requestSnapshot.data();

    // Update status of friend request
    await requestRef.update({ status: 'accepted' });

    // Add sender as friend for current user
    await db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('friends')
      .doc(requestData.senderId)
      .set({
        userId: requestData.senderId,
        name: requestData.senderName, // Assuming senderName is available in friend request
        image: requestData.senderImage, // Assuming senderImage is available in friend request
      });

    // Add current user as friend for sender
    await db.collection('users')
      .doc(requestData.senderId)
      .collection('friends')
      .doc(auth.currentUser.uid)
      .set({
        userId: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        image: auth.currentUser.photoURL,
      });
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map(request => (
          <li key={request.id}>
            <p>{request.senderId}</p>
            <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequestsPage;
