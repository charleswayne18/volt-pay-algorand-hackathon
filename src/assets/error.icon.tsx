import { SVGProps } from 'react';

export const ErrorIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" fill="#FBEAE9" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" stroke="#F2BCBA" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5ZM13.8377 11.3687C14.0413 11.1822 14.0552 10.8659 13.8687 10.6623C13.6822 10.4587 13.3659 10.4448 13.1623 10.6313L11.3163 12.322L10.8377 11.8837C10.6341 11.6972 10.3178 11.7111 10.1313 11.9147C9.94477 12.1184 9.95866 12.4346 10.1623 12.6211L10.9786 13.3687C11.1697 13.5438 11.4628 13.5438 11.654 13.3687L13.8377 11.3687Z"
        fill="#CB1A14"
      />
    </svg>
  );
};
