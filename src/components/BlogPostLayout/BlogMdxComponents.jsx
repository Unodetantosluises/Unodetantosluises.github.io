import React from 'react';

export const Note = ({ title = 'Nota', children }) => (
  <aside className="mdx-note mdx-callout" role="note">
    <div className="mdx-callout__header">
      <span className="mdx-callout__label">{title}</span>
    </div>
    <div className="mdx-callout__body">{children}</div>
  </aside>
);

export const Warning = ({ title = 'Importante', children }) => (
  <aside className="mdx-warning mdx-callout" role="alert">
    <div className="mdx-callout__header">
      <span className="mdx-callout__label">{title}</span>
    </div>
    <div className="mdx-callout__body">{children}</div>
  </aside>
);

export const Step = ({ number, title, children }) => (
  <div className="mdx-step">
    <div className="mdx-step__badge" aria-label={`Paso ${number}`}>
      {number}
    </div>
    <div className="mdx-step__content">
      {title && <h3 className="mdx-step__title">{title}</h3>}
      <div className="mdx-step__body">{children}</div>
    </div>
  </div>
);

export const Terminal = ({ label = 'Terminal', code = '' }) => (
  <div className="mdx-terminal">
    <div className="mdx-terminal__header">
      <span className="mdx-terminal__dots" aria-hidden="true">
        <span className="mdx-terminal__dot mdx-terminal__dot--red" />
        <span className="mdx-terminal__dot mdx-terminal__dot--yellow" />
        <span className="mdx-terminal__dot mdx-terminal__dot--green" />
      </span>
      <span className="mdx-terminal__label">{label}</span>
    </div>
    <pre className="mdx-terminal__body">
      <code>{code}</code>
    </pre>
  </div>
);

export default {
  Note,
  Warning,
  Step,
  Terminal,
};
