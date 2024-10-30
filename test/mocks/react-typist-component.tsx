import { ReactNode, useEffect } from 'react';

const Typist = ({
  children,
  onTypingDone = () => {},
}: {
  children: ReactNode;
  onTypingDone: () => void;
}) => {
  useEffect(() => {
    onTypingDone();
  }, [onTypingDone]);

  return <span>{children}</span>;
};

export default Typist;
