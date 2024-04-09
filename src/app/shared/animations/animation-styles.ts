import { trigger, transition, style, animate } from '@angular/animations';

export const easeAnimation = trigger(
  'easeAnimation',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.6s ease-out',
                style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.3s ease-in',
                style({ opacity: 0 }))
      ]
    )
  ]
);

export const slideAnimation = trigger(
  'slideAnimation',
  [
    transition(
      ':enter',
      [
        style({ position: 'relative', left: '100%' }),
        animate('0.3s ease-out',
                style({ left: '0' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ position: 'relative', left: '0' }),
        animate('0.3s ease-in',
                style({ left: '100%' }))
      ]
    )
  ]
);

export const tabSlideAnimation = trigger(
  'tabSlideAnimation',
  [
    transition(
      ':enter',
      [
        style({ position: 'relative', left: '100%' }),
        animate('0.3s ease-out',
                style({ left: '0' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ position: 'relative', left: '0' })
      ]
    )
  ]
);

export const collapseAnimation = trigger(
  'collapseAnimation',
  [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden', overflow: 'hidden', height: '0' }),
        animate('0.3s ease-out',
                style({ visibility: 'visible', height: '*' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ visibility: 'visible', overflow: 'hidden', height: '*' }),
        animate('0.3s ease-in',
                style({ visibility: 'hidden', height: '0' }))
      ]
    )
  ]
);

export const fadeAnimation = trigger(
  'fadeAnimation',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('0.3s ease-out',
                style({ opacity: 0, transform: 'translateY(-10px)' }))
      ]
    )
  ]
);

