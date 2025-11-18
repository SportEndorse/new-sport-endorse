
import '../styles/appStores.css';

export default function AppStores() {
  return (
    <div className="app-stores">
      <a target="_blank" href="https://apps.apple.com/gb/app/sport-endorse/id1524881578">
        <div style={{ position: "relative" }} className="apple-store">
          <img
            src="/images/appleStore-min.png"
            alt="App Store"
            width="170"
            height="60"
            style={{ objectFit: "contain" }}
          />
        </div>
      </a>
      <a target="_blank" href="https://play.google.com/store/apps/details?id=com.sportendorse.app&pli=1">
        <div style={{ position: "relative" }} className="play-store">
          <img
            src="/images/googlePlay-min.png"
            alt="Google Play"
            width="170"
            height="60"
            style={{ objectFit: "contain" }}
          />
        </div>
      </a>
    </div>
  )
}