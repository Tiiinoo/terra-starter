import { Link } from 'react-router-dom';

const Guide = () => {
  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>Protect Do Kween</h1>
            <p>Protect Do Kween from fudders, taking them down one at a time</p>
          </div>
        </Link>
      </header>

      <div className="score-board-container">
        <h3>How to play</h3>
        
        <div className="help-text"> 
          <span className="help">
            Click as many Terra's fudders heads as you can within 15 seconds!
          </span>
					
        </div>
      </div>
    </main>
  );
};

export default Guide;