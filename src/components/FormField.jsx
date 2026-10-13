import { CircleAlert } from 'lucide-react';
import { getFieldIds } from '../lib/formFields';

export default function FormField({ name, label, hint, error, required = false, fullWidth = false, children }) {
  const { inputId, hintId, errorId } = getFieldIds(name);

  return (
    <div className={`form-field ${fullWidth ? 'form-field--full' : ''} ${error ? 'form-field--invalid' : ''}`}>
      <label htmlFor={inputId} className="form-field__label">
        {label}
        {required ? (
          <span className="form-field__required" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="form-field__optional">(optional)</span>
        )}
      </label>

      {children}

      {hint && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-field__error">
          <CircleAlert size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
