const FIELD_ID_PREFIX = 'booking';

// One naming convention for every form field, so labels, hints and
// error messages are always linked to the right input.
export function getFieldIds(name) {
  const inputId = `${FIELD_ID_PREFIX}-${name}`;
  return {
    inputId,
    hintId: `${inputId}-hint`,
    errorId: `${inputId}-error`,
  };
}
