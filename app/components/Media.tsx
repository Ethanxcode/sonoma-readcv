import React, { FC } from 'react';
import Image from 'next/image';

interface MediaProps {
  media: {
    url: string;
    type: string;
  };
}

const Media: FC<MediaProps> = props => {
  let attachment = props.media.type === 'image' ? <Image src={props.media.url} alt="Media" layout="fill" objectFit="cover" /> : <video src={props.media.url} autoPlay muted playsInline loop />;
  return <div className="fullScreenMedia">{attachment}</div>;
};

export default Media;
