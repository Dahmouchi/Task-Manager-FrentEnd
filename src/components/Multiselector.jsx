import React, { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "../components/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "../components/command";
import { Command as CommandPrimitive } from "cmdk";

const MultiSelector = ({ categories, onChange }) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const previousSelected = useRef(selected); // To prevent redundant updates

  // Call onChange only if `selected` changes
  useEffect(() => {
    if (
      onChange &&
      JSON.stringify(previousSelected.current) !== JSON.stringify(selected)
    ) {
      previousSelected.current = selected; // Update the reference
      onChange(selected); // Call the parent's `onChange`
    }
  }, [selected, onChange]);

  const handleUnselect = useCallback((framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = categories.filter(
    (framework) => !selected.some((s) => s.value === framework.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border bg-white border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-3">
          {selected.map((framework) => (
            <Badge
              key={framework?.value}
              className="bg-slate-900 text-white"
            >
              {framework?.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(framework)}
              >
                ×
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select categories..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 && (
            <div className="absolute top-0 z-10 bg-white w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, framework]);
                    }}
                    className="cursor-pointer"
                  >
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
};

export default MultiSelector;
