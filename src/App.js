import './App.css';
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import WalletAddress from './components/WalletAdress';


// Here's the new import for the file we just added
import Menu from './components/Menu';

function App() {
  const { status, connect, disconnect, availableConnectTypes } = useWallet();

  console.log("Wallet status is ", status);
  console.log("Available connection types:", availableConnectTypes);

  const renderConnectButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div className="connect-wallet-div">
          <button
            type="button"
            key={`connect-EXTENSION`}
            onClick={() => connect("EXTENSION")}
            className="cta-button connect-wallet-button"
          >
            Connect wallet
          </button>
        </div>
      );
    }
    else if (status === WalletStatus.WALLET_CONNECTED) {
      return (
        <button
          type="button"
          onClick={() => disconnect()}
          className="cta-button connect-wallet-button"
        >
          Disconnect
        </button>
      );
    }
  };

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>Protect Do Kween</h1>
          <p>Only Lunatics can save Do Kween from Terra fudders</p>
				</div>
				{renderConnectButton()}
				<WalletAddress />
      </header>

      {/* If not connected, show the goblin GIF! */}
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <div>
          <img
            src="DoKwoon.gif"
            alt="Do Kwon gif"
          />
        </div>
      )}

      {/* Show the menu after connection */}
      {status === WalletStatus.WALLET_CONNECTED && (
          	<div >
            	<Menu />
							<img className="dance-gif"
            	src="DancingDo.gif"
            	alt="Do Kwon Dancing gif"
          	/>
          </div>
        )}
        

      
    </main>
  );
}

export default App;