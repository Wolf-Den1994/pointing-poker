import React from 'react';

import cl from './Content.module.scss';

const Content: React.FC = () => {
  return (
    <main className={cl.main}>
      <div className="container">Content</div>
    </main>
  );
};

export default Content;
