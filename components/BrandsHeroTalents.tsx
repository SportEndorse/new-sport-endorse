"use client";
import "../styles/brandsHeroTalents.css";


export default function BrandsHeroTalents() {
  const talents = [
    {
      name: "Fabian Pecher",
      image: "/images/featuredTalent/fabian pecher.png",
      followingInstagram: "257k",
      followingTiktok: "643k",
      sport: "Freestyle Football",
      location: "Augsburg"
    },
    {
      name: "Abby Berner",
      image: "/images/featuredTalent/abby berner.png",
      followingInstagram: "2.6M",
      followingTiktok: "6M",
      sport: "Fitness",
      location: "Kansas, USA"
    },
    {
      name: "Amir Abedzadeh",
      image: "/images/featuredTalent/amir abedzadeh.png",
      followingInstagram: "874k",
      followingTiktok: null,
      sport: "Football",
      location: "Valencia"
    },
    {
      name: "Emily Cole",
      image: "/images/featuredTalent/emily cole.webp",
      followingInstagram: "183k",
      followingTiktok: "328k",
      sport: "Athletics",
      location: "North Carolina, USA"
    },
    {
      name: "Sergio Sanchez",
      image: "/images/featuredTalent/sergio sanchez.png",
      followingInstagram: "137k",
      followingTiktok: "146.2k",
      sport: "Football",
      location: "Barcelona"
    },
    {
      name: "Jordi Garcia",
      image: "/images/featuredTalent/jordi garcia.png",
      followingInstagram: "10.5k",
      followingTiktok: null,
      sport: "Triathlon",
      location: "Barcelona"
    }
  ];

  return (
    <div className="brands-hero-talents">
      <div className="hero-talents-header">
        <h3>Featured Athletes</h3>
        <p>Discover elite talent from around the world</p>
      </div>
      
      <div className="hero-talents-scroll">
        {talents.map((talent, i) => (
          <div className="hero-talent-card" key={i}>
            <img src={talent.image} alt={`${talent.name} profile`} width={200} height={200} />
            <div className="hero-talent-info">
              <p className="hero-talent-name">{talent.name}</p>
              <div className="hero-social-logos">
                {talent.followingInstagram && (
                  <div className="hero-social-platform">
                    <img src="/images/instagramLogo.webp" alt="instagram logo" width={24} height={24} className="hero-social-logo" />
                    <p className="hero-follower-count">{talent.followingInstagram}</p>
                  </div>
                )}
                {talent.followingTiktok && (
                  <div className="hero-social-platform">
                    <img src="/images/tiktokLogo.webp" alt="tiktok logo" width={24} height={24} className="hero-social-logo" />
                    <p className="hero-follower-count">{talent.followingTiktok}</p>
                  </div>
                )}
              </div>
              <div className="hero-tags">
                <span><img src="/images/trophy-min.png" alt="trophy icon" width={16} height={16} className="hero-tag-icon"/>{talent.sport}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* CTA Card */}
        <a target="_blank" href="https://platform.sportendorse.com/signup/brand" className="hero-cta-card">
          <img src="/images/whiteSportEndorseLogo.webp" alt="Sport Endorse logo" width={120} height={40} />
          <h4>View All Athletes</h4>
        </a>
      </div>
    </div>
  );
}