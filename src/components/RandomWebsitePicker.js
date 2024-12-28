'use client'

import { useState } from 'react';
import { sites } from '@/data/sites';
export default function RandomWebsitePicker() {
  const websites = sites;

  const [randomWebsites, setRandomWebsites] = useState([]);

  const pickRandomWebsites = () => {
    const shuffled = [...websites].sort(() => 0.5 - Math.random());
    setRandomWebsites(shuffled.slice(0, 20));
  };

  const copyToClipboard = () => {
    const textToCopy = randomWebsites.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy: ', err);
    });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
        <div className='flex justify-center'>
            <h1 className='text-2xl font-semibold'>Random Website Picker</h1>
        </div>
        
      
        
        {randomWebsites.length > 0 && (
            <div style={{ marginTop: "20px" }}>
            <h2 className='font-bold my-5'>SELECTED WEBSITES</h2>
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

        <div className='mx-auto justify-center mt-3 space-y-2'>
            <div>
                <button 
                onClick={pickRandomWebsites} 
                className='border p-3 rounded-md border-white'
                
                >
                Pick 20 Random Websites
                </button>
            </div>
            <div>
                <button 
                    onClick={copyToClipboard}
                    className=' border p-3 rounded-md border-white ' >
                    Copy to Clipboard
                </button>
            </div>
            
        </div>
        
    </div>
  );
}
