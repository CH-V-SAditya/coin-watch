import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa'; // <--- New Icon Import

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      
      {/* HEADER SECTION */}
      <div className='coin-search'>
        
        {/* Animated Title & Logo */}
        <div className='title-container'>
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }} // Spin on hover
            transition={{ duration: 0.5 }}
          >
            <FaCoins className='main-icon' />
          </motion.div>
          <h1 className='coin-text'>CoinWatch</h1>
        </div>

        {/* The Catchy Slogan */}
        
        <p className='coin-slogan'>The Pulse of the Crypto World</p>

        <form>
          <input
            type='text'
            placeholder='Search currencies...'
            className='coin-input'
            onChange={handleChange}
          />
        </form>
      </div>

      {/* THE LIST */}
      <div className="coin-container">
        {filteredCoins.map((coin, index) => (
          <motion.div
            key={coin.id}
            className='coin-row'
            initial={{ opacity: 0, x: -50 }} // Changed to slide in from left
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }} // Faster cascade
          >
            <div className='coin'>
              <img src={coin.image} alt='crypto' />
              <h1>{coin.name}</h1>
              <p className='coin-symbol'>{coin.symbol}</p>
            </div>
            <div className='coin-data'>
              <p className='coin-price'>${coin.current_price.toLocaleString()}</p>
              
              {coin.price_change_percentage_24h < 0 ? (
                <p className='coin-percent red'>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : (
                <p className='coin-percent green'>
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}
              
              <p className='coin-marketcap'>
                Mkt Cap: ${coin.market_cap.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App; 