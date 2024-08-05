import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function LanguageToggleButton() {
  return (
    <DropdownButton
      id="dropdown-item-button"
      style={{ visibility: "hidden" }}
      title={
        <>
          <Image
            src="/images/iconmonstr-globe-thin-240.png"
            alt="Globe"
            width={16}
            height={16}
            style={{ margin: "0 3px" }}
          />
          EN
        </>
      }
      size="sm"
    >
      <Dropdown.Item as="button">
        <span className="fi fi-um"></span> English
      </Dropdown.Item>
      <Dropdown.Item as="button">
        <span className="fi fi-se"></span> Swedish
      </Dropdown.Item>
      <Dropdown.Item as="button">
        <span className="fi fi-de"></span> Deutsch
      </Dropdown.Item>
      <Dropdown.Item as="button">
        <span className="fi fi-nl"></span> Français
      </Dropdown.Item>
      <Dropdown.Item as="button">
        <span className="fi fi-mx"></span> Español
      </Dropdown.Item>
    </DropdownButton>
  );
}
