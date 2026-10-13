import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE_BRAND } from './motion';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('brand', EASE_BRAND.join(','));
gsap.defaults({ ease: 'brand' });

export { gsap, ScrollTrigger };
