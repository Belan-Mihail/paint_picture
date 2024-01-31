import React, { useContext, useState, useEffect } from "react";
import { ThemesModeContext } from "./../context/ThemesModeContext";
import styles from '../styles/Select.module.css'

function ModeSwitch() {


const { setThemesMode } =
    useContext(ThemesModeContext);


  const options = [
    
    {value: 'light', text: 'Light'},
    {value: 'turquoise', text: 'Turquoise'},
    {value: 'orange', text: 'Orange'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);

  };


  useEffect(() => {
    setThemesMode(selected)
    }, [setThemesMode, selected]);

  

  return (
    <div className="mt-2">
      <select className={styles.Select} value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModeSwitch;