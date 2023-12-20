import { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Make the API request to your backend
        const response = await fetch('http://localhost:8080/api/statistics');

        // Check if the request was successful (status code 200-299)
        if (response.ok) {
          // Parse the JSON response
          const result = await response.json();

          // Log the data to the console
          console.log(result);
        } else {
          // Handle errors if the request was not successful
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Render your component
  return <div>{/* Render your component content here */}</div>;
};

export default YourComponent;
