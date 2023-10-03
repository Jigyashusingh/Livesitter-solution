import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [overlays, setOverlays] = useState([]);
  const [overlayFormData, setOverlayFormData] = useState({
    content: '',
    position: '',
    size: ''
  });

  useEffect(() => {
    // Fetch overlays from the backend API
    fetch('/api/overlays')
      .then((response) => response.json())
      .then((data) => setOverlays(data))
      .catch((error) => console.error('Error fetching overlays:', error));
  }, []);

  const handleOverlaySubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add a new overlay
    fetch('/api/overlays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(overlayFormData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOverlays([...overlays, overlayFormData]);
        setOverlayFormData({
          content: '',
          position: '',
          size: ''
        });
      })
      .catch((error) => console.error('Error adding overlay:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Live Stream Video App</h1>
      </header>
      <main className="App-main">
        <div className="video-container">
          {/* Video player here */}
          {/* Note: Implement video streaming here */}
        </div>
        <div className="overlay-form">
          <h2>Add Custom Overlay</h2>
          <form onSubmit={handleOverlaySubmit}>
            <label htmlFor="overlay-content">Overlay Content:</label>
            <input
              type="text"
              id="overlay-content"
              value={overlayFormData.content}
              onChange={(e) =>
                setOverlayFormData({ ...overlayFormData, content: e.target.value })
              }
              required
            />
            <label htmlFor="overlay-position">Overlay Position:</label>
            <input
              type="text"
              id="overlay-position"
              value={overlayFormData.position}
              onChange={(e) =>
                setOverlayFormData({ ...overlayFormData, position: e.target.value })
              }
              required
            />
            <label htmlFor="overlay-size">Overlay Size:</label>
            <input
              type="text"
              id="overlay-size"
              value={overlayFormData.size}
              onChange={(e) =>
                setOverlayFormData({ ...overlayFormData, size: e.target.value })
              }
              required
            />
            <button type="submit">Add Overlay</button>
          </form>
        </div>
      </main>
      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
}

export default App;
