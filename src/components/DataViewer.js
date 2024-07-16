import React, { useState, useEffect } from 'react';
import { fetchLatestCIDs, fetchPinataData } from '../Services/pinataService';

const DataViewer = () => {
  const [eventData, setEventData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { events_cid, rewards_cid } = await fetchLatestCIDs();
        
        if (events_cid) {
          const eventsData = await fetchPinataData(events_cid);
          setEventData(eventsData);
        }
        
        if (rewards_cid) {
          const rewardsData = await fetchPinataData(rewards_cid);
          setRewardData(rewardsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Events Data</h2>
      {eventData ? (
        <pre>{JSON.stringify(eventData, null, 2)}</pre>
      ) : (
        <p>No event data available</p>
      )}

      <h2>Rewards Data</h2>
      {rewardData ? (
        <pre>{JSON.stringify(rewardData, null, 2)}</pre>
      ) : (
        <p>No reward data available</p>
      )}
    </div>
  );
};

export default DataViewer;