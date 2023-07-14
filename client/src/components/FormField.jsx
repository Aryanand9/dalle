import React from "react";

const FormField = ({
  type,
  name,
  value,
  handleChange,
  isSurprise,
  handleSurpriseMe,
  labelName,
  placeholder,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
          {name}
        </label>
        {isSurprise && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="text-sm font-semibold bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-t-gray-300 text-gray-900 rounded-lg text-sm focus:ring[#4649ff] focus-border-[$4649ff] outline-none block w-full p-4"
      />
    </div>

  );
};

export default FormField;
