type SelectOption = {
  textKey: string;
  value: string;
};

type ContactSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
};

export default function ContactSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}: ContactSelectProps) {
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="h-11 w-full border-b-2 border-border bg-surface px-0 text-sm text-foreground transition-colors duration-200 focus:border-rule focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.textKey}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
