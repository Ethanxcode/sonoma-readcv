import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { siteSettings } from '../constants';

interface PlayerProps {
  close: () => void;
}

const Player: FC<PlayerProps> = (props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    audioElement.addEventListener("timeupdate", updateProgress);
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div
      className="soundtrack"
      data-theme={siteSettings.soundtrack.playerColor}
      data-paused={!isPlaying}
    >
      <div className="controls">
        <PlayerButton className="closeSoundtrack" onClick={props.close}>
          <Close12 />
        </PlayerButton>
        <PlayerButton className="playToggle" onClick={togglePlayPause}>
          {isPlaying ? <Pause12 /> : <Play12 />}
          <div className="progress">
            <Progress24 percentage={progress} />
          </div>
        </PlayerButton>
      </div>
      <img src={siteSettings.soundtrack.artwork.url} draggable={false} />
			{/* <Image src={siteSettings.soundtrack.artwork.url} alt="Artwork" draggable={false} width={500} height={500} /> */}
      <audio ref={audioRef} autoPlay src={siteSettings.soundtrack.track.url} />
    </div>
  );
};

interface PlayerButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const PlayerButton: FC<PlayerButtonProps> = (props) => {
  return (
    <button className={"playerButton " + (props.className || "")} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

const Pause12: FC = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zM8.5 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
};

const Play12: FC = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.748 1.068a.5.5 0 01.497-.004l8 4.5a.5.5 0 010 .872l-8 4.5A.5.5 0 012.5 10.5v-9a.5.5 0 01.248-.432z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
};

const Close12: FC = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.793 1.793c.214-.215.547-.231.742-.036l.707.707c.195.196.18.528-.035.743L7.414 6l2.793 2.793c.214.215.23.547.035.743l-.707.707c-.195.195-.528.18-.742-.036L5.999 7.414l-2.792 2.793c-.215.215-.548.23-.743.036l-.707-.708c-.195-.195-.18-.527.035-.742L4.585 6 1.792 3.207c-.215-.215-.23-.547-.035-.742l.707-.708c.195-.195.528-.179.742.036L6 4.586z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
};


interface Progress24Props {
	percentage: number;
}

const Progress24: FC<Progress24Props> = ({ percentage }) => {
	const pathRef = useRef<SVGCircleElement | null>(null);
	const [pathLength, setPathLength] = useState(0);

	useEffect(() => {
		if (pathRef.current) {
			const length = pathRef.current.getTotalLength();
			setPathLength(length);

			// Set stroke-dasharray và stroke-dashoffset theo percentage
			pathRef.current.style.strokeDasharray = `${(percentage / 100) * length} ${length}`;
			pathRef.current.style.strokeDashoffset = "0";
		}
	}, [percentage]);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
			<circle
				ref={pathRef}
				cx={12}
				cy={12}
					r={11.5}
					stroke="#fff"
				style={{
					stroke: siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000",
					strokeOpacity: 1,
				}}
			/>
		</svg>
	);
};

export default Player