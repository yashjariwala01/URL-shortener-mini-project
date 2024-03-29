
import React, { useState } from 'react';
import { TbReload } from "react-icons/tb";

function ShortenUrl() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [prefix, setPrefix] = useState('');
    const [error, setError] = useState('');

    const shortenUrl = () => {
        let apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`;
        if (prefix.trim() !== '') {
            apiUrl += `&custom_alias=${encodeURIComponent(prefix.trim())}`;
        }

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setShortenedUrl(data);
                setError('');
            })
            .catch(error => {
                setShortenedUrl('');
                setError('Error: Unable to shorten URL!');
            });
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
           <div className="max-w-xl w-full p-8 bg-gray-100 rounded-lg shadow-lg flex flex-col gap-4">
            <h1 className='flex flex-col gap-2 mt-[-25px] mb-3 text-center text-4xl font-bold'>TinyUrl <span className='text-xl font-medium '>make your url Tiny</span></h1>
           <div>
                <input type="text" placeholder="Original URL" value={originalUrl} onChange={e => setOriginalUrl(e.target.value)} className="block w-full mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                <button onClick={shortenUrl} className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Shorten URL</button>
                <textarea value={shortenedUrl} readOnly className="block w-full mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                {error && <p className="text-red-500">{error}</p>}
                <button onClick={handleReload} className="flex items-center justify-center w-full mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Reload <TbReload  className="w-4 h-4 mr-2" /> 
                </button>
            </div>
           </div>
        </div>
    );
}

export default ShortenUrl;


