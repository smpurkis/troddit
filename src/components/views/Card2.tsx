import { useMainContext } from "../../MainContext";
import Link from "next/dist/client/link";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import Media from "../Media";
import { secondsToTime } from "../../../lib/utils";
import TitleFlair from "../TitleFlair";

//og card
const Card1 = ({
  post,
  hasMedia,
  hideNSFW,
  score,
  vote,
  castVote,
  forceMute,
}) => {
  const context: any = useMainContext();
  return (
    <div>
      <div
        className={
          // (!context.mediaOnly || !hasMedia || hideNSFW
          //   ? "px-3 pt-3 pb-2 "
          //   : "  ") +
          // (!context.mediaOnly && " rounded-md ") +
          (context?.columnOverride == 1 && "") +
          " text-sm bg-white border  border-gray-300 shadow-sm dark:bg-trueGray-900 dark:border-trueGray-700 dark:hover:border-trueGray-500 hover:border-gray-500"
        }
      >
        <div className="">
          <div className={""}>
            <div
              className={"relative group" + (hideNSFW && " overflow-hidden")}
            >
              <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
                <div className={hideNSFW && " blur-3xl"}>
                  <Media post={post} />
                </div>
              </a>
              {hideNSFW && (
                <div className="absolute flex flex-row justify-center w-full text-white opacity-50 top-1/2">
                  hidden
                </div>
              )}
            </div>
          </div>

          {/* <p>{post?.url ?? "ERR"}</p> */}
          {true && (
            <div className="p-1 px-2 pt-1.5">
              <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
                <h1 className="text-lg font-medium leading-none cursor-pointer">
                  {post?.title ?? ""}
                  {post?.link_flair_richtext?.length > 0 && (
                    <span className="text-xs">
                      {"  "}
                      <TitleFlair post={post} />
                    </span>
                  )}
                </h1>
              </a>

              <div className="flex flex-row py-1 pb-1 text-xs font-light truncate text-gray">
                <Link href={`/r/${post?.subreddit}`}>
                  <a
                    className="mr-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <h2>r/{post?.subreddit ?? "ERR"}</h2>
                  </a>
                </Link>
                <p>•</p>
                <Link href={`/user/${post?.author}`}>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <h2 className="ml-1 mr-1">u/{post?.author ?? ""}</h2>
                  </a>
                </Link>
                <p>•</p>

                <p className="ml-1">
                  {secondsToTime(post?.created_utc, [
                    "s",
                    "min",
                    "hr",
                    "dy",
                    "mo",
                    "yr",
                  ])}
                </p>
                {post?.over_18 && (
                  <div className="flex flex-row pl-1 space-x-1">
                    <p>•</p>
                    <span className="text-red-400 text-color dark:text-red-700">
                      NSFW
                    </span>
                  </div>
                )}

                <div className="flex flex-row ml-auto">
                  <p className="ml-1">{`(${post.domain})`}</p>
                </div>
              </div>

              <div className="flex flex-row justify-between py-1 pt-1 text-sm align-bottom select-none">
                <div className="flex flex-row items-center space-x-1">
                  <div className="flex-none hover:cursor-pointer ">
                    <BiUpvote
                      className={
                        (vote === 1
                          ? "text-upvote "
                          : " text-black dark:text-white") +
                        " w-5 h-5 hover:scale-110 hover:text-upvote"
                      }
                      onClick={(e) => castVote(e, 1)}
                    />
                  </div>
                  <p
                    className={
                      vote === 1
                        ? "text-upvote "
                        : vote === -1
                        ? "text-downvote "
                        : " "
                    }
                  >
                    {score}
                  </p>

                  <div className="flex-none hover:cursor-pointer ">
                    <BiDownvote
                      className={
                        (vote === -1
                          ? " text-downvote "
                          : " text-black dark:text-white ") +
                        " w-5 h-5 hover:scale-110 hover:text-downvote"
                      }
                      onClick={(e) => castVote(e, -1)}
                    />
                  </div>
                </div>
                <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
                  <h1 className="cursor-pointer ">
                    {`${post.num_comments} ${
                      post.num_comments === 1 ? "comment" : "comments"
                    }`}
                  </h1>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card1;
