import { useState } from 'react';
import BudgetFilter from './BudgetFilter';
import PackageCard from './PackageCard';
import SectionHeading from './SectionHeading';
import { BUDGET_FILTERS, DEFAULT_BUDGET_FILTER_ID, packages } from '../data/packages';
import { SECTION_IDS } from '../data/site';
import { pluralize } from '../lib/format';
import './Packages.css';

const SECONDS_PER_CARD = 8;

function PackageSet({ packages: visiblePackages, duplicateSet, onChoosePackage }) {
  return (
    <ul className="packages__set" aria-hidden={duplicateSet || undefined}>
      {visiblePackages.map((travelPackage) => (
        <li
          key={travelPackage.id}
          className="packages__item"
          data-clone={duplicateSet ? '' : undefined}
          aria-hidden={duplicateSet || undefined}
          onMouseDown={duplicateSet ? (event) => event.preventDefault() : undefined}
        >
          <PackageCard
            travelPackage={travelPackage}
            onChoose={onChoosePackage}
            headingId={duplicateSet ? null : undefined}
            tabIndex={duplicateSet ? -1 : undefined}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Packages({ onChoosePackage }) {
  const [filterId, setFilterId] = useState(DEFAULT_BUDGET_FILTER_ID);

  const activeFilter = BUDGET_FILTERS.find((filter) => filter.id === filterId);
  const visiblePackages = packages.filter(
    (travelPackage) => travelPackage.price >= activeFilter.min && travelPackage.price <= activeFilter.max,
  );
  const loopDuration = `${visiblePackages.length * SECONDS_PER_CARD}s`;

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
      </div>

      {visiblePackages.length > 0 ? (
        <div className="packages__marquee" style={{ '--package-count': visiblePackages.length }}>
          <div className="packages__track" key={filterId} style={{ '--loop-duration': loopDuration }}>
            <PackageSet packages={visiblePackages} onChoosePackage={onChoosePackage} />
            <PackageSet packages={visiblePackages} duplicateSet onChoosePackage={onChoosePackage} />
          </div>
        </div>
      ) : (
        <div className="container">
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
        </div>
      )}

      <div className="container">
        <p className="packages__disclaimer">
          *Sample prices for illustration only. Per person, twin sharing, excluding flights and taxes.
        </p>
      </div>
    </section>
  );
}
