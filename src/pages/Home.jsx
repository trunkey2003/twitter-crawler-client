import { useState, useRef } from "react";
import TwitterLinkInput from "../components/Input/TwitterLinkInput";
import AnalyzeDataKeyBox from "../components/KeyValueBox/AnalyzeDataKeyBox";
import AnalyzeDataKVBox from "../components/KeyValueBox/AnalyzeDataKVBox";
import TwitterReplyBox from "../components/Reply/TwitterReplyBox";
import {
  getFormattedDatetimeString,
  isValidatedTwitterPostLink,
} from "../function";
import Axios from "../function/Axios";
import HomeLayout from "../layouts/HomeLayout";

export default function Home() {
  const tweetAnalysisResultRef = useRef(null);

  const [twitterLinkInput, setTwitterLinkInput] = useState("");
  const [errorValidation, setErrorValidation] = useState({});
  const [twitterStatistics, setTwitterStatistics] = useState({});
  const [loadingGetResult, setLoadingGetResult] = useState(false);
  const [loadingSyncData, setLoadingSyncData] = useState(false);
  const [showReplies, setShowReplies] = useState(null);
  const [trendingHashtags, setTrendingHashtags] = useState([]);

  const handleValidateTwitterLink = () => {
    const error = {};
    let isValid = true;
    if (twitterLinkInput === "") {
      error.twitterLinkInput = "Please enter your twitter post link";
      isValid = false;
    } else if (!isValidatedTwitterPostLink(twitterLinkInput)) {
      error.twitterLinkInput = "Please enter a valid twitter post link";
      isValid = false;
    }
    setErrorValidation(error);
    return isValid;
  };

  const handleTwitterLinkInputSubmit = () => {
    if (!handleValidateTwitterLink()) return;
    setLoadingGetResult(true);
    handleGetFullTwitterAnalysis(twitterLinkInput).finally(() => {
      setLoadingGetResult(false);
      tweetAnalysisResultRef.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleGetFullTwitterAnalysis = (twitterPostUrl) => {
    return Promise.all([
      handleGetTwitterAnalysis(twitterPostUrl),
      handleGetTrendingHashtags(),
    ]);
  };

  const handleGetTwitterAnalysis = (twitterPostUrl) => {
    const queriesParams = new URLSearchParams({
      twitterPostUrl: twitterPostUrl,
    }).toString();
    return Axios.get("/api/v1/twitter/getTwitterAnalysis?" + queriesParams)
      .then((res) => {
        console.log(res);
        setTwitterStatistics(res.data.data);
      })
      .catch(() => {
        setErrorValidation({
          ...errorValidation,
          twitterLinkInput: "Look like your link is invalid, please try again!",
        });
      });
  };

  const handleGetTrendingHashtags = () => {
    return Axios.get("/api/v1/twitter/getTrendingHashtags")
      .then((res) => {
        setTrendingHashtags(res.data.data.trendingHashtags);
      })
      .catch((err) => { });
  };

  const handleSyncDataTwitterPost = () => {
    setLoadingSyncData(true);
    handleGetFullTwitterAnalysis(twitterStatistics.tweetUrl).finally(() =>
      setLoadingSyncData(false)
    );
  };

  return (
    <HomeLayout>
      <div
        className="w-full h-[100vh] md:h-[100vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('/videos/home-bg-2.gif')" }}
      >
        <div className="h-full w-full absolute z-10 bg-black bg-opacity-60 flex flex-wrap justify-center py-[10vh] text-white">
          <div className="text-center">
            <h1 className="py-4 text-[50px] font-bold">
              Analyze your <span className="text-primary">Twitter</span> post
              for better interaction
            </h1>
            <TwitterLinkInput
              value={twitterLinkInput}
              onChange={(e) => setTwitterLinkInput(e.target.value)}
              onSubmit={handleTwitterLinkInputSubmit}
              errorValidation={errorValidation}
            />
            <div className="relative py-[100px]">
              {/* <div className="absolute-center">
                <svg className="circle-svg" viewBox="0 0 500 500">
                  <defs>
                    <path
                      d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                      id="textcircle_top"
                    >
                      <animateTransform
                        attributeName="transform"
                        begin="0s"
                        dur="20s"
                        type="rotate"
                        from="0 250 250"
                        to="360 250 250"
                        repeatCount="indefinite"
                      />
                    </path>
                  </defs>
                  <text
                    className="circle-text fill-gray-300"
                    dy="40"
                    textLength="646"
                    textRendering={"geometricPrecision"}
                  >
                    <textPath xlinkHref="#textcircle_top">
                      Get The Result For Free
                    </textPath>
                  </text>
                </svg>
              </div> */}
              <button
                className="absolute-center hover:opacity-80"
                onClick={handleTwitterLinkInputSubmit}
              >
                <div className="showreels-div">
                  <img
                    className={`absolute rounded-full ${loadingGetResult
                      ? "animate-[spin_1s_ease-in-out_infinite]"
                      : ""
                      }`}
                    alt="twitter"
                    src="/images/twitter.jpg"
                  ></img>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="tweet-analysis-result" ref={tweetAnalysisResultRef}>
        {twitterStatistics.tweetUrl && (
          <div className="p-5 bg-gray-200 flex flex-wrap">
            <div id="header-tweet-analysis-result" className="w-full">
              SEO Analyze <i className="fa-solid fa-chevron-right mx-2"></i>
              Twitter Post Analyze{" "}
              <i className="fa-solid fa-chevron-right mx-2"></i>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={twitterStatistics.tweetUrl}
                className="text-primary hover:underline"
              >
                {twitterStatistics.tweetID}
              </a>
              <h2 className="text-[1.5rem] lg:text-[2rem] font-medium py-2">
                Analyze result from your{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={twitterStatistics.tweetUrl}
                  className="text-primary hover:underline"
                >
                  Twitter
                </a>{" "}
                Post
              </h2>
            </div>
            {/* {JSON.stringify(twitterStatistics)} */}
            <div id="detail-analysis" className="w-full lg:w-2/3">
              <div className="bg-white py-4 px-5 md:px-10 leading-[3rem]">
                <h3 className="text-[1.2rem] font-semibold">
                  <div className="leading-[1.5rem]">
                    Post Detail
                    <br />
                    <span className="text-sm font-normal text-gray-500">
                      <i className="fa-regular fa-clock"></i> Get Data at :{" "}
                      {getFormattedDatetimeString(twitterStatistics.fetchTime)}
                    </span>
                    <button
                      className={`ml-2 fa-solid fa-rotate ${loadingSyncData
                        ? "animate-[spin_1s_ease-in-out_infinite]"
                        : ""
                        }`}
                      onClick={handleSyncDataTwitterPost}
                      title="sync data"
                    ></button>
                  </div>
                </h3>

                <div className="mt-2 mb-5 flex">
                  <h2 className="w-[200px]">User avatar</h2>
                  <a
                    className="w-fit p-1 border border-gray-300 hover:border-gray-600 rounded"
                    href={twitterStatistics.tweetDetails?.autherAvatar}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitterStatistics.tweetDetails?.autherAvatar}
                      alt="user-avatar rounded"
                      width={60}
                      height={60}
                    ></img>
                  </a>
                </div>

                <div className="flex flex-wrap justify-between">
                  <AnalyzeDataKVBox name={"Tweet ID"}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm"
                      href={twitterStatistics.tweetUrl}
                    >
                      {twitterStatistics.tweetID}
                    </a>
                  </AnalyzeDataKVBox>

                  <AnalyzeDataKVBox name={"Auther Name"}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      href={twitterStatistics.tweetDetails?.autherProfileUrl}
                    >
                      {twitterStatistics.tweetDetails?.autherName}
                    </a>
                  </AnalyzeDataKVBox>

                  <AnalyzeDataKVBox name={"Username"}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      href={twitterStatistics.tweetDetails?.autherProfileUrl}
                    >
                      {twitterStatistics.tweetDetails?.autherUserName}
                    </a>
                  </AnalyzeDataKVBox>
                </div>

                <AnalyzeDataKVBox name={"Time"}>
                  <span className="text-sm">
                    {getFormattedDatetimeString(
                      twitterStatistics.tweetDetails?.timePosted
                    )}
                  </span>
                </AnalyzeDataKVBox>

                <div id="tweet-content">
                  <AnalyzeDataKeyBox title={"Tweet Content"} />
                  <p className="whitespace-pre-wrap	bg-gray-900 text-white rounded p-2">
                    {twitterStatistics.tweetDetails?.tweetText}
                    <div className="flex flex-wrap">
                      {Array.isArray(
                        twitterStatistics.tweetDetails?.tweetMedias
                      ) &&
                        twitterStatistics.tweetDetails?.tweetMedias.map(
                          (media, index) => {
                            if (media.image) {
                              return (
                                <a
                                  href={media.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div
                                    className="w-[100px] h-[100px] lg:w-[300px] lg:h-[300px] rounded border-2 border-black hover:border-gray-200 bg-center bg-cover bg-no-repeat m-1"
                                    style={{
                                      backgroundImage: `url(${media.image})`,
                                    }}
                                  ></div>
                                </a>
                              );
                            } else if (media.videoPoster) {
                              return (
                                <a
                                  href={twitterStatistics.tweetUrl}
                                  className="flex items-center justify-center w-[300px] h-[300px] rounded border-2 border-black hover:border-gray-200 bg-center bg-cover bg-no-repeat m-1"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    backgroundImage: `url(${media.videoPoster})`,
                                  }}
                                >
                                  <i class="fa-solid fa-play text-primary opacity-80 text-[40px]"></i>
                                </a>
                              );
                            } else return null;
                          }
                        )}
                    </div>
                  </p>
                </div>

                <div id="tweet-replies">
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className={`${showReplies === null
                      ? "animate-[pulse_2s_ease-in-out_infinite]"
                      : ""
                      } border border-gray-400 bg-primary text-white rounded p-2 mt-5 w-full font-semibold text-[1.5rem]`}
                  >
                    <i class="fa-solid fa-comments mr-2"></i>
                    <AnalyzeDataKeyBox title={"Replies"} />
                    <button className="ml-2">
                      {showReplies ? (
                        <i class="fa-solid fa-chevron-down"></i>
                      ) : (
                        <i class={`fa-solid fa-chevron-up`}></i>
                      )}
                    </button>
                  </button>
                  {showReplies && (
                    <div
                      id="tweet-replies-container"
                      className="animate__animated animate__slideInUp animate__faster"
                    >
                      {Array.isArray(
                        twitterStatistics.tweetDetails?.tweetReplies
                      ) &&
                        twitterStatistics.tweetDetails?.tweetReplies.map(
                          (reply, index) => {
                            return (
                              <TwitterReplyBox
                                key={index}
                                reply={reply}
                                index={index}
                              />
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div id="interaction-analysis" className="w-full lg:w-1/3 lg:pl-5">
              <div id="tweet-interaction">
                <div id="tweet-interaction-box">
                  <div className="p-5 bg-gray-900 text-white">
                    <h2 className="text-[1.5rem] text-primary mb-2">
                      Tweet Interaction
                    </h2>
                    <AnalyzeDataKVBox name={"Views"}>
                      <span>
                        <i class="fa-solid fa-eye"></i>{" "}
                        {
                          twitterStatistics.tweetDetails?.tweetInteraction
                            ?.views
                        }
                      </span>
                    </AnalyzeDataKVBox>

                    <AnalyzeDataKVBox name={"Retweets"}>
                      <span>
                        <i class="fa-solid fa-retweet"></i>{" "}
                        {
                          twitterStatistics.tweetDetails?.tweetInteraction
                            ?.retweets
                        }
                      </span>
                    </AnalyzeDataKVBox>

                    <AnalyzeDataKVBox name={"Quote Tweets"}>
                      <span>
                        <i class="fa-solid fa-quote-left"></i>{" "}
                        {
                          twitterStatistics.tweetDetails?.tweetInteraction
                            ?.quoteTweets
                        }
                      </span>
                    </AnalyzeDataKVBox>

                    <AnalyzeDataKVBox name={"Likes"}>
                      <span>
                        <i class="fa-solid fa-thumbs-up"></i>{" "}
                        {
                          twitterStatistics.tweetDetails?.tweetInteraction
                            ?.likes
                        }
                      </span>
                    </AnalyzeDataKVBox>
                  </div>
                </div>
              </div>
              <div
                id="twitter-trending-hastags-container"
                className="mt-5 bg-gray-900 text-white p-5"
              >
                {/* {JSON.stringify(trendingHashtags)} */}
                <h2 className="text-[1.5rem] text-primary mb-2">
                  Current Trending
                </h2>

                {Array.isArray(trendingHashtags) &&
                  trendingHashtags.map((trendingInfo) => {
                    return (
                      <div className="mb-5">
                        <div className="font-medium text-[1.2rem] text-yellow-400">
                          {trendingInfo.trendingLable}
                        </div>
                        <a
                          className="hover:underline"
                          href={trendingInfo.trendingURLSearch}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {trendingInfo.trendingHashtag}
                        </a>
                        <div>{trendingInfo.trendingTweetCount}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
