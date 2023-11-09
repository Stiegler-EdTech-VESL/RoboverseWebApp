import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface itemProps {
  key: string;
  label: string;
}

const ConferenceFilter = () => {
  const items: itemProps[] = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <Dropdown className="bg-black border rounded-sm">
      <DropdownTrigger>
        <Button variant="bordered" className="border rounded-sm py-2 px-4">Filter</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dynamic Actions" items={items}>
        {items.map((item) => {
          return (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={item.key === "delete" ? "text-danger" : ""}
            >
              {item.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ConferenceFilter;
