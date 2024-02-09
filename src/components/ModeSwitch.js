import React, { useContext, useState, useEffect } from "react";
import { ThemesModeContext } from "./../context/ThemesModeContext";
import styles from "../styles/Select.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

/*
  component used to display a select menu with the name of the site’s color schemes 
*/

function ModeSwitch() {
  const { setThemesMode } = useContext(ThemesModeContext);

  const options = [
    { value: "light", text: "Light" },
    { value: "turquoise", text: "Turquoise" },
    { value: "orange", text: "Orange" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    setThemesMode(selected);
    AOS.init();
    AOS.refresh();
  }, [setThemesMode, selected]);

  return (
    <div className="mt-2" data-aos="fade-left">
      <select
        className={styles.Select}
        value={selected}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModeSwitch;
