import React, { FC } from 'react';
import { RichText } from 'readcv';
import Attachments from './Attachments';

interface NoteProps {
  experience: any;
  open: (object: WindowItem) => void;
  windows: WindowItem[];
}

const Note: FC<NoteProps> = props => {
  return (
    <div className="note">
      <div className="noteContent">
        <h2>{props.experience.heading}</h2>
        {props.experience.year || props.experience.location ? (
          <p>
            {props.experience.year ? props.experience.year : null}
            {props.experience.year && props.experience.location ? ', ' : null}
            {props.experience.location ? props.experience.location : null}
          </p>
        ) : null}
        {props.experience.description ? <RichText text={props.experience.description} /> : null}
        {props.experience.url ? (
          <p>
            <a href={props.experience.url} target="_blank" rel="noreferrer">
              View link
            </a>
          </p>
        ) : null}
        {props.experience.attachments && props.experience.attachments.length > 0 ? <Attachments attachments={props.experience.attachments} open={props.open} windows={props.windows} /> : null}
      </div>
    </div>
  );
};

export default Note;
