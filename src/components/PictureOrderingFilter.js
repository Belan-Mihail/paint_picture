import React, { useContext, useState, useEffect } from "react";
import { PictureOrderingFilterContext } from "./../context/PictureOrderingFiltersContext";


function PictureOrderingFilter() {


const { setPictureOrderingFilter } =
    useContext(PictureOrderingFilterContext);


  const options = [
    {value: '', text: '--filtred by default--'},
    {value: 'likes_count', text: 'Likes (Low to High)'},
    {value: '-likes_count', text: 'Likes (High to Low)'},
    {value: 'comments_count', text: 'Comments (Low to High)'},
    {value: '-comments_count', text: 'Comments (High to Low)'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);

  };



  useEffect(() => {
    setPictureOrderingFilter(selected)
    }, [setPictureOrderingFilter, selected]);

  

  return (
    <div className="mt-2">

      <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PictureOrderingFilter;
