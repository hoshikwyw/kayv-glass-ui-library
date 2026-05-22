'use client';

import { Fragment, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  currentBase,
  ellipsisBase,
  iconBase,
  linkBase,
  listBase,
  separatorBase,
} from './Breadcrumb.styles';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={iconBase}
  >
    <path d="M6 4l4 4-4 4" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function ItemContent({ item }: { item: BreadcrumbItem }) {
  return (
    <>
      {item.icon && <span className="flex items-center h-3.5 w-3.5 shrink-0">{item.icon}</span>}
      {item.label}
    </>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, maxItems, className, ...props }, ref) => {
    // Build visible items, inserting an ellipsis sentinel when truncating
    type DisplayItem = BreadcrumbItem | { ellipsis: true };

    let display: DisplayItem[] = items;
    if (maxItems !== undefined && items.length > maxItems) {
      const tail = items.slice(items.length - (maxItems - 1));
      display = [items[0], { ellipsis: true }, ...tail];
    }

    const sep = separator ?? <ChevronRight />;

    return (
      <nav ref={ref} aria-label="breadcrumb" className={cn(className)} {...props}>
        <ol className={listBase}>
          {display.map((item, index) => {
            const isLast = index === display.length - 1;

            if ('ellipsis' in item) {
              return (
                <Fragment key="ellipsis">
                  <li aria-hidden="true" className={separatorBase}>{sep}</li>
                  <li aria-label="More pages" className={ellipsisBase}>…</li>
                </Fragment>
              );
            }

            return (
              <Fragment key={`${item.label}-${index}`}>
                <li>
                  {isLast ? (
                    <span aria-current="page" className={currentBase}>
                      <ItemContent item={item} />
                    </span>
                  ) : item.href ? (
                    <a href={item.href} className={linkBase}>
                      <ItemContent item={item} />
                    </a>
                  ) : (
                    <span className={cn(linkBase, 'pointer-events-none')}>
                      <ItemContent item={item} />
                    </span>
                  )}
                </li>
                {!isLast && (
                  <li aria-hidden="true" className={separatorBase}>{sep}</li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
