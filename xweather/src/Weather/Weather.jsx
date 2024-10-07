const WeatherApp = () => {
    const [city, setCity] = useState(null);
    const [cityName, setCityName] = useState("");
    const [isCityPresent, setIsCityPresent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const formSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${cityName}`);
        const data = await response.json();
        if (data.location) {
          setCity(data);
          setCityName(data.location.name);
          setIsCityPresent(true);
        } else {
          alert("Failed to fetch weather data");
          setIsCityPresent(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <form onSubmit={formSubmit} style={{ textAlign: "center", paddingTop: "5rem" }}>
          <input type="text" placeholder="Enter City Name" style={{ padding: "0.5rem", marginRight: "0.5rem" }} onChange={(e) => setCityName(e.target.value)} />
          <button style={{ backgroundColor: "green", padding: "0.5rem" }} type="submit">Search</button>
        </form>
        {isLoading && <p style={{ textAlign: "center" }}>Loading data...</p>}
        {isCityPresent && city && (
          <div className="weather-cards" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <div className="weather-card" style={{ backgroundColor: "#ffffff", textAlign: "center", margin: "1rem", width: "20rem", padding: "1rem", borderRadius: "8px" }}>
                  <h4>Temperature</h4>
                  <p>{city.current.temp_c}°C</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="weather-card" style={{ backgroundColor: "#ffffff", textAlign: "center", margin: "1rem", width: "20rem", padding: "1rem", borderRadius: "8px" }}>
                  <h4>Humidity</h4>
                  <p>{city.current.humidity}%</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="weather-card" style={{ backgroundColor: "#ffffff", textAlign: "center", margin: "1rem", width: "20rem", padding: "1rem", borderRadius: "8px" }}>
                  <h4>Condition</h4>
                  <p>{city.current.condition.text}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="weather-card" style={{ backgroundColor: "#ffffff", textAlign: "center", margin: "1rem", width: "20rem", padding: "1rem", borderRadius: "8px" }}>
                  <h4>Wind Speed</h4>
                  <p>{city.current.wind_kph} kph</p>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </>
    );
  };
  