'use client'

import { useState } from 'react';
import { sites } from '@/data/sites';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';

export default function RandomWebsitePicker() {
  const websites = sites;
  const [randomWebsites, setRandomWebsites] = useState([]);

  const pickRandomWebsites = () => {
    const shuffled = [...websites].sort(() => 0.5 - Math.random());
    setRandomWebsites(shuffled.slice(0, 20));
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Toaster for notifications */}
      <Toaster position=" bottom-right" />

      <Image src='/images/bg_image.jpg' className='rounded-md mx-auto mb-2' width={100} height={100} alt='adong' />
      <div className='flex justify-center'>
        <h1 className='text-2xl font-semibold'>Random Website Picker</h1>
      </div>
      {randomWebsites.length === 0 && (
        <div>
          <p className='my-5'>Click the button below to pick 20 random websites from the list.</p>
        </div>
      )}
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

      <div className='mx-auto justify-center mt-5 space-y-2'>
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
            className=' border p-3 rounded-md border-white '
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
