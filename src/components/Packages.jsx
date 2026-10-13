import { useState } from 'react';
import BudgetFilter from './BudgetFilter';
import PackageCard from './PackageCard';
import SectionHeading from './SectionHeading';
import { BUDGET_FILTERS, DEFAULT_BUDGET_FILTER_ID, packages } from '../data/packages';
import { SECTION_IDS } from '../data/site';
import { pluralize } from '../lib/format';
import './Packages.css';

export default function Packages({ onChoosePackage }) {
  const [filterId, setFilterId] = useState(DEFAULT_BUDGET_FILTER_ID);

  const activeFilter = BUDGET_FILTERS.find((filter) => filter.id === filterId);
  const visiblePackages = packages.filter(
    (travelPackage) => travelPackage.price >= activeFilter.min && travelPackage.price <= activeFilter.max,
  );

  return (
    <section id={SECTION_IDS.packages} className="section section--alt" aria-labelledby="packages-title">
      <div className="container">
        <SectionHeading
          id="packages-title"
          eyebrow="Travel packages"
          title="A journey for every budget"
          description="Pick the style of travel that suits you. Every package can be tailored to any of our destinations."
        />

        <div className="packages__toolbar">
          <BudgetFilter selectedId={filterId} onChange={setFilterId} />
          <p className="packages__count" aria-live="polite">
            Showing {pluralize(visiblePackages.length, 'package')}
          </p>
        </div>

        {visiblePackages.length > 0 ? (
          <ul className="packages__grid">
            {visiblePackages.map((travelPackage) => (
              <li key={travelPackage.id}>
                <PackageCard travelPackage={travelPackage} onChoose={onChoosePackage} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="packages__empty">
            <p>No packages match this budget yet.</p>
            <button
              type="button"
              className="btn btn--dark"
              onClick={() => setFilterId(DEFAULT_BUDGET_FILTER_ID)}
            >
              Show all packages
            </button>
          </div>
        )}

        <p className="packages__disclaimer">
          *Sample prices for illustration only. Per person, twin sharing, excluding flights and taxes.
        </p>
      </div>
    </section>
  );
}
