import { useEffect, useState } from 'react';
import { convertDateToEpoch, convertEpochToTimeString } from './helper/helper';
import axios from 'axios';

function App() {
  const [data, setData] = useState<number | null>(null);
  const [difference, setDifference] = useState<number | null>(null);
  const [metricsData, setMetricsData] = useState<string>('');

  useEffect(() => {
    const updateTimeDifference = () => {
      if (data) {
        const difference = convertDateToEpoch(Date.now()) - data;
        setDifference(difference);
      }
    };

    const fetchData = () => {
      axios
        .get('/time', { headers: { Authorization: 'mysecrettoken' } })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return res.data.epoch;
        })
        .then((data) => setData(data))
        .catch((error) => console.error(error));

      axios
        .get('/metrics', { headers: { Authorization: 'mysecrettoken' } })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then((data) => {
          setMetricsData(data);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(data);
    };

    fetchData();
    const timeRefresh = setInterval(updateTimeDifference, 1000);
    const dataRefreshInterval = setInterval(fetchData, 30000);

    return () => {
      clearInterval(timeRefresh);
      clearInterval(dataRefreshInterval);
    };
  }, [data]);

  return (
    <div className='App'>
      <div className='header'>Matt Goodwin Technical Task</div>
      <div className='main'>
        <div className='left-block'>
          <h1>Server Time</h1>

          {data && difference ? (
            <>
              <p data-testid='serverTime'>{`Server Time: ${data}`}</p>
              <p data-testid='difference'>{`Time Difference: ${convertEpochToTimeString(
                difference
              )}`}</p>
            </>
          ) : (
            <p data-testid='serverTimeLoading'>Loading ...</p>
          )}
        </div>
        <div className='right-block'>
          <h1>Prometheus Metrics</h1>
          {metricsData ? (
            <>
              <pre data-testid='metrics'>{metricsData}</pre>{' '}
            </>
          ) : (
            <p data-testid='metricsLoading'>Loading ...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
