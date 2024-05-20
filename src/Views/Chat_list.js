import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Updated import
import { Link } from 'react-router-dom';
import { auth } from "../firebase"; 
import '../css/Chat_list.css';

const Chat_list = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch conversations/messages for the current user
    const userId = auth().currentUser.uid;
    const unsubscribe = db.collection('messages') // Updated reference to 'db'
      .where('participants', 'array-contains', userId)
      .onSnapshot(snapshot => {
        const conversationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConversations(conversationsData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center chat_list">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Render conversations/messages */}
          {conversations.map(conversation => (
            <Link key={conversation.id} to={`/chat/${conversation.id}`}>
              <div className="flex items-center p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300">
                <img src={conversation.otherUserImage} alt="User" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-lg">{conversation.otherUser}</p>
                  <p className="text-gray-700">{conversation.lastMessage}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat_list;
