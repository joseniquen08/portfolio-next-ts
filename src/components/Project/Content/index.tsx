import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  data: ProjectType;
}

export const Content = ({ data }: Props) => {
  const { locale } = useRouter();

  return (
    <div className="px-14 lg:px-14 dark:text-custom-dark-text">
      <div className="border-t border-custom-ligth-text/50 dark:border-custom-dark-text/50 py-4 flex flex-col gap-3.5">
        <p>{locale === 'en' ? data.description.en : data.description.es}</p>
        <div className="px-12">
          <Carousel className="w-full">
            <CarouselContent>
              {data.images.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <div className="relative h-52 xs:h-60 sm:h-72 md:h-36 lg:h-124 rounded-xl overflow-hidden bg-black dark:bg-transparent">
                      <Image
                        src={image}
                        alt="image_random"
                        fill={true}
                        priority
                        className="z-0 object-cover object-center w-full img opacity-40 dark:opacity-20"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
