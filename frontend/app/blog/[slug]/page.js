export function generateStaticParams() {
    return [];
}

export const dynamicParams = false;

import { notFound } from 'next/navigation';
export default function Page() { notFound(); }
