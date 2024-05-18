import React, { useState } from "react";
import { auth, db, storage } from "../firebase";

const SignUp = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // Get user UID
      const userId = userCredential.user.uid;
      // Upload image to Firebase Storage
      const avatarRef = storage.ref().child(`avatars/${userId}`);
      await avatarRef.put(file);
      const avatarUrl = await avatarRef.getDownloadURL();
      // Store user data in Firestore
      await db.collection("users").doc(userId).set({
        name,
        email,
        avatarUrl,
      });
      console.log("User signed up and data stored successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div>
              <a href="#" className="flex items-center">
                <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-bold text-lg">Clink</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Pricing</a>
              <a href="#" className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
              <a href="#" className="py-2 px-4 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign-up Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="mt-16 px-6 py-12 bg-white rounded-lg md:w-2/3 lg:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register for Clink</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-800 block mb-1">Name</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-800 block mb-1">Email address</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="you@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-800 block mb-1">Password</label>
              <input type="password" id="password" name="password" className="form-input" required />
            </div>
            <div>
              <label htmlFor="confirm_password" className="text-sm font-medium text-gray-800 block mb-1">Confirm password</label>
              <input type="password" id="confirm_password" name="confirm_password" className="form-input" required />
            </div>
            <div>
              <label htmlFor="avatar" className="text-sm font-medium text-gray-800 block mb-1">Avatar</label>
              <input type="file" id="avatar" name="avatar" onChange={handleFileChange} className="form-input" />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" defaultValue className="form-checkbox" />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">I agree to the <a href="#" className="text-primary-600 hover:underline">terms and conditions</a></label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Register
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Already have an account?
              <a href="#" className="ml-1 font-medium text-primary-600 hover:underline">
                Log in here
              </a>
            </p>
          </form>
          <div className="flex items-center justify-center">
            {/* Google Sign Up Button */}
            <button
              className="bg-white hover:bg-gray-100 border border-gray-300 p-2 rounded-full mx-2"
              onClick={() => {
                // Handle Google sign up
                console.log("Google sign up clicked");
              }}
            >
              <svg viewBox="0 0 48 48" width="24" height="24">
                {/* Google logo */}
              </svg>
            </button>
            {/* Facebook Sign Up Button */}
            <button
              className="bg-white hover:bg-gray-100 border border-gray-300 p-2 rounded-full mx-2"
              onClick={() => {
                // Handle Facebook sign up
                console.log("Facebook sign up clicked");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                {/* Facebook logo */}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
