type Props = {
  setFieldValue: (field: string, value: any) => void;
  label: string;
  type: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  values: any;
};

const InputText = ({
  setFieldValue,
  label,
  type,
  name,
  required = false,
  disabled = false,
  values,
}: Props) => {
  const formType = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            value={values?.[name]}
            className="form-control"
            onChange={(e) => setFieldValue(name, e.target.value)}
            placeholder={label}
            required={required && !disabled}
            disabled={disabled}
            style={{ height: 100 }}
          />
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={values?.[name]}
            className="form-control"
            onChange={(e) => setFieldValue(name, e.target.value)}
            placeholder={label}
            required={required && !disabled}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        <span>{label}</span>
        {required && !disabled && <span className="text-danger"> * </span>}
      </label>
      {formType()}
    </div>
  );
};

export default InputText;
