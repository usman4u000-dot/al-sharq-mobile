import React, { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Restore default native browser cursor unconditionally
    document.body.style.cursor = 'auto';
  }, []);

  return null;
}

