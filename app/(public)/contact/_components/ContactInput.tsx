type ContactInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
};

export default function ContactInput({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  autoComplete,
}: ContactInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-rule">
            *
          </span>
        )}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="h-11 w-full border-b-2 border-border bg-transparent px-0 text-sm text-foreground placeholder-subtle-foreground transition-colors duration-200 focus:border-rule focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
