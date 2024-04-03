import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/worker/jobs?page=${page}`);
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setJobs(prevJobs => [...prevJobs, ...data]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Feed</h1>
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchJobs}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>More jobs coming soon</p>}
        className="flex flex-col"
      >
        {jobs.map(job => (
          <div key={job._id} className="border border-gray-200 p-4 rounded-md mb-4">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <p className="text-gray-700">{job.description}</p>
            <p className="mt-4 text-sm text-gray-500">{job.location}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
