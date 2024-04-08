import { useSearchParams } from "react-router-dom";
export const useFilter = () => {
  const [querySearch, setQuerySearch] = useSearchParams();
  const handleFilterChange = (
    {
      key,
      value = null,
    }: {
      key: string;
      value?: null | string ;
    },
    replace = true
  ) => {
    setQuerySearch(
      (preParams) => {
        if (value == null) {
          preParams.delete(key);
        } else {
          preParams.set(key, value);
        }
        return preParams;
      },
      { replace: replace }
    );
  };
  // const handleChange = ({ value, label }, text) => {
  //     if (querySearch.get(text) == value) return
  //     handleFilterChange(text, value)
  // }
  return { handleFilterChange };
};
