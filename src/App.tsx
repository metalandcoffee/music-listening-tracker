import { createClient } from '@supabase/supabase-js'
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useState, useEffect } from 'react'
import './App.css'

// Set up Supabase client.
const {VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY} = import.meta.env;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

// Simple database placeholder functions
async function saveUser(userData: {name: string, email: string, password: string}) {
  console.log('Saving user:', userData);
  const { data, error } = await supabase
    .from('users')
    .select();
  console.log(data);
  return true;
}

export default function App() {

  // Set up LaunchDarkly client.
  const ldClient = useLDClient("enter-your-client-side-id-here");
  const context = {
    kind: 'user',
    key: 'user-key-123abc',
    name: 'Sandy',
    email: 'sandy@testcorp.com'
  };

  // Initialize LaunchDarkly client with user context.
  useEffect(() => {
    ldClient.identify(context);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userData = { name, email, password };
    const success = await saveUser(userData);
    
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}