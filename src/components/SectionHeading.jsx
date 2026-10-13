import './SectionHeading.css';

// Pass `titleRef` when the heading needs to receive focus programmatically.
export default function SectionHeading({ id, titleRef, eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 id={id} ref={titleRef} tabIndex={titleRef ? -1 : undefined} className="section-heading__title">
        {title}
      </h2>
      {description && <p className="section-heading__description">{description}</p>}
    </header>
  );
}
