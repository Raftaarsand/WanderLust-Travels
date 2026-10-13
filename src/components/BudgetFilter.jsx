import { BUDGET_FILTERS } from '../data/packages';

// A group of radio buttons styled as chips. Using real radio inputs
// gives keyboard support (arrow keys) and screen reader labels for free.
export default function BudgetFilter({ selectedId, onChange }) {
  return (
    <fieldset className="budget-filter">
      <legend className="budget-filter__legend">Filter by budget per person</legend>
      <div className="budget-filter__options">
        {BUDGET_FILTERS.map((filter) => (
          <label key={filter.id} className="budget-filter__chip">
            <input
              type="radio"
              name="budget"
              value={filter.id}
              checked={selectedId === filter.id}
              onChange={() => onChange(filter.id)}
            />
            <span>{filter.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
