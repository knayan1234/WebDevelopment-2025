import useSimpleAccordion from "../hooks/useAccordion";
const Accordion = ({ children }) => {
  const { openItemId, toggleItem } = useSimpleAccordion();
  //from here took data from hook
  return children({ openItemId, toggleItem });
};

export default Accordion;
