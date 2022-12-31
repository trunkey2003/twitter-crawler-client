import React from 'react';
import AnalyzeDataKVBox from '../KeyValueBox/AnalyzeDataKVBox';
import AnalyzeDataKeyBox from '../KeyValueBox/AnalyzeDataKeyBox';
import { getFormattedDatetimeString } from '../../function/';

export default function TwitterReplyBox({ reply, index }) {
  return (
    <div className='bg-gray-900 text-white p-5 mb-5 rounded'>
      {/* {JSON.stringify(reply)} */}
      <div className="mt-2 mb-5 flex">
        <h2 className="w-[200px]">User avatar</h2>
        <a
          className="w-fit p-1 border border-gray-300 hover:border-gray-600 rounded"
          href={reply.tweetDetails?.autherAvatar}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={reply.tweetDetails?.autherAvatar}
            alt="user-avatar rounded"
            width={60}
            height={60}
          ></img>
        </a>
      </div>

      <AnalyzeDataKVBox name={"Tweet ID"}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm"
          href={reply.tweetUrl}
        >
          {reply.tweetID}
        </a>
      </AnalyzeDataKVBox>

      <AnalyzeDataKVBox name={"Auther Name"}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          href={reply.tweetDetails?.autherProfileUrl}
        >
          {reply.tweetDetails?.autherName}
        </a>
      </AnalyzeDataKVBox>

      <AnalyzeDataKVBox name={"Username"}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          href={reply.tweetDetails?.autherProfileUrl}
        >
          {reply.tweetDetails?.autherUserName}
        </a>
      </AnalyzeDataKVBox>

      <AnalyzeDataKVBox name={"Time Posted"}>
        <span className='text-sm'>
          {getFormattedDatetimeString(reply.tweetDetails?.timePosted)}
        </span>
      </AnalyzeDataKVBox>

      <div className='reply-tweet-content' id={`reply-tweet-content-${index}`}>
        <AnalyzeDataKeyBox title={"Tweet Content"} />
        <p className="whitespace-pre-wrap	bg-gray-300 text-gray-600 rounded p-2">
          <span className='text-sm text-black bg-white p-2'>
            <i class="fa-solid fa-reply mr-2"></i>
            {reply.tweetDetails?.replyTo}
          </span>
          <br />
          {reply.tweetDetails?.tweetText}
          <div className="flex flex-wrap">
            {Array.isArray(
              reply.tweetDetails?.tweetMedias
            ) &&
              reply.tweetDetails?.tweetMedias.map(
                (media, index) => {
                  if (media.image) {
                    return (
                      <a
                        href={media.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-[300px] h-[300px] rounded border-2 border-black hover:border-gray-200 bg-center bg-cover bg-no-repeat m-1" style={{ backgroundImage: `url(${media.image})` }}></div>
                      </a>
                    );
                  } else if (media.video) {
                    return (
                      <a href={media.video}>
                        <video autoPlay muted loop src={media.video}></video>
                      </a>
                    );
                  } else if (media.videoPoster) {
                    return (
                      <a
                        href={reply.tweetUrl}
                        className="flex items-center justify-center w-[300px] h-[300px] rounded border-2 border-black hover:border-gray-200 bg-center bg-cover bg-no-repeat m-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundImage: `url(${media.videoPoster})` }}
                      >
                        <i class="fa-solid fa-play text-primary opacity-80 text-[40px]"></i>
                      </a>
                    )
                  } else return null;
                }
              )}
          </div>
        </p>
      </div>

      <div id="tweet-interaction">
        <AnalyzeDataKeyBox title={"Tweet Interaction"} />
        <div id="tweet-interaction-box">
          <div className="p-5 bg-gray-300 text-gray-600 rounded">
            <AnalyzeDataKVBox name={"Views"}>
              <span>
                <i class="fa-solid fa-eye"></i> {reply.tweetDetails?.tweetInteraction?.views}
              </span>
            </AnalyzeDataKVBox>

            <AnalyzeDataKVBox name={"Replies"}>
              <span>
                <i class="fa-solid fa-reply"></i> {reply.tweetDetails?.tweetInteraction?.replies}
              </span>
            </AnalyzeDataKVBox>

            <AnalyzeDataKVBox name={"Retweets"}>
              <span>
                <i class="fa-solid fa-retweet"></i> {reply.tweetDetails?.tweetInteraction?.retweets}
              </span>
            </AnalyzeDataKVBox>

            <AnalyzeDataKVBox name={"Likes"}>
              <span>
                <i class="fa-solid fa-thumbs-up"></i> {reply.tweetDetails?.tweetInteraction?.likes}
              </span>
            </AnalyzeDataKVBox>
          </div>
        </div>
      </div>
    </div>
  )
}
