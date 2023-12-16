import { DataProjectType } from '@/types';

interface Props {
  data: DataProjectType;
}

export const Content = ({ data }: Props) => {
  return (
    <div className="px-14 lg:px-14 dark:text-white">
      <div className="relative flex justify-center m-12 group">
        <button className="px-4 py-2 text-sm text-white rounded shadow-sm bg-amber-500">
          {data.title}
        </button>
        <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded top-10 group-hover:scale-100">
          ✨ You hover me!
        </span>
      </div>
    </div>
  );
};
