import React, { FC } from 'react';
import cv from '../cv';
import { RichText } from 'readcv';
import Image from 'next/image';

const About: FC = () => {
  return (
    <div className="about">
      <div className="aboutContent">
        <div className="aboutHeader">
          <div className="pfp">
            {/* <img src={cv.general.profilePhoto} /> */}
            <Image src={cv.general.profilePhoto} alt="Profile Photo" width={100} height={100} />
          </div>
          <div>
            <h2>{cv.general.displayName}</h2>
            {cv.general.byline ? <p>{cv.general.byline}</p> : null}
          </div>
        </div>

        {(cv.contact && cv.contact.length > 0) || cv.general.about ? (
          <div className="contactItems">
            {cv.contact && cv.contact.length > 0 ? (
              <>
                {cv.contact.map((contactItem: any, index: number) => {
                  return (
                    <React.Fragment key={contactItem.id}>
                      <div className="contactLabel">{contactItem.platform}</div>
                      <div className="contactItem">
                        <a href={contactItem.url} target="_blank" rel="noreferrer">
                          {contactItem.handle}
                        </a>
                      </div>
                      {index !== (cv.contact?.length ?? 0) - 1 ? <hr /> : null}
                    </React.Fragment>
                  );
                })}
              </>
            ) : null}
            {cv.general.about ? (
              <>
                <hr />
                <div className="contactLabel">About</div>
                <div className="contactItem">
                  <RichText text={cv.general.about} />
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default About;
