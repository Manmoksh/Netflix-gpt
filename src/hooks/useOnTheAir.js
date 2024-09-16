import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addOnTheAir } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useOnTheAir() {
  const dispatch = useDispatch();

  const onTheAir = useSelector((store) => store.movie.onTheAir);

  async function getOnTheAir() {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addOnTheAir(result?.results));
  }
  useEffect(() => {
    !onTheAir && getOnTheAir();
  }, []);
}
