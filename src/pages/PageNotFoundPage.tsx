import ErrorPageLayout from './ErrorPageLayout';

const PageNotFoundPage = () => (
  <ErrorPageLayout
    label="404"
    title="You have found a secret place."
    description="Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
  />
);

export default PageNotFoundPage;
