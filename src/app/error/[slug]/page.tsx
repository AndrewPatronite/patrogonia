import ErrorClient from './ErrorClient';

export const generateStaticParams = () => [{ slug: '404' }, { slug: 'uh-oh' }];

const Page = () => <ErrorClient />;

export default Page;
