import { useState } from 'react';
import './Featured.scss';
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="conatiner">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInputs">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "Building mobile app"'
                size={50}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
