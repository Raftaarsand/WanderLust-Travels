export const TRAVELERS_MIN = 1;
export const TRAVELERS_MAX = 12;
export const SPECIAL_REQUESTS_MAX_LENGTH = 500;

const NAME_MIN_LENGTH = 2;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 13;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_CHARACTERS = /^\+?[\d\s-]+$/;

function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) return 'Please enter your full name.';
  if (trimmed.length < NAME_MIN_LENGTH) return 'That name looks a little short.';
  return '';
}

function validateEmail(email) {
  const trimmed = email.trim();
  if (!trimmed) return 'Please enter your email address.';
  if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email, for example asha@example.com.';
  return '';
}

function validatePhone(phone) {
  const trimmed = phone.trim();
  if (!trimmed) return 'Please enter a phone number so we can reach you.';
  const digitCount = trimmed.replace(/\D/g, '').length;
  const hasValidCharacters = PHONE_ALLOWED_CHARACTERS.test(trimmed);
  if (!hasValidCharacters || digitCount < PHONE_MIN_DIGITS || digitCount > PHONE_MAX_DIGITS) {
    return `Enter a valid phone number with ${PHONE_MIN_DIGITS}–${PHONE_MAX_DIGITS} digits.`;
  }
  return '';
}

function validateDeparture(departureDate, todayISO) {
  if (!departureDate) return 'Choose a departure date.';
  if (departureDate < todayISO) return "Departure can't be in the past.";
  return '';
}

function validateReturn(returnDate, departureDate) {
  if (!returnDate) return 'Choose a return date.';
  if (departureDate && returnDate < departureDate) {
    return "Return date can't be before your departure.";
  }
  return '';
}

function validateTravelers(travelers) {
  const count = Number(travelers);
  if (!Number.isInteger(count) || count < TRAVELERS_MIN || count > TRAVELERS_MAX) {
    return `Choose between ${TRAVELERS_MIN} and ${TRAVELERS_MAX} travellers.`;
  }
  return '';
}

function validateRequests(specialRequests) {
  if (specialRequests.length > SPECIAL_REQUESTS_MAX_LENGTH) {
    return `Please keep requests under ${SPECIAL_REQUESTS_MAX_LENGTH} characters.`;
  }
  return '';
}

// Returns an object with an error message for every invalid field.
// Valid fields are left out, so an empty object means the form is valid.
// ISO date strings ("YYYY-MM-DD") compare correctly as plain strings.
export function validateBooking(values, todayISO) {
  const errors = {
    fullName: validateName(values.fullName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    destination: values.destination ? '' : "Choose where you'd like to go.",
    packageId: values.packageId ? '' : 'Pick a travel package.',
    departureDate: validateDeparture(values.departureDate, todayISO),
    returnDate: validateReturn(values.returnDate, values.departureDate),
    travelers: validateTravelers(values.travelers),
    specialRequests: validateRequests(values.specialRequests),
  };

  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}
