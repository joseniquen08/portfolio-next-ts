import { DataProjectType } from '@/types';
import { Content } from './Content';
import { Header } from './Header';

interface Props {
  data: DataProjectType;
}

export const ProjectComponent = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-6xl px-2 py-10 mx-auto space-y-6 lg:px-16">
      <Header data={data} />
      <Content data={data} />
    </div>
  );
};
