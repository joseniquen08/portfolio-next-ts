"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectType } from "@/types";
import Image from "next/image";

interface Props {
  data: ProjectType;
}

export const Content = ({ data }: Props) => {
  return (
    <div className="px-4 md:px-14 dark:text-custom-dark-text">
      <div className="border-t border-custom-light-text/50 dark:border-custom-dark-text/50 py-4 flex flex-col gap-3.5">
        <p>{data.description.es}</p>
        <div className="">
          <Carousel className="w-full">
            <CarouselContent>
              {data.images.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <div className="relative h-56 xs:h-64 sm:h-104 md:h-96 lg:h-124 rounded-xl overflow-hidden bg-black dark:bg-transparent">
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
