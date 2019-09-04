import React from 'react';
import classnames from 'classnames/dedupe';

const flashMessage = ({ status, title, texts }) => {
  const flashMessageClass = classnames('notification', `${status}`);
  return (
    <div className={flashMessageClass}>
      <p>{title}</p>
      {texts.length && (
        <ul>
          {texts.map(text => (
            <li key={text}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default flashMessage;
