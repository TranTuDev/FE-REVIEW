type InputProps = {
  label: string;
  placeholder?: string;
  error?: string;
};

export default function Input({
  label,
  placeholder,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="border px-3 py-2 rounded"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
