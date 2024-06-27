import React, { FC, ChangeEvent, useState } from 'react';
import { Input } from "@/components/ui/input";

interface InputFormProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: FC<InputFormProps> = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="grid max-w-sm items-center gap-1.5">
      <Input 
        type={type} 
        name={name} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;
