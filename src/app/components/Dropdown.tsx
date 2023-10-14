import React, { useEffect, useRef, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { SchemeType } from "./ColorSchemeContainer";
import styled from "styled-components";

export interface DropdownProps {
  readonly value: SchemeType;
  readonly dropdownValues: ReadonlyArray<SchemeType>;
  readonly onChange?: (value: any) => void;
}

const OuterContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DropdownHeader = styled.div`
  box-shadow: 5px 5px 5px 0 rgba(31, 38, 135, 0.209);
  padding: 0.7em;
  color: white;
  font-weight: bold;
  letter-spacing: 0.1rem;
  user-select: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  width: fit-content;
`;

const StyledUl = styled.ul`
  border-radius: 20px;
  width: 160px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
  z-index: 10;
`;

const StyledLi = styled.li`
  list-style-type: none;
  padding: 0.6em;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    border-radius: 30px;
    background: rgb(241, 232, 250);
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  value,
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

  const filteredValues = dropdownValues.filter(v => v !== value)

  return (
    <OuterContainer>
      <span className="font-bold">Scheme Type:</span>
      <div className="w-24">
        <DropdownHeader onClick={() => setShowMenu(true)}>
          {value}
          <CaretDownOutlined />
        </DropdownHeader>
        {showMenu && (
          <StyledUl ref={ref}>
            {filteredValues.map((value) => {
              return (
                <StyledLi
                  value={value}
                  key={value}
                  onClick={() => {
                    onChange && onChange(value);
                    setShowMenu(false);
                  }}
                >
                  {value}
                </StyledLi>
              );
            })}
          </StyledUl>
        )}
      </div>
    </OuterContainer>
  );
};
