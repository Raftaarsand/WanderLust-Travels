import { Compass } from 'lucide-react';
import './BrandMark.css';

export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Compass size={20} />
    </span>
  );
}
