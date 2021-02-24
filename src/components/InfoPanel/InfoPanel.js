import React from 'react';

import './infoPanel.css';

function InfoPanel(props) {
  return (
    <div className="currentScore">
      Текущий счет: { props.score }
    </div>
  );
}

export default InfoPanel;
