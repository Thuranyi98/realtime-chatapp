import { useState } from "react";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { EyeOffIcon } from "../../assets/icons/EyeOffIcon";
import { Input } from "../ui/input";

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function PasswordField({ value, onChange, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  );
}
