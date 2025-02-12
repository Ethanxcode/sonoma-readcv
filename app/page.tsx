'use client';

import React, { useState, useEffect, useRef, FC, ReactNode, MouseEvent, PointerEvent } from 'react';
import { RichText, combineCollections } from 'readcv';
import { motion, useDragControls, AnimatePresence, useMotionValue } from 'framer-motion';
import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-mono/700.css';
import '@fontsource/ia-writer-mono/400-italic.css';
import '@fontsource/ia-writer-mono/700-italic.css';
import Desktop from './components/Desktop';
import Toolbar from './components/Toolbar';
import cv from './cv';
import Image from 'next/image';

// Các biến này giả lập dữ liệu từ bên ngoài (cv, siteSettings).
// Nếu có file định nghĩa riêng, bạn có thể import type/interface chi tiết vào thay thế.

const App: FC = () => {
  return (
    <div className="hero-container">
      <Toolbar />
      <Desktop />
    </div>
  );
};

interface AboutProps {
  // Tuỳ ý định nghĩa thêm nếu muốn
}

const About: FC<AboutProps> = props => {
  return (
    <div className="about">
      <div className="aboutContent">
        <div className="aboutHeader">
          <div className="pfp">
            <Image src={cv.general.profilePhoto} alt="Profile Photo" layout="fill" objectFit="cover" />
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
                      {cv.contact && index !== cv.contact.length - 1 ? <hr /> : null}
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

export default App;
