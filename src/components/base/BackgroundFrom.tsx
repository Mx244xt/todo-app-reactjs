import { ReactNode } from 'react';
import BackgroundImage from './BackgroundImage';

interface BackgroundFromType {
  children: ReactNode;
}

function BackgroundFrom({ children }: BackgroundFromType) {
  return (
    <div className='grid min-h-screen landscape:max-h-full grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      {children}
    </div >);
}

export default BackgroundFrom;
