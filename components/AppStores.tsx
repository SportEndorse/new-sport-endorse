
import '../styles/appStores.css';

interface AppStoresProps {
  pageName?: string;
}

export default function AppStores({ pageName }: AppStoresProps) {
  const additionalClassName = pageName ? `app-stores-${pageName}` : '';
  const appleStoreClassName = pageName ? `apple-store apple-store-${pageName}` : 'apple-store';
  const playStoreClassName = pageName ? `play-store play-store-${pageName}` : 'play-store';
  
  return (
    <div className={`app-stores ${additionalClassName}`}>
      <a target="_blank" href="https://apps.apple.com/gb/app/sport-endorse/id1524881578">
        <div style={{ position: "relative" }} className={appleStoreClassName}>
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
        <div style={{ position: "relative" }} className={playStoreClassName}>
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