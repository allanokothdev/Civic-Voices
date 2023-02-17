/* eslint-disable @next/next/no-img-element */
import { BiDotsHorizontalRounded } from "react-icons/bi"

function Comment({ comment }) {

  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">

      <img src={comment?.pic} alt="" className="h-11 w-11 rounded-full mr-4"/>

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.name}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              {comment?.timestamp}
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.summary}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <BiDotsHorizontalRounded className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Comment;
