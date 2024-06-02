import { BROWSE_TAB } from "../../utils/constants";
import { useSelector } from "react-redux";
import Browse from "../Browse";

const BrowseContainer = () => {
  const activeTab = useSelector((state) => state.activeBrowseTab);

  if (activeTab === BROWSE_TAB.GPTSearch) return <h1>Coming Soon...</h1>;

  return <Browse />;
};

export default BrowseContainer;
