import Image from 'next/image';
import React, { FC } from 'react';

interface AttachmentsProps {
  attachments: Array<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  open: (object: WindowItem) => void;
  windows: WindowItem[];
}

const Attachments: FC<AttachmentsProps> = props => {
  return (
    <div className="noteAttachments">
      {props.attachments.map((media, index) => {
        let attachment =
          media.type === 'image' ? (
            <Image src={media.url} alt="Note attachments" layout="responsive" width={media.width} height={media.height} />
          ) : (
            <video src={media.url} autoPlay muted playsInline loop />
          );

        return (
          <div
            tabIndex={0}
            className="media"
            style={{
              aspectRatio: `${media.width} / ${media.height}`,
            }}
            onDoubleClick={() => {
              if (props.windows.some(e => e.attachment === media)) {
                return;
              }
              props.open({
                type: 'media',
                name: media.width + ' × ' + media.height,
                attachment: media,
              });
            }}
            key={media.url}
          >
            {attachment}
          </div>
        );
      })}
    </div>
  );
};

export default Attachments;
