import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import BookingConfirmation from './BookingConfirmation';
import FormField from './FormField';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { getTodayISO } from '../lib/dates';
import { formatRupees, pluralize } from '../lib/format';
import { getFieldIds } from '../lib/formFields';
import {
  SPECIAL_REQUESTS_MAX_LENGTH,
  TRAVELERS_MAX,
  TRAVELERS_MIN,
  validateBooking,
} from '../lib/validation';

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  packageId: '',
  departureDate: '',
  returnDate: '',
  travelers: '2',
  specialRequests: '',
};

const FIELD_HINTS = {
  phone: 'Include your country code if you live outside India.',
  departureDate: 'Departures can be booked from today onwards.',
  travelers: `Up to ${TRAVELERS_MAX} people per request.`,
};

// Simulates a short network request so the loading state is visible.
const SUBMIT_DELAY_MS = 900;
const REFERENCE_LENGTH = 6;

function createDemoReference() {
  const randomPart = Math.random().toString(36).slice(2, 2 + REFERENCE_LENGTH).toUpperCase();
  return `WL-DEMO-${randomPart}`;
}

export default function BookingForm({ preset }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [status, setStatus] = useState('idle');
  const [confirmation, setConfirmation] = useState(null);
  const formRef = useRef(null);
  const submitTimerRef = useRef(null);

  const todayISO = getTodayISO();
  const errors = validateBooking(values, todayISO);
  const errorCount = Object.keys(errors).length;
  const isSubmitting = status === 'submitting';

  useEffect(() => () => clearTimeout(submitTimerRef.current), []);

  // When a visitor clicks "Choose Package" or "Plan a trip", prefill the form.
  useEffect(() => {
    if (!preset) return;
    clearTimeout(submitTimerRef.current);
    setValues((current) => ({
      ...current,
      ...(preset.destinationId && { destination: preset.destinationId }),
      ...(preset.packageId && { packageId: preset.packageId }),
    }));
    setConfirmation(null);
    setStatus('idle');
  }, [preset]);

  function getVisibleError(name) {
    return touched[name] || hasTriedSubmit ? errors[name] : undefined;
  }

  function getInputProps(name, { hasHint = Boolean(FIELD_HINTS[name]) } = {}) {
    const { inputId, hintId, errorId } = getFieldIds(name);
    const error = getVisibleError(name);
    const describedBy = [hasHint && hintId, error && errorId].filter(Boolean).join(' ');

    return {
      id: inputId,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': Boolean(error),
      'aria-describedby': describedBy || undefined,
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasTriedSubmit(true);

    const firstInvalidField = Object.keys(errors)[0];
    if (firstInvalidField) {
      formRef.current.elements[firstInvalidField].focus();
      return;
    }

    setStatus('submitting');
    submitTimerRef.current = setTimeout(() => {
      setConfirmation({ ...values, reference: createDemoReference() });
      setStatus('success');
    }, SUBMIT_DELAY_MS);
  }

  function handleReset() {
    setValues(INITIAL_VALUES);
    setTouched({});
    setHasTriedSubmit(false);
    setConfirmation(null);
    setStatus('idle');
  }

  if (status === 'success' && confirmation) {
    return <BookingConfirmation booking={confirmation} onReset={handleReset} />;
  }

  return (
    <form ref={formRef} className="booking-form" onSubmit={handleSubmit} noValidate aria-labelledby="booking-form-title">
      <div className="booking-form__header">
        <h3 id="booking-form-title" className="booking-form__title">
          Trip request
        </h3>
        <p className="booking-form__required-note">
          Fields marked <span aria-hidden="true">*</span>
          <span className="visually-hidden">with an asterisk</span> are required.
        </p>
      </div>

      {hasTriedSubmit && errorCount > 0 && (
        <p className="booking-form__summary" role="alert">
          <Info size={18} aria-hidden="true" />
          Please check {pluralize(errorCount, 'field')} highlighted below.
        </p>
      )}

      <fieldset className="booking-form__fields" disabled={isSubmitting}>
        <legend className="visually-hidden">Your trip details</legend>

        <FormField name="fullName" label="Full name" error={getVisibleError('fullName')} required fullWidth>
          <input {...getInputProps('fullName')} type="text" autoComplete="name" className="form-control" required />
        </FormField>

        <FormField name="email" label="Email address" error={getVisibleError('email')} required>
          <input
            {...getInputProps('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            className="form-control"
            required
          />
        </FormField>

        <FormField name="phone" label="Phone number" hint={FIELD_HINTS.phone} error={getVisibleError('phone')} required>
          <input
            {...getInputProps('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="form-control"
            required
          />
        </FormField>

        <FormField name="destination" label="Destination" error={getVisibleError('destination')} required>
          <div className="select-wrap">
            <select {...getInputProps('destination')} className="form-control" required>
              <option value="">Select a destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}, {destination.country}
                </option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" />
          </div>
        </FormField>

        <FormField name="packageId" label="Travel package" error={getVisibleError('packageId')} required>
          <div className="select-wrap">
            <select {...getInputProps('packageId')} className="form-control" required>
              <option value="">Select a package</option>
              {packages.map((travelPackage) => (
                <option key={travelPackage.id} value={travelPackage.id}>
                  {travelPackage.name} (from {formatRupees(travelPackage.price)})
                </option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" />
          </div>
        </FormField>

        <FormField
          name="departureDate"
          label="Departure date"
          hint={FIELD_HINTS.departureDate}
          error={getVisibleError('departureDate')}
          required
        >
          <input {...getInputProps('departureDate')} type="date" min={todayISO} className="form-control" required />
        </FormField>

        <FormField name="returnDate" label="Return date" error={getVisibleError('returnDate')} required>
          <input
            {...getInputProps('returnDate')}
            type="date"
            min={values.departureDate || todayISO}
            className="form-control"
            required
          />
        </FormField>

        <FormField
          name="travelers"
          label="Number of travellers"
          hint={FIELD_HINTS.travelers}
          error={getVisibleError('travelers')}
          required
        >
          <input
            {...getInputProps('travelers')}
            type="number"
            min={TRAVELERS_MIN}
            max={TRAVELERS_MAX}
            step="1"
            inputMode="numeric"
            className="form-control"
            required
          />
        </FormField>

        <FormField
          name="specialRequests"
          label="Special requests"
          hint={`${values.specialRequests.length} / ${SPECIAL_REQUESTS_MAX_LENGTH} characters`}
          error={getVisibleError('specialRequests')}
          fullWidth
        >
          <textarea
            {...getInputProps('specialRequests', { hasHint: true })}
            rows={4}
            maxLength={SPECIAL_REQUESTS_MAX_LENGTH}
            className="form-control form-control--textarea"
            placeholder="Dietary needs, celebrations, accessibility, room preferences…"
          />
        </FormField>
      </fieldset>

      <div className="booking-form__footer">
        <button type="submit" className="btn btn--primary btn--block booking-form__submit" disabled={isSubmitting}>
          {isSubmitting && <span className="spinner" aria-hidden="true" />}
          {isSubmitting ? 'Preparing your trip summary…' : 'Request My Trip'}
        </button>
        <p className="booking-form__demo-note">
          Demo only: submitting shows a trip summary. No booking is made and no payment is taken.
        </p>
      </div>
    </form>
  );
}
