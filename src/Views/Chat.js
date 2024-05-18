import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Updated import

const ChatPage = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages from Firestore for the selected user
    const unsubscribe = db.collection('messages') // Updated reference to 'db'
      .where('participants', 'array-contains', userId)
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => doc.data());
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, [userId]);

  // Function to send a new message
  const sendMessage = () => {
    db.collection('messages').add({ // Updated reference to 'db'
      sender: firebase.auth().currentUser.uid,
      recipient: userId,
      message: newMessage,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-200 flex-1 overflow-y-scroll">
        {/* Display messages */}
        {messages.map((message, index) => (
          <div key={index} className={`px-4 py-2 ${message.sender === firebase.auth().currentUser.uid ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-center mb-2">
              {message.sender !== firebase.auth().currentUser.uid && <img className="w-8 h-8 rounded-full mr-2" src={message.senderAvatar} alt="User Avatar" />}
              <div className={`font-medium ${message.sender === firebase.auth().currentUser.uid ? 'text-right' : ''}`}>{message.senderName}</div>
            </div>
            <div className={`bg-white rounded-lg p-2 shadow mb-2 max-w-sm ${message.sender === firebase.auth().currentUser.uid ? 'bg-blue-500 text-white' : ''}`}>
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="bg-gray-100 px-4 py-2">
        <div className="flex items-center">
          <input className="w-full border rounded-full py-2 px-4 mr-2" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
