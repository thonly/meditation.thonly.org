export async function getLocation(location) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=5&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
    return await response.json();
};