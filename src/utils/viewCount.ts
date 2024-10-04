import { fetchAndUpdateViews } from "@/redux/features/viewsSlice";
import { AppDispatch, RootState } from "@/redux/store"; // Ensure this path is correct
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useViewCounter = (slug: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const views = useSelector((state: RootState) => state.views.views);

  useEffect(() => {
    if (slug) {
      dispatch(fetchAndUpdateViews(slug));
    }
  }, [slug, dispatch]);

  return views;
};

export default useViewCounter;
