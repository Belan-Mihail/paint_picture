import React, { useContext, useState, useEffect } from "react";
import { PictureOrderingFilterContext } from "./../context/PictureOrderingFiltersContext";
import styles from '../styles/Select.module.css'
import AOS from "aos";
import "aos/dist/aos.css";


function PictureOrderingFilter() {


const { setPictureOrderingFilterCont } =
    useContext(PictureOrderingFilterContext);


  const options = [
    {value: '', text: '--filtered by default--'},
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
    setPictureOrderingFilterCont(selected)
    AOS.init();
        AOS.refresh();
    }, [setPictureOrderingFilterCont, selected]);

  

  return (
    <div className="mb-4" data-aos="fade-right">

      <select value={selected} onChange={handleChange} className={styles.Select}>
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
