import React from 'react';

export interface AccordionProps extends React.ComponentPropsWithoutRef<'div'> {
  /** 'single' allows one open panel at a time; 'multiple' allows any number. */
  type?: 'single' | 'multiple';
  /** Value(s) of the panel(s) open on first render. */
  defaultValue?: string | string[];
  /** When type='single', whether clicking the open item closes it. */
  collapsible?: boolean;
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Unique identifier matched against Accordion defaultValue / internal state. */
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<'button'> {}

export interface AccordionContentProps extends React.ComponentPropsWithoutRef<'div'> {}
