
import '../styles/appStores.css';

export default function AppStores() {
  return (
    <div className="app-stores">
      <a target="_blank" href="https://apps.apple.com/gb/app/sport-endorse/id1524881578">
        <div className="app-store-image">
          <img
            src="/images/appleStore.png"
            alt="App Store"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      </a>
      <a target="_blank" href="https://play.google.com/store/apps/details?id=com.sportendorse.app&pli=1">
        <div className="app-store-image">
          <img
            src="/images/googlePlay.png"
            alt="Google Play"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      </a>
    </div>
  )
}