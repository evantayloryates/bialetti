import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  PlayIcon, 
  VolumeIcon, 
  ProgressBarSummary, 
  ProgressBar, 
  MokapotIcon, 
  CloseIcon, 
  ColorSelector, 
  BrandBadge, 
  CTAButton,
  FilmLogo,
} from './components'


const defaultClassNames = [
  ".shirt-icon-container",
  ".volume-icon-container",
  ".play-icon-container"
];

const applyPulse = (classNames = defaultClassNames, pulseClass = 'pulse') => {
  
  const elements = document.querySelectorAll(classNames.join(", "));

  let activePulse = false;
  
  elements.forEach(element => {
    if (element.classList.contains(pulseClass)) {
      activePulse = true;
    }
  });
  
  if (activePulse) return
  elements.forEach(element => {
    element.classList.add(pulseClass);
  });

  setTimeout(() => {
    elements.forEach(element => {
      element.classList.remove(pulseClass);
    });
  }, 2000); // 4 seconds
}

const generateId = () => {
  const utcTimestamp = Date.now();
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 12; i++) {
    randomString += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }

  return `${utcTimestamp}.${randomString}`;
}

const trackEvent = (impressionId, targetId, eventId, additionalQuery) => {

  const url = `https://kl914adeu9.execute-api.us-west-1.amazonaws.com/trackingPixelProcessing?env=${process.env.APP_ENV}&impressionId=${impressionId}&targetId=${targetId}&eventId=${eventId}${additionalQuery}`;

  if (["development"].includes(process.env.APP_ENV)) {
    console.log(`Tracking disabled in ${process.env.APP_ENV}. Simulated data below:`)
    console.log(`  IMPRESSION_ID: ${impressionId}`)
    console.log(`  TARGET_ID:     ${targetId}`)
    console.log(`  EVENT_ID:      ${eventId}`)
    console.log(`  ADDED_QUERY:   ${additionalQuery}`)
    console.log(`  FULL_URI:      ${url}`)
  } else {
    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept': 'image/gif',
      },
    })
  }

}

const INITIAL_PLAYTIME_DATA = {
  currentSeconds: 0,
  totalSeconds: 53,
}

const getVideo = () => {
  return document.getElementById('video-player');
}

const START_TIME = 0;
const productRanges = [
  {
    start: 0,
    end: 6.7,
  },
]

const colors = {
  'steel': {
    id: 'steel',
    displayName: 'Steel',
    styleColor: 'rgb(209, 209, 209)',
    default: true,
    img: "https://bialetti-assets.s3.us-west-1.amazonaws.com/colors/steel_product.png",
    price: '38.10',
    href: 'https://amzn.to/46SIrsc',
  },
  'yellow': {
    id: 'yellow',
    displayName: 'Yellow',
    styleColor: 'rgba(245,163,2,255)',
    default: true,
    img: "https://bialetti-assets.s3.us-west-1.amazonaws.com/colors/yellow_product.png",
    price: '58.49',
    href: 'https://amzn.to/3K1OlNX',
  },
  'green': {
    id: 'green',
    displayName: 'Green',
    styleColor: '#7cae8b',
    default: true,
    img: "https://bialetti-assets.s3.us-west-1.amazonaws.com/colors/green_product.png",
    price: '58.49',
    href: 'https://amzn.to/3pRcq3g',
  },
}

const HEARTBEAT_INTERVAL = 3000; // 3 seconds

const Bialetti = () => {

  // const togglePlayState = () => {
  //   const video = document.getElementById('video-player');
  //   console.log('PLAYING INLINE WITHOUT CONTROLS');
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  // }

  useEffect(() => {
    handleEvent(null, "document", "open");

    const intervalId = setInterval(() => {
      handleEvent(null, "document", "heartbeat");
    }, HEARTBEAT_INTERVAL);

    return () => {
      handleEvent(null, "document", "close");
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const video = document.getElementById('video-player');
      let liveProduct = false;
      productRanges.forEach(({start, end}) => {
        if (video.currentTime >= start && video.currentTime <= end) {
          liveProduct = true;
        }
      })
      if (liveProduct) {
        setProductPopperFocused(prev => true);
      } else {
        setProductPopperFocused(prev => false);
      }
    }, 100);
    const video = document.getElementById('video-player');
    video.volume = 0;
    video.currentTime = START_TIME;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [productPopperFocused, setProductPopperFocused] = useState(false);
  const [productOverlayActive, setProductOverlayActive] = useState(false);
  
  const pauseVideo = (paused) => {
    const video = getVideo();
    if (paused) { video.pause() }
    else { video.play() }
  }

  const muteVideo = (muted) => {
    const video = getVideo();
    if (muted) { 
      video.volume = 0;
      video.muted = true; 
    } else { 
      video.volume = 1
      video.muted = false; 
    }
  }

  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  const [playedBefore, setPlayedBefore] = useState(false);
  const defaultColor = Object.values(colors).find(c => c.default);
  const [activeColor, setActiveColor] = useState(defaultColor.id);
  
  const toggleMuted = () => {
    applyPulse(['.volume-icon-container'], 'mobile-pulse')
    muteVideo(!muted)
    setMuted(prev => !prev)
  }

  const impressionId = useMemo(generateId, []);
  
  const togglePaused = (event) => {
    pauseVideo(!paused)
    if (!playedBefore) {
      muteVideo(false)
      setMuted(prev => false)
      setPlayedBefore(prev => true)
    }
    setPaused(prev => !prev)
  }


  const calcPercentage = (video) => {
    if (video) {
      const percentage = (video.currentTime / video.duration) * 100;
      return Math.round(percentage)
    } else {
      return 0
    }
  }
  const calcPlaytimeData = (video) => {
    if (video) {
      return {
        currentSeconds: Math.floor(video.currentTime) || INITIAL_PLAYTIME_DATA.currentSeconds,
        totalSeconds: Math.floor(video.duration) || INITIAL_PLAYTIME_DATA.totalSeconds,
      }
    } else { 
      return INITIAL_PLAYTIME_DATA;
    }
  }


  useEffect(() => {
    muteVideo(muted);
    pauseVideo(paused);
  }, [])

  
  const preMediaVisibilityClass = paused ? 'visible' : 'hidden';

  const inOverlayMode = () => {
    return paused;
  }

  const modeClass = inOverlayMode() ? 'overlay-mode' : 'player-mode';

  const { currentSeconds, totalSeconds } = calcPlaytimeData(getVideo());

  const productOverlayClass = productOverlayActive ? 'active' : 'inactive';

  const handleProductPopperClick = () => {
    pauseVideo(true);
    setProductOverlayActive(prev => true)
  }

  const handleCloseIconClick = () => {
    if (!inOverlayMode()) {
      pauseVideo(false);
    }
    setProductOverlayActive(prev => false)
  }

  const getMedia = (url: string) => {
    return url
  }

  useEffect(() => {
    const handleClick = (event) => {
      
      const preMediaHidden = document.querySelector('.pre-media-layer.fill.hidden') !== null;

      if (preMediaHidden) {
        applyPulse();
      }

      const cyrusShell = document.querySelector('div.cyrus-shell');
      const { left, top } = cyrusShell.getBoundingClientRect();

      const x = event.clientX - left;
      const y = event.clientY - top;
 
      if (x <= 300 && y <= 250) {
        handleEvent(event, "document", "click", `&x=${x}&y=${y}`)
      }
    };

    // Adding the event listener
    document.addEventListener('click', handleClick);

    // Returning a cleanup function to remove the event listener
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);  // Empty dependency array so this runs on

  const handleEvent = (event, targetId, eventId, additionalQuery = '') => {
    trackEvent(impressionId, targetId, eventId, additionalQuery);
    if (event) event.stopPropagation();
  }

  return (
    <>
      <div className='cyrus-shell'>
        <div className={`pre-media-layer fill ${preMediaVisibilityClass}`}> 
          <img style={{ maxWidth: '300px', maxHeight: '175px' }} src={getMedia("https://bialetti-assets.s3.us-west-1.amazonaws.com/poster.png")} />
        </div>
        <div className='product-layer'>
          <MokapotIcon focused={productPopperFocused && !inOverlayMode()} onEvent={handleEvent} onClick={handleProductPopperClick}/>
          <FilmLogo visibilityClass={preMediaVisibilityClass} onEvent={handleEvent} onClick={() => { window.open("https://www.youtube.com/watch?v=1y3h0B2b-HA", '_blank')}}/>
        </div>
        <div className={`product-overlay ${productOverlayClass}`}>
          <div className='product-overlay-panel'>
            <div className='colors-column'>
              { Object.values(colors).map(c => (
                <ColorSelector
                  key={c.id}
                  id={c.id}
                  onEvent={handleEvent}
                  onClick={() => setActiveColor(prev => c.id)}
                  styleColor={c.styleColor}
                  selected={activeColor === c.id}
                />
              ))}              
            </div>
            <div className='product-column'>
              <BrandBadge onEvent={handleEvent} onClick={() => { window.open('https://www.bialetti.com/', '_blank')}} />
              <img className='product-media' src={getMedia(colors[activeColor].img)} />
              <div className="product-glow"/>              
            </div>
            <CTAButton bgColor={colors[activeColor].styleColor} onEvent={handleEvent} onClick={() => { window.open(colors[activeColor].href, '_blank')}}/>
            <div className='actions-column'>
              <CloseIcon onEvent={handleEvent} onClick={handleCloseIconClick}/>
            </div>
          </div>
        </div>
        <div className='controls-layer'>
          <div className={`main-controls ${modeClass}`}>
            <PlayIcon paused={paused} togglePaused={togglePaused} onEvent={handleEvent}/>
            <ProgressBarSummary 
              currentSeconds={currentSeconds}
              totalSeconds={totalSeconds}
              overlayMode={inOverlayMode()}/>
            <VolumeIcon muted={muted} onEvent={handleEvent} toggleMuted={toggleMuted} />
          </div>
          <ProgressBar overlayMode={inOverlayMode()} percent={calcPercentage(getVideo())} />
        </div>
        <div className='media-layer fill'> 
          <video 
            id='video-player' 
            className='cyrus-main-media' 
            src={getMedia("https://bialetti-assets.s3.us-west-1.amazonaws.com/video.mp4")}
            type='video/mp4'
            autoPlay={false} 
            playsInline 
            controls={false} /> 
        </div>
      </div>
    </>
  );
}

export default Bialetti;
