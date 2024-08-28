import React, { useEffect } from 'react';

const Typist = ({ children, onTypingDone }) => {
  useEffect(() => {
    onTypingDone();
  }, [onTypingDone]);

  return <span>{children}</span>;
};

export default Typist;
