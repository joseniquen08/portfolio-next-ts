import { personalProjects, workProjects } from '@/utils/constants';
import { Content } from './Content';
import { Header } from './Header';

interface Props {
  slug: string;
}

export const ProjectComponent = ({ slug }: Props) => {
  let data = workProjects.find(project => project.slug === slug);

  if(!data) {
    data = personalProjects.find(project => project.slug === slug);
  }

  return (
    <div className="flex flex-col w-full max-w-6xl px-2 py-2 md:py-10 mx-auto space-y-4 lg:px-16">
      {data && (
        <>
          <Header data={data} />
          <Content data={data} />
        </>
      )}
    </div>
  );
};
