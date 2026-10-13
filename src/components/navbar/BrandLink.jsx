import { Link } from 'react-router-dom';
import BrandMark from '@/components/BrandMark';
import { ROUTES } from '@/data/site';

export default function BrandLink({ onClick }) {
  return (
    <Link to={ROUTES.home} onClick={onClick} className="inline-flex min-h-11 items-center gap-2 rounded-full no-underline">
      <BrandMark />
      <span className="font-display text-lg leading-none font-semibold">
        Wanderlust <span className="font-medium italic">Travels</span>
      </span>
    </Link>
  );
}
