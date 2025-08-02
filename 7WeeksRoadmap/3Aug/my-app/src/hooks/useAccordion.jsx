// This hook only manages which single item is open.

import { useState, useCallback } from "react";

const useSimpleAccordion = () => {
  // 1. State: `openItemId` will be null or the ID of the open item (e.g., 'item-1').
  const [openItemId, setOpenItemId] = useState(null);

  // 2. Logic: A function to handle clicking a title.
  const toggleItem = useCallback((itemId) => {
    // If the clicked item is already open, close it (set state to null).
    // Otherwise, open the clicked item.
    setOpenItemId((prevOpenId) => (prevOpenId === itemId ? null : itemId));
  }, []); // Empty array: this function never needs to be recreated.

  // 3. Return the state and the function. This is the "API".
  return { openItemId, toggleItem };
};

export default useSimpleAccordion;
