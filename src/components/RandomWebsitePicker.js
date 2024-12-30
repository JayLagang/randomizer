'use client';

import { useState } from 'react';
import { sites, localSites } from '@/data/sites';
import { Toaster, toast } from 'react-hot-toast';
import { GoArrowDown } from "react-icons/go";

export default function RandomWebsitePicker() {
  const [sourceType, setSourceType] = useState('sites'); // Track selected source
  const [randomWebsites, setRandomWebsites] = useState([]);
  const [itemCount, setItemCount] = useState(20); // Track the number of items to pick

  const pickRandomWebsites = () => {
    const websites = sourceType === 'localSites' ? localSites : sites; // Choose based on sourceType
    const count = Math.min(itemCount, 50); // Ensure the count doesn't exceed 50
    const shuffled = [...websites].sort(() => 0.5 - Math.random());
    setRandomWebsites(shuffled.slice(0, count));
  };

  const onTypeSelect = (e) => {
    setSourceType(e.target.value);
    setRandomWebsites([]);
  };

  const onItemCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setItemCount(Math.max(1, Math.min(value, 50))); // Clamp value between 1 and 50
    }
  };

  const copyToClipboard = () => {
    const textToCopy = randomWebsites.join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy: ' + err.message);
      });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Toaster for notifications */}
      <Toaster position="bottom-right" />

      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold">Random Website Picker</h1>
      </div>
      <div className='flex justify-center space-x-2'>
        <div className="my-5 flex flex-col w-48">
          <label className="mr-3 font-bold">Choose website type:</label>
          <select
            value={sourceType}
            onChange={onTypeSelect}
            className="border p-2 rounded-md bg-black text-white h-14"
          >
            <option value="sites">International Sites</option>
            <option value="localSites">PH Local Sites</option>
          </select>
        </div>
        <div className="my-5 flex flex-col w-52">
          <label className="mr-3 font-bold">How many items to pick?</label>
          <input
            type="number"
            value={itemCount}
            onChange={onItemCountChange}
            className="border p-2 rounded-md bg-black text-white h-14 appearance-none"
            min="1"
            max="50"
          />
        </div>
      </div>
      <div className="mx-auto justify-center space-y-2">
        {randomWebsites.length === 0 && (
          <div>
            <p className="mt-5">Click the button below to pick up to {itemCount} random websites from the list.</p>
            <GoArrowDown className='text-white mx-auto text-3xl font-extrabold'/>
          </div>
        )}
        <div>
          <button
            onClick={pickRandomWebsites}
            className="border p-3 rounded-md border-white"
          >
            Pick {itemCount} Random Websites
          </button>
        </div>
        {randomWebsites.length > 0 && (
        <div>
          <button
            onClick={copyToClipboard}
            className="border p-3 rounded-md border-white"
          >
            Copy to Clipboard
          </button>
        </div>
        )}
      </div>
      
      {randomWebsites.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 className="font-bold my-5">SELECTED {sourceType === 'localSites' && "PH"} WEBSITES</h2>
          <ul>
            {randomWebsites.map((website, index) => (
              <li key={index}>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </div>
  );
}
