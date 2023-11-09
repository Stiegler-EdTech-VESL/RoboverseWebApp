import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FC, Key } from "react";

interface itemProps {
  key: string;
  label: string;
}

type Props = {
  conference?: string;
  onConferenceChange: (newType: string) => void;
};

const ConferenceFilter: FC<Props> = ({ conference, onConferenceChange }) => {
  const handleFilterChange = (value: Key) => {
    onConferenceChange(String(value));
  };

  const items: itemProps[] = [
    {
      key: "All Conferences",
      label: "All Conferences",
    },
    {
      key: "Charlotte-Meck",
      label: "Charlotte-Meck",
    },
    {
      key: "Coastal",
      label: "Coastal",
    },
    {
      key: "Mountains",
      label: "Mountains",
    },
    {
      key: "Foothills",
      label: "Foothills",
    },
    {
      key: "Independent",
      label: "Independent",
    },
    {
      key: "Metrolina",
      label: "Metrolina",
    },
    {
      key: "Triangle",
      label: "Triangle",
    },
    {
      key: "Wake",
      label: "Wake",
    },
  ];

  return (
    <Dropdown className="rounded-sm border bg-black">
      <DropdownTrigger>
        <Button variant="bordered" className="rounded-sm border px-4 py-2">
          {conference}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Dynamic Actions"
        items={items}
        onAction={handleFilterChange}
      >
        {items.map((item) => {
          return <DropdownItem key={item.key}>{item.label}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ConferenceFilter;
