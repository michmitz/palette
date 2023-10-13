import React, { useEffect, useRef, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";

export interface DropdownProps {
  readonly defaultValue: any;
  readonly dropdownValues: ReadonlyArray<any>;
  readonly onChange?: (value: any) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  defaultValue,
  dropdownValues,
  onChange,
}) => {
  const ref = useRef<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);

  return (
    <div>
        <span>IDK:</span>
      <div>
        <div
          onClick={() => setShowMenu(true)}
        >
          {defaultValue}
          <CaretDownOutlined />
        </div>
        {showMenu && (
          <ul ref={ref}>
            {dropdownValues.map((value) => {
              return (
                <li
                  value={value}
                  key={value}
                  onClick={() => {
                    onChange && onChange(value);
                    setShowMenu(false);
                  }}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
