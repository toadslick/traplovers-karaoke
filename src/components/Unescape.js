import React from 'react';

// Unescapes HTML character entities.
// WARNING: This is vunerable to XSS attacks!
const Unescape = ({ children }) => (
  <span dangerouslySetInnerHTML={{ __html: children }} />
);

export default Unescape;
