// Simple script to test if we can fetch data from the JSON server
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3001/goals');
    const data = await response.json();
    console.log('Successfully fetched data:');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();