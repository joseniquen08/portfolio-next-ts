"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tables } from "@/types/database.types";
import { Rating } from "flowbite-react";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi";

interface Props {
  comments: Tables<"class_comments">[];
}

export function Comments({ comments }: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-4xl font-bold">Comentarios</p>
      {comments.length > 0 ? (
        <div className="flex justify-center gap-10 flex-wrap">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-3 px-4 py-4 rounded-xl bg-custom-light-secondary/5 dark:bg-custom-dark-bg"
            >
              <HiOutlineUserCircle size={60} className="-mt-1" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm">{comment.user_name}</p>
                <p className="font-medium max-w-[220px] w-full">
                  {comment.comment}
                </p>
                <Rating>
                  {Array.from({ length: 5 }, (v, i) => i + 1).map((pos) =>
                    pos <= comment.rating ? (
                      <Rating.Star key={pos} />
                    ) : (
                      <Rating.Star key={pos} filled={false} />
                    )
                  )}
                </Rating>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div>
            <p className="text-custom-light-text dark:text-custom-dark-text text-opacity-70 dark:text-opacity-50 w-full text-center">
              Actualmente no hay comentarios
            </p>
          </div>
          <div className="flex justify-center gap-10 flex-wrap">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
